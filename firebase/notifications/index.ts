import { collection, addDoc, query, where, deleteDoc, doc, onSnapshot, getDoc } from "firebase/firestore";
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

interface SendPushNotificationProps {
  notification: Notification;
  receiverId: string;
}

export const sendPushNotification = async ({ notification, receiverId }: SendPushNotificationProps) => {
  const userRef = doc(db, "users", receiverId);
  const userDocSnap = await getDoc(userRef);
  if (!userDocSnap.exists()) {
    console.log('No user found for ID:', receiverId);
    return { error: `No user found for ID: ${receiverId}`, data: null };
  }

  const user = userDocSnap.data();
  const pushToken = user.pushToken;

  if (!pushToken) {
    console.log('No push token found for user:', receiverId);
    return { error: `No push token found for user: ${receiverId}`, data: null };
  }

  const message = {
    to: pushToken,
    sound: 'default',
    title: notification.highlightedText,
    body: notification.regularText,
    data: { withSome: 'data' },
  };

  try {
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    const data = await response.json();
    console.log('Notification sent successfully:', data);
    return { error: null, data };
  } catch (error) {
    console.error('Error sending notification:', error);
    return { error, data: null };
  }
};