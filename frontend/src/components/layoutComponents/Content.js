import React, { useEffect } from 'react'
import { Badge, Button, Card, Col, Row, Container} from 'react-bootstrap'
import './content.css'

import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos, deleteVideo, clearErrors } from '../../slices/videoSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MetaData from '../layouts/MetaData';

function Content() {

    const dispatch = useDispatch();
    const { videos, error, isDeleted, loading } = useSelector(state => state.videos);

    useEffect(() => {
        dispatch(fetchVideos());

        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearErrors()) }
            })
            return;
        }
        
        if (isDeleted) {
            toast('Video deleted successfully!',{
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER
            })
            return;
        }
    }, [dispatch, error, isDeleted]);

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
        {loading ? (
            <p>Loading...</p>
        ) : (
            <Row>
                {videos.map(video => (
                    // <div key={video._id}>
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
        </Container>
    </div>
    </>
  )
}

export default Content;
