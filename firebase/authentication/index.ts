import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";

interface SignUpProps {
  email: string;
  password: string;
}

export const signUp = async ({ email, password }: SignUpProps) => {
  return createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    return { error: null, data: user };
  })
  .catch((error) => {
    console.log(error.message);
    return { error, data: null };
  });
}

interface LoginProps {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginProps) => {
  return signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    return { error: null, data: user };
  })
  .catch((error) => {
    console.log(error.message);
    return { error, data: null };
  });
}

export const passwordReset = async (email: string) => {
  return sendPasswordResetEmail(auth, email)
  .then(() => {
    return { error: null, data: 'Email sent' };
  })
  .catch((error) => {
    console.log(error.message);
    return { error, data: null };
  });
}