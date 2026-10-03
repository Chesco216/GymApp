export interface User {
  uid: string;
  email?: string | null;
  username?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  weight?: number | null;
  height?: number | null;
  age?: number | null;
  profilePictureUrl?: string | null;
  memberType?: string | boolean | null;
  gender?: string | null;
  foodRestrictions?: string | null;
  physicalLimitations?: string | null;
  goal?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface Session {
  user: User | undefined;
}
