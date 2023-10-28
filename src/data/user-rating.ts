import { UserRating } from "../types/rating";
import NANNY from "./nanny";

export const USER_RATINGS: UserRating[] = NANNY.map((user, i) => {
  return {
    fromUser: user,
    toUser: NANNY[i + 1],
    rate: +(Math.random() * 3).toPrecision(1) + 2,
    description:
      "Lorem ipsum dolor sit amet consectetur. Accumsan faucibus ut mattis massa lacus posuere pretium. Lorem ipsum dolor sit amet consectetur.",
  };
});
