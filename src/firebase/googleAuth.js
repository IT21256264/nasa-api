import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const signInWithGoogle = () => {
  return new Promise((resolve, reject) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        resolve(result); 
      })
      .catch((error) => {
        reject(error); 
      });
  });
};

export default signInWithGoogle;
