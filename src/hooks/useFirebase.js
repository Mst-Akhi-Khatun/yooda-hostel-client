import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import initializeFirebase from '../Firebase/firebase.init';


initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [admin, setAdmin] = useState(false);

    const auth = getAuth();


    const registerUser = (email, password, name, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setError('');
                const newUser = { email, displayName: name };
                setUser(newUser);

                storeUser(email, name)

                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                });
                history.replace('/dashboard');
            })
            .catch((error) => {
                setError(error.message);
                console.log(error);
            })
            .finally(() => setIsLoading(false));
    }

    const loginUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/dashboard';
                history.replace(destination);
                setError('');
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);

            } else {
                setUser({})
            }
            setIsLoading(false);
        });

    }, [])

    const logout = () => {
        setIsLoading(true);
        signOut(auth).then(() => {

        }).catch((error) => {

        })
            .finally(() => setIsLoading(false));
    }

    const storeUser = (email, displayName) => {
        const user = { email, displayName }
        fetch('http://localhost:5000/user', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
            .then()

    }
    // check admin
    useEffect(() => {
        fetch(`http://localhost:5000/saveUser/${user?.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin))
    }, [user?.email])


    return {
        admin,
        user,
        isLoading,
        error,
        registerUser,
        loginUser,
        logout
    }
}

export default useFirebase;
