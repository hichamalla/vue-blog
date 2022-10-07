// import axios from "axios"
import { ref } from 'vue'
// import {baseUrl} from '../config';
import { db } from "../config";
import { collection, Timestamp, addDoc, doc,getDocs, setDoc,getDoc } from "firebase/firestore";
const data = ref([]);
const error = ref(null)

function createNewDoc(docData, collectionName)  {

    const apiCall = async () => {
        try {
            const docsRef = collection(db, collectionName);
            let response = await addDoc(docsRef, docData);


            console.log(response.id)

            if (!response.id) {
                throw Error('not added')
            }
            else {

                data.value = response.id
            }
        } catch (err) {
            error.value = "err :" + err.message

            // console.log(error.value)
        }
    }
    // console.log("apicall2", { data, error })
    return { data, error, apiCall }
}
function fetchDocuments(collectionName) {
console.log("dadad")
    const apiCall = async () => {
        try {
            const docsRef = collection(db, collectionName);
            const docSnap = await getDocs(docsRef);

            let docs = [];
            // console.log("docsSnap",docsSnap)
            docSnap.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id })
            });

            if (docSnap.empty) {
                throw Error('no Data')
            }
            else {

                data.value = docs
            }
        } catch (err) {
            error.value = "err :" + err.message

            // console.log(error.value)
        }
    }
    // console.log("apicall2", { data, error })
    return { data, error, apiCall }
}

function fetchDoc(collectionName,id) {

    const apiCall = async () => {
        try {
            const docRef = doc(db, 'posts', id);
            const docSnap = await getDoc(docRef);

            let getdoc = { ...docSnap.data(), id: docSnap.id }


            // doc = 


            if (docSnap.empty) {
                throw Error('no Data')
            }
            else {

            data.value = getdoc
            }
        } catch (err) {
            error.value = "err :" + err.message

            // console.log(error.value)
        }
    }
    // console.log("apicall2", { data, error })
    return { data, error, apiCall }
}
export  {fetchDoc,createNewDoc,fetchDocuments};
// export default 
// export default 