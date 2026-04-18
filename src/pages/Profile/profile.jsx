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
           <main className="relative p-3 flex flex-col min-h-screen overflow-hidden">
               <ProfileBackground />

               <header className="p-3 border-b border-emerald-900/40 text-emerald-100">
                   <h1 className="text-3xl lg:text-5xl poppins-semibold">
                       {`Welcome, ${profile?.name}`}
                   </h1>
                   <h1 className="text-xl montserrat-200 text-emerald-300">
                       @{profile?.username}
                   </h1>
               </header>

               <div className="flex flex-1 montserrat-400 text-emerald-200 justify-center items-center text-center">
                   <h1>
                       [ THE PROFILE PAGE IS STILL UNDER DEVELOPMENT. v1 WILL BE OUT SOON ]
                   </h1>
               </div>
           </main>
       </>
  );
};

export default Profile;
