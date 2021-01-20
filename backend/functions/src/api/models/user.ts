import { firestore } from "firebase-admin";

interface UserProps {
  displayName: string;
  email: string;
  stripeId: string;
  uid: string;
}

export class User {
  displayName: string;
  email: string;
  stripeId: string;
  uid: string;

  constructor({ displayName, email, stripeId, uid }: UserProps) {
    this.displayName = displayName;
    this.email = email;
    this.stripeId = stripeId;
    this.uid = uid;
  }
}

export const UserConverter = {
  toFirestore: (user: User): firestore.DocumentData => {
    const { displayName, email, stripeId, uid } = user;
    return { displayName, email, stripeId, uid };
  },

  fromFirestore: (snapshot: firestore.QueryDocumentSnapshot) => {
    const data = snapshot.data() as UserProps;
    return new User(data);
  },
};
