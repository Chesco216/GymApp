import { getUserDoc, saveUserDoc } from "../../common/repositories/user.repository";
import { loadSessionId } from "../../common/session/session.storage";
import type { Profile } from "../interfaces/profile";

export const getProfile = async (fallbackUid?: string): Promise<Profile | null> => {
  const id = loadSessionId() ?? fallbackUid ?? null;
  if (!id) return null;
  return getUserDoc<Profile>(id);
};

export const saveProfile = async (profile: Profile): Promise<void> =>
  saveUserDoc(profile);
