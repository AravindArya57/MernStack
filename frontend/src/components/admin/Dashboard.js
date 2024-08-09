// import Sidebar from "./Sidebar";
import React, { useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos, deleteVideo, clearErrors } from '../../slices/videoSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard () {
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
        <div className="row">
            {/* <div className="col-12 col-md-2">
                <Sidebar/>
            </div> */}
            <div className="col-12 col-md-10">
            <main className='main-container'>
                <div className="container mt-5">
                    <h1 className="mb-4 text-dark" >My Content</h1>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="row">
                            {videos.map(video => (
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
                                                <div className="btn-group">
                                                    <Link to={`/admin/video/update/${video._id}`} className="btn bg-light">Edit</Link>
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-secondary text-light text-right"
                                                        onClick={() => handleDelete(video._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            </div>
        </div>
    )
}