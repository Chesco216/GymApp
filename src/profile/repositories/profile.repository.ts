import { getUserDoc, saveUserDoc } from "../../common/repositories/user.repository";
import { loadSessionId } from "../../common/session/session.storage";
import { storage } from "../../common/firebase/client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import type { Profile } from "../interfaces/profile";

export const getProfile = async (fallbackUid?: string): Promise<Profile | null> => {
  const id = loadSessionId() ?? fallbackUid ?? null;
  if (!id) return null;
  return getUserDoc<Profile>(id);
};

export const saveProfile = async (profile: Profile): Promise<void> =>
  saveUserDoc(profile);

export const uploadProfilePicture = async (fileName: string, file: Blob): Promise<string | null> => {
  const profilePictureRef = ref(storage, `profile-images/${fileName}`);
  await uploadBytes(profilePictureRef, file);
  const getImageRef = ref(storage, `gs://jayani-power.appspot.com/profile-images/${fileName}`);
  return getDownloadURL(getImageRef);
};
