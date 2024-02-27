import { collection, addDoc, getDocs, limit, orderBy, query, where, startAfter, doc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../config";
import { Match } from "../../models/Match";
import { convertDateStr } from "../../utils";

interface ListenForMatchesProps {
  setMatches: (matches: Match[]) => void;
  setLastVisibleMatchDoc: (doc: unknown) => void;
}

export const listenForMatches = ({ setMatches, setLastVisibleMatchDoc }: ListenForMatchesProps) => {
  const matchesRef = collection(db, "matches");
  const q = query(
    matchesRef,
    where("played", "==", false),
    orderBy("createdAt", "desc"),
    limit(10)
  );

  const unsubscribe = onSnapshot(q, (querySnapshot): void => {
    const matches = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    setLastVisibleMatchDoc(lastVisible);
    setMatches(matches as Match[]);
  });

  return unsubscribe;
};

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
    orderBy("createdAt", "desc"),
    limit(10)
  ) : query(
    matchesRef,
    where("played", "==", false),
    orderBy("createdAt", "desc"),
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

export const getPlayedMatches = async (lastVisible?: unknown) => {
  const matchesRef = collection(db, "matches");
  const q = !lastVisible ? query(
    matchesRef,
    where("played", "==", true),
    orderBy("createdAt", "desc"),
    limit(10)
  ) : query(
    matchesRef,
    where("played", "==", true),
    orderBy("createdAt", "desc"),
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

interface ListenForMatchByIdProps {
  matchId: string;
  setMatch: (match: Match) => void;
}

export const listenForMatchById = ({ matchId, setMatch }: ListenForMatchByIdProps) => {
  const matchRef = doc(db, "matches", matchId);

  const unsubscribe = onSnapshot(matchRef, (doc) => {
    if (doc.exists()) {
      setMatch({ id: doc.id, ...doc.data() } as Match);
    } else {
      console.log("No such document!");
    }
  });

  return unsubscribe;
};

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