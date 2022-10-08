// import axios from "axios"
import { ref } from 'vue'
// import {baseUrl} from '../config';
import { db } from "../config";
import { collection, Timestamp, addDoc, doc, getDocs, setDoc, getDoc, deleteDoc } from "firebase/firestore";
const data = ref([]);
const error = ref(null)

///////////////////////////////////////////////////////////////
// then use : fetch all the Documents from the database
// inputs :     @collectioName the name of the collections
//             
//
// outputs :    @data  list of objects of the documents
//              @error in case of error this will be filled with the error message
//              @apiCall to call for the function
//////////////////////////////////////////////////////////////
async function fetchDocuments(collectionName) {
  
    // const apiCall = async () => {
        let data
      
        // let isLoading=true/
        // try {
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

                data = docs
            }
        // } catch (err) {
        //     error = "err :" + err.message

            console.log("docs",docs)
        // }
        return docs
    // }
    // console.log("apicall2", { data, error })
   
}

///////////////////////////////////////////////////////////////
// then use : Create New Document
// inputs :    @docData json file of the doc
//              @collectioName the name of the collections
//
// outputs :    @id of the created doc
//              @error in case of error this will be filled with the error message
//              @apiCall to call for the function
//////////////////////////////////////////////////////////////

// function createNewDoc(docData, collectionName)  {

async function createNewDoc(docData, collectionName) {
    const data = ref();
    const error = ref(null)

    try {
        const docsRef = collection(db, collectionName);
        let response = await addDoc(docsRef, docData);




        if (!response.id) {
            throw Error('not added')
        }
        else {

            data.value = response.id
            console.log(data.value)
        }
    } catch (err) {
        error.value = "err :" + err.message

        console.log(error.value)
    }
    return { data, error }
}
// console.log("apicall2", { data, error })

// }

///////////////////////////////////////////////////////////////
// then use : fetch selected Document
// inputs :    @id the id of the the doc
//              @collectioName the name of the collections
//
// outputs :    @data the object of the fetched doc
//              @error in case of error this will be filled with the error message
//              @apiCall to call for the function
//////////////////////////////////////////////////////////////

function fetchDoc(collectionName, id) {
    const data = ref();
    const error = ref(null)
    // console.log('eeeee1')
    const apiCall = async () => {
        try {
            const docRef = doc(db, collectionName, id);

            const docSnap = await getDoc(docRef);

            console.log('eeeee2',)
            let document
            if (docSnap.exists()) {

                // console.log('eeeee3')
                // const docSnap = await getDoc(docRef);
                // console.log('document2',docSnap)
                document = { ...docSnap.data(), id: docSnap.id }
                console.log('document', document)

                data.value = document
            }
            // if (!document) {
            //     throw Error('no Data')
            // }
            else {
                throw Error('no Data')

            }
        } catch (err) {
            error.value = "err :" + err.message

            // console.log(error.value)
        }
    }
    console.log("apicall2", data.value, error.value)
    return { data, error, apiCall }
}

function deleteDocuments(collectionName, id) {
    
    const apiCall = async () => {
        const data = ref([]);
    const error = ref(null)
    
        try {
            const docRef = doc(db, collectionName, id);

            const docSnap = await getDoc(docRef);

            console.log('eeeee2',)
            let document

            // deleteDoc(docRef);
            // document = true
            //  document

            if (!docSnap.data()) {
                // document = false
                throw Error('element not found')
            }
            else {
                let ex= await deleteDoc(docRef);
                document = true
                console.log("dataex",data,ex)
                // throw Error('no Data')
                // data.value=true
            }
            data.value = document
        } catch (err) {
            error.value = "err :" + err.message

            console.log(error.value)
        }
           console.log("apicall2", data, error.value)
           return { data, error }
    }
    console.log("apicall2ouTSIDE", data, error.value)
    return {  apiCall }
}
export { fetchDoc, createNewDoc, fetchDocuments, deleteDocuments };
