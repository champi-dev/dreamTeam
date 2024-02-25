import { collection, addDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
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

export const getMatches = async () => {
  const matchesRef = collection(db, "matches");
  const q = query(
    matchesRef,
    where("played", "==", false),
    orderBy("createdAt", "desc"),
    limit(10)
  );

  try {
    const querySnapshot = await getDocs(q);
    const matches = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    
    return { error: null, data: matches, lastVisible: lastVisible };
  } catch (error) {
    console.log(error);
    return { error, data: null };
  }
}