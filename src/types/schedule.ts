import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { INanny, IParent } from "./user";
import { firebaseDB } from "../firebase";
import moment from "moment";

export interface ISchedule {
  id?: string;
  parent: string | IParent;
  nanny: string | INanny;
  datetime: string | Date;
  district: string;
  address: string;
  note: string;
}

const scheduleRef = collection(firebaseDB, "schedules");

export async function getSchedule(parent: string) {
  const q = query(scheduleRef, where("parent", "==", parent));
  const res = await getDocs(q);
  if (res.size === 0) {
    return null;
  }
  const bookings = res.docs
    .map((bookingDoc) => {
      return {
        ...bookingDoc.data(),
        id: bookingDoc.id,
      } as ISchedule;
    })
    .sort((a, b) => moment(b.datetime).diff(a.datetime));

  const nextSchedule = bookings[0];
  if (moment(new Date()).isBefore(nextSchedule.datetime)) {
    const nannyInfo = await getDoc(doc(firebaseDB, "users", nextSchedule.nanny as string));
    return {
      ...nextSchedule,
      nanny: {
        ...nannyInfo.data(),
        profile: {
          ...nannyInfo.data(),
          ...(nannyInfo.data() as any).profile,
        },
      },
    };
  } else {
    return null;
  }
}

export async function createSchedule(data: ISchedule) {
  await addDoc(scheduleRef, data);
}
