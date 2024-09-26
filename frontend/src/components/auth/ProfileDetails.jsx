import Navbar from '@components/shared/Navbar';
import React from 'react';
import { useSelector } from 'react-redux';
import { PencilIcon } from '@heroicons/react/24/outline'; 
import { useNavigate } from 'react-router-dom';

const ProfileDetails = () => {
  const { user } = useSelector(store => store.auth);
  console.log(user)
  const navigate = useNavigate();
  
  return (
    <>
      <div className="flex">
        <Navbar />
      </div>
      <div className="bg-white mt-32 md:mt-32 shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 max-w-xs sm:max-w-md md:max-w-3xl mx-auto relative">
        {/* Edit Icon */}
        <div className="absolute top-2 right-2">
          <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition">
            <PencilIcon onClick={() => navigate("/profile/edit")} className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start p-4 sm:p-8">
          <img
            src={user?.avatar} 
            alt="Profile Avatar"
            className="w-24 h-24 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 object-cover rounded-full sm:rounded-lg"
          />
          <div className="p-4 sm:pl-8 flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-semibold text-gray-900 text-center sm:text-left sm:text-xl md:text-2xl">
              {user?.name}
            </h3>
            <p className="mt-2 text-gray-600 text-sm sm:text-base md:text-lg text-center sm:text-left">
              {user?.address}
            </p>
            <p className="mt-2 text-blue-600 text-sm sm:text-base md:text-lg text-center sm:text-left">
              {user?.email}
            </p>
            <p className="mt-2 text-blue-600 text-sm sm:text-base md:text-lg text-center sm:text-left">
              {user?.phoneNo ||""}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetails;
