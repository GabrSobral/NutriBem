import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { EditProfileActions, EditProfileState, initialEditProfileState, ProfileReducer } from "./reducers/edit-profile-reducer";

interface ProfileContextProps {
    editProfileState: EditProfileState;
    editProfileDispatch: Dispatch<EditProfileActions>;
}

export const ProfileContext = createContext({} as ProfileContextProps);

interface ProfileProviderProps { children: ReactNode }

export function ProfileProvider({children}: ProfileProviderProps) {
    const [ editProfileState, editProfileDispatch ] = useReducer(ProfileReducer, initialEditProfileState);

    return (
        <ProfileContext.Provider value={{
            editProfileState,
            editProfileDispatch
        }}>
            {children}
        </ProfileContext.Provider>
    )
}