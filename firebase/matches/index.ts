import { collection, addDoc } from "firebase/firestore";
import { db } from "../config";
import { Match } from "../../models/Match";

export const createMatch = (match: Match) => {
  return addDoc(collection(db, "matches"), match).then((docRef) => {
    return { error: null, data: docRef.id };
  }).catch((error) => {
    console.log(error.message);
    return { error, data: null };
  });
}