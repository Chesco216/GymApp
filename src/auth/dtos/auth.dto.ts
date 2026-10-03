import { z } from "zod";

export const userSchema = z.object({
  uid: z.string().min(1),
  email: z.string().email().nullish(),
  username: z.string().nullish(),
  displayName: z.string().nullish(),
  weight: z.number().nullish(),
  height: z.number().nullish(),
  age: z.number().nullish(),
  profilePictureUrl: z.string().nullish(),
  memberType: z.union([z.string(), z.boolean()]).nullish(),
});

export type UserDto = z.infer<typeof userSchema>;
