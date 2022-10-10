import { db } from "../config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
function createNewUser(email,password){


createUserWithEmailAndPassword(auth, 'email@mail.com', 'password')
  .then(cred => {
    console.log('user created:', cred.user)
    
  })
  .catch(err => {
    console.log(err.message)
  })
}
export {createNewUser}