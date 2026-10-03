export interface User {
  uid: string;
  email?: string | null;
  username?: string | null;
  displayName?: string | null;
  weight?: number | null;
  height?: number | null;
  age?: number | null;
  profilePictureUrl?: string | null;
  memberType?: string | boolean | null;
}

export interface Session {
  user: User | undefined;
}
