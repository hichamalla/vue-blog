// import { Axios } from 'axios';
import load from './api/GetData';

const getPost = (idx) => {
    
    // let posts;

    // const hi = async()=>await
    console.log("id",idx)
    const {data:post,error,apiCall }=   load('posts/'+idx)
    // console.log('getposts',{posts,error })
    
    // console.log(post)
    return {post,error,apiCall}
}
export default getPost