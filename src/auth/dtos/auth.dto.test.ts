import { describe, expect, test } from "vitest";
import { userSchema } from "./auth.dto";

describe("auth.dto userSchema", () => {
  test("accepts a minimal valid user", () => {
    const parsed = userSchema.safeParse({ uid: "u1", email: "user@example.com" });
    expect(parsed.success).toBe(true);
  });

  test("rejects missing uid and bad email", () => {
    expect(userSchema.safeParse({ email: "not-an-email" }).success).toBe(false);
    expect(userSchema.safeParse({ uid: "u1", email: "x" }).success).toBe(false);
  });
});
