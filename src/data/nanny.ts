import { EUserRole, UserProfile } from "../types/user";
import { generateName } from "./random";

function randomNany(): UserProfile {
  return {
    phone: Math.floor(Math.random() * 1000000000).toString(),
    profile: {
      fullname: generateName(),
      description:
        generateName() + ", " + generateName() + ", " + generateName() + ", " + generateName(),
      address: generateName(),
      experience: "5+",
      nRated: Math.floor(Math.random() * 1000)+ 100,
      rate: +(Math.random() * 3).toPrecision(2) + 2,
      price: Math.floor(Math.random() * 200) + 100,
    },
    role: EUserRole.Nanny,
  };
}

const NANNY: UserProfile[] = [];
for (let i = 0; i < 5; i++) {
  NANNY.push(randomNany());
}

export default NANNY;
