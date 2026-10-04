import "./UserAvatar.css";

interface UserAvatarProps {
  name?: string | null;
  photoUrl?: string | null;
  size?: number;
}

/** Foto de perfil o inicial del nombre (sin Storage: usa la foto de Google si existe). */
export const UserAvatar = ({ name, photoUrl, size = 96 }: UserAvatarProps) => {
  const initial = (name?.trim().charAt(0) ?? "?").toUpperCase();
  const style = { width: size, height: size, fontSize: size * 0.4 } as const;

  if (photoUrl) {
    return <img className='user-avatar-img' style={style} src={photoUrl} alt={name ?? "Perfil"} />;
  }
  return (
    <span className='user-avatar-initial' style={style} aria-label={name ?? "Perfil"}>
      {initial}
    </span>
  );
};
