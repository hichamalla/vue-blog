import {fetchDocuments,createNewDoc,fetchDoc,deleteDocuments} from './api/firebase/firebase';

function getPosts () {
    
    fetchDocuments('posts').then(res=>  {
        //  const {data:posts,error }=   res
         console.log("postssss",res)
        //  if (error)
        //  throw Error("wtf")
         {posts}
    }).catch(err=>console.log("error",err))
    .finally(()=>console.log("finally"))
    // apiCall()

    // console.log("posts.length",posts.length)

    return {}
}
function createNewDocuments(data){
    const { data: id, error } = createNewDoc(data,'posts')
    // console.log(title.value,body.value,tags.value)
    console.log(data,"data")
    return {id,error}
    // apiCall()
}
function fetchDocumentData(postId){
    const {data:post,error,apiCall } = fetchDoc('posts',postId)
    apiCall()
    console.log("post","error",post,error)
    return {post,error}
}
function removeDocumentData(postId){
    const {apiCall } = deleteDocuments('posts',postId)
    const {data:isDeleted,error, }=apiCall()
    console.log("post","error",isDeleted,error)
    return {isDeleted,error}
}
export {getPosts,fetchDocumentData,createNewDocuments,removeDocumentData,}