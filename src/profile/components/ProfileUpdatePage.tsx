import { Navigate, useParams } from "react-router-dom";
import { InfoProfile } from "./InfoProfile";
import "./ProfileUpdate.css";

export const ProfileUpdatePage = () => {
  const { option } = useParams<{ option: string }>();

  if (option !== "info") return <Navigate to="/profile" replace />;

  return (
    <div className='profile-update-container'>
      <InfoProfile />
    </div>
  )
}
