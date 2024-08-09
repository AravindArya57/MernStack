// import React, { Fragment, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Loader from "./layouts/Loader";
// import MetaData from "./layouts/MetaData";
// import VideoFile from "./videos/video"; // This component should be similar to the Product component
// import { toast } from 'react-toastify';
// import Pagination from 'react-js-pagination';

// const VideosList = () => {
//     const dispatch = useDispatch();
//     const { videos, loading, error, videosCount, resPerPage } = useSelector((state) => state.videosState);
//     const [currentPage, setCurrentPage] = useState(1);

//     const setCurrentPageNo = (pageNo) => {
//         setCurrentPage(pageNo);
//     }

//     useEffect(() => {
//         if (error) {
//             return toast.error(error, {
//                 position: toast.POSITION.BOTTOM_CENTER
//             });
//         }
//         // dispatch(getVideos(currentPage));
//     }, [error, dispatch, currentPage]);

//     return (
//         <Fragment>
//             {loading ? <Loader /> :
//                 <Fragment>
//                     <MetaData title={'Watch Best Videos'} />
//                     <h1 id="videos_heading">ARR Video Files</h1>
//                     <section id="videos" className="container mt-5">
//                         <div className="row">
//                             {videos && videos.map(video => (
//                                 <VideoFile col={3} key={video._id} video={video.video} />
//                             ))}
//                         </div>
//                     </section>
//                     {/* {videosCount > 0 && videosCount > resPerPage ?
//                         <div className="d-flex justify-content-center mt-5">
//                             <Pagination
//                                 activePage={currentPage}
//                                 onChange={setCurrentPageNo}
//                                 totalItemsCount={videosCount}
//                                 itemsCountPerPage={resPerPage}
//                                 nextPageText={'Next'}
//                                 firstPageText={'First'}
//                                 lastPageText={'Last'}
//                                 itemClass={'page-item'}
//                                 linkClass={'page-link'}
//                             />
//                         </div> : null} */}
//                 </Fragment>
//             }
//         </Fragment>
//     );
// }

// export default VideosList;