// import axios from "axios"
import { ref } from 'vue'
// import {baseUrl} from '../config';
import { db } from "../config";
import { collection, serverTimestamp, addDoc, doc, getDocs, 
    updateDoc, getDoc, deleteDoc, query, where,onSnapshot } from "firebase/firestore";


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

    let docs = ref([]);
    const docsRef = collection(db, collectionName);
    onSnapshot(
        docsRef, 
        (listdocs) => {
            listdocs.forEach((doc) => {
                // console.log(doc.data())
                        docs.value.push({ ...doc.data(), id: doc.id })
                    });
        });
    // await getDocs(docsRef);
    
    
    // if (!docSnap.empty) {

    //     listdocs.forEach((doc) => {
    //         docs.push({ ...doc.data(), id: doc.id })
    //     });
    // }

    return docs

}

async function filterDocuments(collectionName, document, elemnt) {
    console.log("config", collectionName, document, elemnt)
    const docRef = collection(db, collectionName);
    let docsy = query(docRef, where("body", "==", "zdaz"));

    const docSnap = await getDocs(docsy);

    let docs = [];
    if (!docSnap.empty) {

        docSnap.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id })
        });
    }
    console.log('docy', docs)
    return docs;
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

    const docsRef = collection(db, collectionName);
    let response = await addDoc(docsRef, {...docData,createdAt: serverTimestamp(),UpdateddAt: serverTimestamp()});
    return response.id

}
// console.log("apicall2", { data, error })

// }
async function editDoc(collectionName, id, docData,) {

    let docRef = doc(db, collectionName, id)
    console.log('docRef',docRef)
    updateDoc(docRef, {...docData,UpdateddAt: serverTimestamp()})

}
///////////////////////////////////////////////////////////////
// then use : fetch selected Document
// inputs :    @id the id of the the doc
//              @collectioName the name of the collections
//
// outputs :    @data the object of the fetched doc
//              @error in case of error this will be filled with the error message
//              @apiCall to call for the function
//////////////////////////////////////////////////////////////


const fetchDoc = async (collectionName, id) => {

    const docRef = doc(db, collectionName, id);

    const docSnap = await getDoc(docRef);

    console.log('eeeee2',)
    let document
    if (docSnap.exists()) {

        // console.log('eeeee3')
        // const docSnap = await getDoc(docRef);
        // console.log('document2',docSnap)
        console.log('document', document)
        document = { ...docSnap.data(), id: docSnap.id }


        return document
    }
    // if (!document) {
    //     throw Error('no Data')
    // }
    else {
        throw Error('no Data')

    }



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
                let ex = await deleteDoc(docRef);
                document = true
                console.log("dataex", data, ex)
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
    return { apiCall }
}
export { fetchDoc, createNewDoc, fetchDocuments, deleteDocuments, filterDocuments, editDoc };
