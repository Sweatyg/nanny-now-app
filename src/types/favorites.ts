import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { INanny, IParent, Nanny, UserProfile } from "./user";
import { firebaseDB } from "../firebase";

export interface IFavorite {
  parent: string | IParent;
  nanny: string | INanny;
}

const favoriteRef = collection(firebaseDB, "favorites");

export async function getFavoriteNannies(parentPhone: string) {
  const q = query(favoriteRef, where("parent", "==", parentPhone));
  const res = await getDocs(q);
  const nannies = await Promise.all(
    res.docs.map((favRes) => getDoc(doc(firebaseDB, "users", favRes.data().nanny)))
  );
  const users = nannies.map((nanny) => nanny.data() as INanny);
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

export async function createFavorite(parent: string, nanny: string) {
  await addDoc(favoriteRef, { parent, nanny });
}

export async function removeFavorite(parent: string, nanny: string) {
  const q = query(favoriteRef, where("parent", "==", parent), where("nanny", "==", nanny));
  const res = await getDocs(q);
  if (res.size > 0) {
    await deleteDoc(doc(favoriteRef, res.docs[0].id));
  }
}

export async function checkFav(parent: string, nanny: string) {
  const q = query(favoriteRef, where("parent", "==", parent), where("nanny", "==", nanny));
  const res = await getDocs(q);
  return res.size > 0;
}
