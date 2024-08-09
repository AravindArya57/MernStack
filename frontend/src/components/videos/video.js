import React from 'react';
import { Link } from 'react-router-dom';

const VideoFile = ({ video }) => {
    return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
                <video controls className="card-img-top mx-auto">
                    <source src={`http://localhost:8000/uploads/${video.video}`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/video/${video._id}`}>{video.title}</Link>
                    </h5>
                    <p className="card-text">{video.description}</p>
                    <Link to={`/video/${video._id}`} className="btn btn-block btn-primary mt-auto">
                        Watch Video
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default VideoFile;
