import { collection, addDoc, doc, getDoc, query, where, getDocs, updateDoc } from "firebase/firestore"; 
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

export const getUserById = async (id: string) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("id", "==", id));
  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return { error: null, data: userDoc.data() };
    } else {
      console.log("No such user!");
      return { error: "No such user!", data: null };
    }
  } catch (error) {
    console.log(error);
    return { error, data: null };
  }
}

interface EditableUserProperties {
  name?: string;
  goals?: number;
  avatarImgUrl?: string;
  goalsInMatch?: number;
}

export const updateUserPropertyById = async (userId: string, propertyToUpdate: EditableUserProperties) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("id", "==", userId));
  
  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // Assuming `id` is unique, there should only be one matching document.
      const userDoc = querySnapshot.docs[0];
      const userDocRef = doc(db, "users", userDoc.id);

      // Update the document
      // @ts-ignore
      await updateDoc(userDocRef, propertyToUpdate);
      return { error: null, data: "User updated successfully." };
    } else {
      console.log("No such user!");
      return { error: "No such user!", data: null };
    }
  } catch (error) {
    console.log(error);
    return { error, data: null };
  }
}