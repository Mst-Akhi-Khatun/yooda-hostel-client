
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, } from "firebase/auth";
import { useState, useEffect } from 'react';
import initializeAuth from "../Firebase/firebase.init";
initializeAuth();

const useFirebase = () => {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)

            .catch((error) => {
                setError(error.message);
            })
            .finally(() => { setLoading(false) })
    }


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
            else {
                setUser({});
            }
            setLoading(false)
        });
    }, [])

    const logOut = () => {
        setLoading(true);
        signOut(auth)
            .then(() => {
                setUser({});
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => { setLoading(false) })
    }

    return {
        googleSignIn,
        user,
        error,
        logOut,
        loading,
    }
}

export default useFirebase;