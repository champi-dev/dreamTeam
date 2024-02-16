import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../config";

export const createUser = ({ id, email }: {id: string; email: string;}) => {
  return addDoc(collection(db, "users"), {
    id,
    email,
    name: '',
    goals: 0
  }).then((docRef) => {
    return { error: null, data: docRef.id };
  }).catch((error) => {
    console.log(error.message);
    return { error, data: null };
  });
}