import load from './api/GetData';

const getPosts = () => {
    
    // let posts;

    // const hi = async()=>await
    
    const {data:posts,error,apiCall }=   load('posts')
    // console.log('getposts',{posts,error })
    apiCall()

    return {posts,error}
}
export default getPosts