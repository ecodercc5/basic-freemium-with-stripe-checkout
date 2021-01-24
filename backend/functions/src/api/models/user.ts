import { firestore } from "firebase-admin";

interface UserProps {
  displayName: string;
  email: string;
  stripeId: string;
  uid: string;
  active?: boolean;
  isPremium?: boolean;
  subscriptionId?: string;
}

export class User {
  displayName: string;
  email: string;
  stripeId: string;
  uid: string;
  active?: boolean;
  isPremium?: boolean;
  subscriptionId?: string;

  constructor({
    displayName,
    email,
    stripeId,
    uid,
    active,
    isPremium,
    subscriptionId,
  }: UserProps) {
    this.displayName = displayName;
    this.email = email;
    this.stripeId = stripeId;
    this.uid = uid;
    this.active = active;
    this.isPremium = isPremium;
    this.subscriptionId = subscriptionId;
  }
}

export const UserConverter = {
  toFirestore: (user: User): firestore.DocumentData => {
    return Object.assign({}, user);
  },

  fromFirestore: (snapshot: firestore.QueryDocumentSnapshot) => {
    const data = snapshot.data() as UserProps;
    return new User(data);
  },
};
