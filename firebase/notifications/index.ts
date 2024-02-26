import { collection, addDoc, query, where, deleteDoc, doc, onSnapshot } from "firebase/firestore";
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

export const listenForNotificationsByReceiverId = (receiverId: string, setNotifications: (notifications: Notification[]) => void) => {
  const notificationsRef = collection(db, "notifications");
  const q = query(notificationsRef, where("receiverId", "==", receiverId));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const notifications = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setNotifications(notifications as Notification[]);
  });

  return unsubscribe;
};

export const deleteNotification = async (notificationId: string) => {
  try {
    await deleteDoc(doc(db, "notifications", notificationId));
    return { error: null, data: `Notification with ID: ${notificationId} deleted successfully.` };
  } catch (error) {
    console.log(error);
    return { error, data: null };
  }
}