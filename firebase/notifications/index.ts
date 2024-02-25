import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
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

export const getNotificationsByReceiverId = async (receiverId: string) => {
  const notificationsRef = collection(db, "notifications");
  const q = query(notificationsRef, where("receiverId", "==", receiverId));

  try {
    const querySnapshot = await getDocs(q);
    const notifications = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { error: null, data: notifications };
  } catch (error) {
    console.log(error);
    return { error, data: null };
  }
}

export const deleteNotification = async (notificationId: string) => {
  try {
    await deleteDoc(doc(db, "notifications", notificationId));
    return { error: null, data: `Notification with ID: ${notificationId} deleted successfully.` };
  } catch (error) {
    console.log(error);
    return { error, data: null };
  }
}