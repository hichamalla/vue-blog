import {fetchDocuments,createNewDoc,fetchDoc,deleteDocuments,filterDocuments,editDoc} from './api/firebase/firebase';

function getPosts () {
    
    return fetchDocuments("posts");
}
function createNewPost(data){
    return createNewDoc(data,'posts')
}
function filterPostsByTag(query){
    // console.log
    return filterDocuments('posts','tags',query)
}
function fetchPostData(postId){
   return fetchDoc('posts',postId)
 
 
}
function removeDocumentData(postId){
    const {apiCall } = deleteDocuments('posts',postId)
    const {data:isDeleted,error, }=apiCall()
    console.log("post","error",isDeleted,error)
    return {isDeleted,error}
}
function updatePosts(id,docData){
    return   editDoc('posts',id,docData)
}
export {getPosts,fetchPostData,createNewPost,removeDocumentData,filterPostsByTag,updatePosts}