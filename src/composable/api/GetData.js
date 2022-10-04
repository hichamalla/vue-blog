import axios from "axios"
import { ref } from 'vue'
import {baseUrl} from './config';
const data = ref([]);
const error = ref(null)
const getData = (uri) => {
   
    const apiCall = async () => {
        try {
            let response = await axios.get(baseUrl+uri)
            // console.log(response)
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