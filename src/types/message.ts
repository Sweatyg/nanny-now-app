import { UserProfile } from "./user";

export type MessageItemProps = {
  targetUser: UserProfile;
  lastMassage: string;
  date: Date;
};
