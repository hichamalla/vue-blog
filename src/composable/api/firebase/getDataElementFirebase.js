// import axios from "axios"
import { ref } from 'vue'
// import {baseUrl} from '../config';
import { db } from "../config";
import { collection, getDocs, getDoc, doc, setDoc } from "firebase/firestore";
const data = ref([]);
const error = ref(null)

export default getDatafs;