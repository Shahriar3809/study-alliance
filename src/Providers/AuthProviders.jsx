import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";


export const AuthContext = createContext(null);


const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
   const githubProvider = new GithubAuthProvider();
 
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const githubLogin = () => {
    setLoading(true)
    return signInWithPopup(auth, githubProvider);
  };



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false)
    //   if (currentUser) {
    //     // get token and store
    //     // const userInfo = { email: currentUser.email };
    //     // axiosPublic.post("/jwt", userInfo).then((res) => {
    //     //   if (res.data.token) {
    //     //     localStorage.setItem("access-token", res.data.token);
    //     //     setLoading(false);
    //     //   }
    //     // });
    //   } else {
    //     // remove Token
    //     // localStorage.removeItem("access-token");
    //     // setLoading(false);
    //   }
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading,
    setUser,
    createUser,
    logIn,
    logOut,
    googleLogin,
    githubLogin,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProviders.propTypes = {
  children: PropTypes.any,
};
export default AuthProviders;
