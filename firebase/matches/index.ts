import { collection, addDoc, getDocs, limit, orderBy, query, where, startAfter, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../config";
import { Match } from "../../models/Match";
import { convertDateStr } from "../../utils";

export const createMatch = (match: Match) => {
  return addDoc(collection(db, "matches"), match).then((docRef) => {
    return { error: null, data: docRef.id };
  }).catch((error) => {
    console.log(error.message);
    return { error, data: null };
  });
}

export const getMatches = async (lastVisible?: unknown) => {
  const matchesRef = collection(db, "matches");
  const q = !lastVisible ? query(
    matchesRef,
    where("played", "==", false),
    orderBy("createdAt", "asc"),
    limit(10)
  ) : query(
    matchesRef,
    where("played", "==", false),
    orderBy("createdAt", "asc"),
    limit(10),
    startAfter(lastVisible)
  );

  try {
    const querySnapshot = await getDocs(q);
    let matches = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    matches = matches.sort((a, b) => {
      // @ts-ignore
      const dateA = new Date(convertDateStr(a.date));
      // @ts-ignore
      const dateB = new Date(convertDateStr(b.date));
      // @ts-ignore
      return dateA - dateB;
    });

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    return { error: null, data: matches, lastVisible: lastVisible };
  } catch (error) {
    console.log(error);
    return { error, data: null };
  }
}

export const getMatchById = async (matchId: string) => {
  const matchRef = doc(db, "matches", matchId);

  try {
    const docSnap = await getDoc(matchRef);
    if (docSnap.exists()) {
      return { error: null, data: { id: docSnap.id, ...docSnap.data() } };
    } else {
      console.log("No match found with the given ID");
      return { error: "No match found", data: null };
    }
  } catch (error) {
    console.log(error);
    return { error, data: null };
  }
}

export const updateMatch = async (matchId: string, propertiesToUpdate: Partial<Match>) => {
  const matchRef = doc(db, "matches", matchId);

  try {
    await updateDoc(matchRef, propertiesToUpdate);
    return { error: null, data: `Match with ID: ${matchId} updated successfully.` };
  } catch (error) {
    console.log(error);
    return { error, data: null };
  }
}