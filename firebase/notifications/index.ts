import { collection, addDoc } from "firebase/firestore";
import { db } from "../config";
import { Notification } from "../../models/Notification";

export const createNotification = (notification: Notification) => {
  return addDoc(collection(db, "notifications"), notification).then((docRef) => {
    return { error: null, data: docRef.id };
  }).catch((error) => {
    console.log(error.message);
    return { error, data: null };
  });
}