import React from 'react';
import { getProfile } from "../../../api/profileApi.js";
import {useParams} from "react-router-dom";
import ProfileBackground from "../../components/HomePage/ProfileBg.jsx";

const Profile = () => {

    const { id } = useParams();
    const [profile, setProfile] = React.useState(null);

    const getUserProfile = async() => {
        const response = await getProfile(id);
        setProfile(response);
        console.log(response);
    }

    React.useEffect(() => {
        getUserProfile();
    }, []);

  return (
       <>
           <main className="relative p-3 min-h-screen overflow-hidden">
                <ProfileBackground />
               <header className="p-3 border-b text-taupe-500 border-zinc-500">
                   <h1 className="text-3xl lg:text-5xl poppins-semibold">{`Welcome, ${profile?.name}`}</h1>
                   <h1 className="text-xl poppins-medium-italic text-taupe-600">@{profile?.username}</h1>
               </header>
           </main>
       </>
  );
};

export default Profile;
