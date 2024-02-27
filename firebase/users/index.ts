import { collection, addDoc, doc, query, where, getDocs, updateDoc, DocumentData, Query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db, storage } from "../config";
import { getRandomColor } from "../../utils";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { User } from "../../models/User";

export const createUser = ({ id, email }: {id: string; email: string;}) => {
  return addDoc(collection(db, "users"), {
    id,
    email,
    name: '',
    goals: 0,
    randomColor: getRandomColor(),
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
        const usersData = querySnapshot.docs.map(doc => doc.data());
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
}

export const updateUserPropertyById = async (userId: string, propertyToUpdate: EditableUserProperties) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("id", "==", userId));
  
  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userDocRef = doc(db, "users", userDoc.id);

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
      ...doc.data() as User,
    }));
    setUsers(users);
  }, (error) => {
    console.error("Failed to listen for users with goals: ", error);
  });

  return unsubscribe;
};