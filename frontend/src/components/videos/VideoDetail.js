import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideoByDevice, deleteVideo, clearErrors } from '../../slices/videoSlice';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Badge, Button, Card, Col, Row, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MetaData from '../layouts/MetaData';

const FetchVideoByDevice = () => {
    const { device } = useParams(); // Get the title from the URL
    const dispatch = useDispatch();
    const { videoDetails, isDeleted, loading, error } = useSelector(state => state.videos);

    useEffect(() => {
        if (device) {
            dispatch(fetchVideoByDevice(device));
        }
    }, [device, dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            toast('Video deleted successfully!',{
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER
            })
            return;
        }
    }, [error, dispatch, isDeleted]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this video?')) {
            dispatch(deleteVideo(id));
        }
    };

    return (
        <>
        <MetaData title={`Dashboard`} />
        <div>
            <Container fluid>
            {loading && <p>Loading...</p>}

                {videoDetails && videoDetails.length > 0 && (
                <Row>
                    {videoDetails.map(video => (
                            <Col xs={12} sm={6} md={4} lg={4} xl={3} key={video._id} className='cardcol'>
                                <Card >
                                    <Card.Img variant="top" src={video.thumbnail}  className='cardimage'/>
                                    <Card.Body className='cardbody'>
                                        <Card.Title>{video.title}<Badge bg="dark" className='badgecss'>{video.videoMode}</Badge></Card.Title> 
                                    
                                        <Card.Text className='customcardcss'>{video.description}</Card.Text>
                                        <Row>
                                            <Col>
                                            <Link to={`/admin/video/update/${video._id}`} className="btn editbtn">Edit</Link></Col>
                                            <Col><Button className='deletebtn' type="button" onClick={() => handleDelete(video._id)}>Delete</Button></Col>    
                                        </Row>
                                        
                                    </Card.Body>
                                </Card>
                            </Col>
                        // </div>  
                    ))}                   
                </Row>
            )}
            {!loading && videoDetails && videoDetails.length === 0 && (
                        <p>No videos found with the device "{device}".</p>
                    )}
            </Container>
        </div>
        {/* <div className="row">
            <div className="col-12 col-md-10">
            <main className='main-container'>
                <div className="container mt-5">
                    <h1 className="mb-4 text-dark" >Video Results for "{device}"</h1>
                    {loading && <p>Loading...</p>}

                    {videoDetails && videoDetails.length > 0 && (
                        <div className="row">
                            {videoDetails.map(video => (
                                <div key={video._id} className="col-md-3">
                                    <div className="card bg-dark rounded text-white">
                                        <Image className="card-img thumbnail" src={video.thumbnail} alt="Card image" />
                                        <div className="card-img-overlay">
                                            <div >
                                                <div className='row'>
                                                    <div className='col'>
                                                        <p className="card-text">{video.title}</p>
                                                    </div>
                                                    <div className='col'>
                                                        <span className="badge badge-light text-dark">{video.device}</span>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <p className="card-text">{video.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {!loading && videoDetails && videoDetails.length === 0 && (
                        <p>No videos found with the device "{device}".</p>
                    )}
                </div>
            </main>
            </div>
        </div> */}
    </>
    );
};

export default FetchVideoByDevice;
