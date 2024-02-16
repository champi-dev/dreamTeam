import { createUserWithEmailAndPassword } from "firebase/auth";
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