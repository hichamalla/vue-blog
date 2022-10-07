// import axios from "axios"
import { ref } from 'vue'
// import {baseUrl} from '../config';
import { db } from "./config";
import { collection, getDocs , getDoc ,doc,setDoc} from "firebase/firestore"; 
const data = ref([]);
const error = ref(null)
const citiesRef = collection(db, "posts");
const getDatafs = (id) => {
   
    const apiCall = async () => {
        try {
            const citiesRef = collection(db, "posts");

    // const docRef = docs(db, "cities");
    const docRef  =  doc(db,'posts',id);
    const docSnap = await getDoc(docRef);
    let post;
    console.log("docSnap",docSnap)
   
       
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data().title);
        post={...docSnap.data(),id:doc.id}
      
      console.log("posts",post)
    //   data.value=posts
    
            // if (docSnap.e !== "OK") {
            //     throw Error('err')
            // }
             if (docSnap.empty) {
                throw Error('no Data')
            }
            else {

                data.value=post
            }
        } catch (err) {
            error.value = "err :" +err.message

            // console.log(error.value)
        }
    }
    // console.log("apicall2", { data, error })
    return { data, error,apiCall }
}
export default getDatafs;