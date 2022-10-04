import axios from "axios"
import { ref } from 'vue'
const data = ref([]);
const error = ref(null)
import {baseUrl} from './config';
const getData = (uri) => {
   console.log('get data in')
    const apiCall = async (postedData) => {
        console.log('api call data in')
        try {
            let response = await axios.post(baseUrl+uri,
                postedData)
            console.log(response,postedData)
            
            if (response.statusText !== "OK") {
                throw Error('err')
            }
            else if (response.data.length == 0) {
                throw Error('no Data')
            }
            else {
                // console.log(response.data)
                // console.log("apicall", response.data)
                // posts.value = 
                data.value = response.data
            }
        } catch (err) {
            error.value = err.message

            // console.log(error.value)
        }
    }
    // console.log("apicall2", { data, error })
    return { data, error,apiCall }
}
export default getData;