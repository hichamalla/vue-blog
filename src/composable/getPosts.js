import {fetchDocuments} from './api/firebase/firebase';


const getPosts = () => {
    
    // let posts;

    // const hi = async()=>await
    
    const {data,error,apiCall }=   fetchDocuments('posts')
    apiCall()

    return {data,error}
}
export default getPosts