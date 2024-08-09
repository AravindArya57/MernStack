import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos, deleteVideo, clearErrors } from '../../slices/videoSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const VideoFileList = () => {
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
        <div className="container mt-5">
            <h1 className="mb-4">Video List</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="row">
                    {videos.map(video => (
                        <div key={video._id} className="col-md-4">
                            <div className="card mb-4 shadow-sm">
                                <img className="card-img-top" src={video.thumbnail} alt="Thumbnail" />
                                <div className="card-body">
                                    <h5 className="card-title">{video.title}</h5>
                                    <p className="card-text">{video.description}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <Link to={`/admin/video/update/${video._id}`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
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
    );
};

export default VideoFileList;
