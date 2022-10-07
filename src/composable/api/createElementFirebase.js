// import axios from "axios"
import { ref } from 'vue'
// import {baseUrl} from '../config';
import { db } from "./config";
import { collection, Timestamp, addDoc ,doc,setDoc} from "firebase/firestore"; 
const data = ref([]);
const error = ref(null)
const citiesRef = collection(db, "posts");
const sendData = () => {
   
    const apiCall = async (docData) => {
        try {
            const citiesRef = collection(db, "posts");

    // const docRef = docs(db, "cities");
    console.log('docData',docData)
    let response =await addDoc(citiesRef, docData);
   
       
        console.log(response)
      
    //   console.log("posts",posts)
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
export default sendData;