import { collection, addDoc, doc, query, where, getDocs, updateDoc, DocumentData, Query, orderBy, limit, onSnapshot, getDoc } from "firebase/firestore";
import { db, storage } from "../config";
import { getRandomColor } from "../../utils";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { User } from "../../models/User";

export const createUser = ({ email }: { email: string; }) => {
  return addDoc(collection(db, "users"), {
    email,
    name: '',
    goals: 0,
    randomColor: getRandomColor(),
  }).then((docRef) => {
    return { error: null, data: { id: docRef.id } };
  }).catch((error) => {
    console.log(error.message);
    return { error, data: null };
  });
}

export const getUserById = async (id: string) => {
  const userRef = doc(db, "users", id);
  try {
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return { error: null, data: { id: docSnap.id, ...docSnap.data()} };
    } else {
      console.log("No such user!");
      return { error: "No such user!", data: null };
    }
  } catch (error) {
    console.log(error);
    return { error, data: null };
  }
}

export const getUserByEmail = async (email: string) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));

  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("No user found with the given email");
      return { error: "No user found", data: null };
    }

    const userDoc = querySnapshot.docs[0];
    return { error: null, data: { id: userDoc.id, ...userDoc.data() } };
  } catch (error) {
    console.log(error);
    return { error, data: null };
  }
}

export const getUsersByNamePrefix = async (searchText: string) => {
  const usersRef = collection(db, "users");
  const qName = query(
    usersRef, 
    where("name", ">=", searchText.toLowerCase()), 
    where("name", "<=", searchText.toLowerCase() + '\uf8ff'),    
  );
  const qEmail = query(
    usersRef, 
    where("email", ">=", searchText.toLowerCase()), 
    where("email", "<=", searchText.toLowerCase() + '\uf8ff'),    
  );

  const getFilteredUsers = async (q: Query<unknown, DocumentData>) => {
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as User }));
        return { error: null, data: usersData };
      } else {
        console.log("No matching users found");
        return { error: "No matching users found", data: null };
      }
    } catch (error) {
      console.log(error);
      return { error, data: null };
    }
  }

  const { error: errorName, data: usersByName } = await getFilteredUsers(qName);

  if (errorName) {
    if (!usersByName || usersByName.length <= 0) {
      return getFilteredUsers(qEmail);
    }
  } 

  return { error: null, data: usersByName };
}

interface EditableUserProperties {
  name?: string;
  goals?: number;
  avatarImgUrl?: string;
  goalsInMatch?: number;
  pushToken?: string;
  [key: string]: any;
}

export const updateUserPropertyById = async (userId: string, propertyToUpdate: EditableUserProperties) => {
  const userDocRef = doc(db, "users", userId);
  
  try {
    await updateDoc(userDocRef, propertyToUpdate);
    return { error: null, data: "User updated successfully." };
  } catch (error) {
    console.log(error);
    return { error, data: null };
  }
}

export const uploadUserImage = ({ fileName, blob }: { fileName: string; blob: Blob; }) => {
  const storageRef = ref(storage, `images/${fileName}`);

  return uploadBytes(storageRef, blob).then((snapshot) => {
    return getDownloadURL(snapshot.ref).then((downloadURL) => {
      return { error: null, data: downloadURL };
    });
  }).catch((error) => {
    console.error("Upload failed", error);
    return { error, data: null };
  });
}

interface ListenForUsersWithGoalsProps {
  setUsers: (users: User[]) => void;
}

export const listenForUsersWithGoals = ({ setUsers }: ListenForUsersWithGoalsProps) => {
  const usersRef = collection(db, "users");
  const q = query(
    usersRef,
    where("goals", ">", 0),
    orderBy("goals", "desc"),
    limit(10)
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const users: User[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data() as User,
    }));
    setUsers(users);
  }, (error) => {
    console.error("Failed to listen for users with goals: ", error);
  });

  return unsubscribe;
};