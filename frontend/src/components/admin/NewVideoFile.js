import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertVideoFile, clearErrors } from '../../slices/videoSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MetaData from '../layouts/MetaData';

const NewVideoFile = () => {
    const [videoData, setVideoData] = useState({
        title: "",
        description: "",
        device: "",
        videoMode: ""
    });

    const [thumbnail, setThumbnail] = useState("");
    const [thumbnailPreview, setThumbnailPreview] = useState("/images/default_avatar.png");

    const [video, setVideo] = useState(null);
    const categories = ['360', '180', 'MR', 'Theater'];
    const deviceCategories = ['Quest', 'Vision Pro'];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, success } = useSelector(state => state.videos);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            toast('Video uploaded successfully!',{
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER
            })
            return navigate('/admin/dashboard');
            // navigate('/videos');
        }
    }, [dispatch, error, success, navigate]);

    const onChange = (e) => {
        if (e.target.name === 'thumbnail') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setThumbnailPreview(reader.result);
                    setThumbnail(e.target.files[0]);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setVideoData({ ...videoData, [e.target.name]: e.target.value });
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', videoData.title);
        formData.append('description', videoData.description);
        formData.append('device', videoData.device);
        formData.append('videoMode', videoData.videoMode);
        formData.append('video', video);
        formData.append('thumbnail', thumbnail);
        dispatch(insertVideoFile(formData));
    };

    return (
        <>
        <MetaData title={`Content Create`} />
        <div className="wrapper my-5">
            <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                <h1 className="mb-4">New Video</h1>

                <div className="form-group">
                    <label htmlFor="title_field">Title</label>
                    <input
                        type="text"
                        id="title_field"
                        className="form-control"
                        name='title'
                        onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description_field">Description</label>
                    <textarea
                        className="form-control"
                        id="description_field"
                        rows="8"
                        name='description'
                        onChange={onChange}
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="device_field">Device Mode</label>
                    <select onChange={onChange} name='device' className="form-control" id="device_field">
                        <option value="">Select</option>
                        {deviceCategories.map(deviceCategory => (
                            <option key={deviceCategory} value={deviceCategory}>{deviceCategory}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="videoMode_field">Video Mode</label>
                    <select onChange={onChange} name='videoMode' className="form-control" id="videoMode_field">
                        <option value="">Select</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div className='form-group'>
                    <label htmlFor='thumbnail_upload'>Thumbnail</label>
                    <div className='d-flex align-items-center'>
                        <div>
                            <figure className='avatar mr-3 item-rtl'>
                                <img
                                    src={thumbnailPreview}
                                    className='rounded-circle'
                                    alt='Thumbnail'
                                />
                            </figure>
                        </div>
                        <div className='custom-file'>
                            <input
                                type='file'
                                name='thumbnail'
                                onChange={onChange}
                                className='custom-file-input'
                                id='customFile'
                            />
                            <label className='custom-file-label' htmlFor='customFile'>
                                Choose Thumbnail
                            </label>
                        </div>
                    </div>
                </div>

                <div className='form-group'>
                    <label htmlFor='video_upload'>Upload Video</label>
                    <div className='d-flex align-items-center'>
                        <div className='custom-file'>
                            <input
                                type='file'
                                name='video'
                                onChange={e => setVideo(e.target.files[0])}
                                className='custom-file-input'
                                id='video_upload'
                            />
                            <label className='custom-file-label' htmlFor='video_upload'>
                                Choose Video
                            </label>
                        </div>
                    </div>
                </div>

                <button
                    id="upload_button"
                    type="submit"
                    className="btn btn-block py-3"
                    disabled={loading}
                >
                    Upload Video
                </button>
            </form>
        </div>
    </>
    );
};

export default NewVideoFile;
