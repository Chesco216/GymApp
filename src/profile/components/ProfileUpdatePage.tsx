import { useParams } from "react-router-dom";
import { InfoProfile } from "./InfoProfile";
import { Loading } from "../../common/components/Loading";
import "./ProfileUpdate.css";

export const ProfileUpdatePage = () => {
  const { option } = useParams<{ option: string }>();

  return (
    <div className='profile-update-container'>
      {
        (option === 'info') ? (<InfoProfile />)
        : <Loading />
      }
    </div>
  )
}
