import { UserProfile } from "./user";

export type UserRating = {
  fromUser: UserProfile;
  toUser: UserProfile;
  rate: number;
  description: string;
};
