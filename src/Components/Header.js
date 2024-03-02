import React from "react";
import { auth } from "../utils/Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/GptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // window.location.reload();
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  useEffect(() => {
    //here i have use useEffect becoz i want to run the below code once only.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
        // ...As if user logged in navigate it to browse page
      } else {
        // User is signed out
        // ...navigate user to main page if user sign - out
        dispatch(removeUser());
        navigate("/");
      }
    });
    //we unsubscribe kind of like event listner onauthchnged -> when the component is unmount
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    //Toggle GPT Search
    dispatch(toggleGptSearchView());
  };
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(changeLanguage(selectedLanguage));
  };

  return (
    <div className="absolute 
          w-screen
           px-8 py-2
            bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className=" w-40 md:w-44 mx-auto md:mx-0" src={LOGO} alt="Logo" />

      {user && (
        <div className="flex p-2  justify-between">
          {showGptSearch && (
            <select
              className="bg-gray-900 p-2 text-white h-14 rounded-lg"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 md:py-2 px-4 md:px-2 mx-4 my-2 bg-purple-800 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "HomePage" : "GPT Search"}
          </button>
          <img
            className=" pr-2 pl-0 hidden md:block w-12 h-12"
            alt="user-icon"
            src={user?.photoURL}
          />
          <button
            onClick={handleSignOut}
            className=" py-2 px-2 md:px-4 mx-0 my-2 font-bold text-center md:pl-2 text-white bg-red-800 rounded-lg "
          >
            Log-Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
