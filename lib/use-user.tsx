import { useEffect } from "react";
import { useShared } from "./use-provider";
import {
    User,
    onIdTokenChanged,
    signOut,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";
import { auth } from "./firebase";

export interface userData {
    photoURL: string | null;
    uid: string;
    displayName: string | null;
    email: string | null;
};

export function useUser() {

    const _store = useShared<{
        loading: boolean,
        data: userData | null
    }>('user', {
        loading: true,
        data: null
    });

    const setUser = _store[1];

    useEffect(() => {

        setUser(v => ({ ...v, loading: true }));

        // subscribe to user changes
        return onIdTokenChanged(auth, (_user: User | null) => {

            setUser(v => ({ ...v, loading: true }));

            if (!_user) {
                setUser({ data: null, loading: true });
                return;
            }

            // map data to user data type
            const { photoURL, uid, displayName, email } = _user;
            const data = { photoURL, uid, displayName, email };

            // print data in dev mode
            if (process.env.NODE_ENV === 'development') {
                console.log(data);
            }

            // set store
            setUser(v => ({ ...v, data }));
        });

    }, [setUser]);

    return _store;
}

export const loginWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());

export const logout = () => signOut(auth);