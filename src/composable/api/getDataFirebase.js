// import axios from "axios"
import { ref } from 'vue'
// import {baseUrl} from '../config';
import { db } from "./config";
import { collection, getDocs , getDoc ,doc,setDoc} from "firebase/firestore"; 
const data = ref([]);
const error = ref(null)
const citiesRef = collection(db, "posts");
const getDatafs = (uri) => {
   
    const apiCall = async () => {
        try {
            const citiesRef = collection(db, "posts");

    // const docRef = docs(db, "cities");
    const docSnap = await getDocs(citiesRef);

    let posts=[];
    // console.log("docSnap",docSnap)
    docSnap.forEach((doc) => {
       
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data().title);
        posts.push({...doc.data(),id:doc.id})
      });
      console.log("posts",posts)
    //   data.value=posts
    
            // if (docSnap.e !== "OK") {
            //     throw Error('err')
            // }
             if (docSnap.empty) {
                throw Error('no Data')
            }
            else {

                data.value=posts
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