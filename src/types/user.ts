import { collection, getDocs, query, where } from "firebase/firestore";
import { ADDRESS_TREE } from "../data/address";
import { firebaseDB } from "../firebase";

export enum EUserRole {
  None,
  Nanny,
  Parent,
}

export enum EGender {
  None = "",
  Male = "M",
  Female = "F",
}

export interface UserProfile<T = Nanny> {
  phone: string;
  password?: string;
  profile: T;
  role: EUserRole;
}

export interface Nanny {
  fullname: string;
  district: keyof typeof ADDRESS_TREE;
  experience: string;
  description: string[];
  avatar?: string;
  age: number;
  rate?: number;
  nRated?: number;
  price: number;
}

export interface Parrent {
  fullname: string;
  age: number;
  avatar: string;
  avatarName: string;
  district: keyof typeof ADDRESS_TREE;
  gender: EGender;
}

export type INanny = UserProfile<Nanny>;
export type IParent = UserProfile<Parrent>;

const userRef = collection(firebaseDB, "users");

export async function getNannies() {
  const q = query(userRef, where("role", "==", EUserRole.Nanny));
  const res = await getDocs(q);
  const users = res.docs.map((userDoc) => userDoc.data() as UserProfile<Nanny>);
  return users.map((u) => {
    return {
      ...u,
      profile: {
        ...u,
        ...u.profile,
      },
    } as UserProfile<Nanny>;
  });
}
