import type { User } from "../../auth/interfaces/user";

export type Profile = User;

export interface ProfileForm {
  age: number;
  weight: number;
  height: number;
  gender: string;
  foodRestrictions: string;
  physicalLimitations: string;
  goal: string;
}
