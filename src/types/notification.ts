import { UserProfile } from "./user";

export type NotificationItemProps = {
  fromUser: UserProfile;
  date?: Date;
  time?: {
    start: string;
    end: string;
  };
};
