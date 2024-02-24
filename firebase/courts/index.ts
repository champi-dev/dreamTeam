import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";

export const getAllCourts = async () => {
  const courtsRef = collection(db, "courts");
  
  try {
    const querySnapshot = await getDocs(courtsRef);
    const courtsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { error: null, data: courtsData };
  } catch (error) {
    console.log(error);
    return { error, data: null };
  }
}
