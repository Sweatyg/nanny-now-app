import { MessageItemProps } from "../types/message";
import NANNY from "./nanny";

export const MESSAGES: MessageItemProps[] = NANNY.map((user) => ({
  targetUser: user,
  lastMassage: user.profile.description,
  date: new Date(),
}));
