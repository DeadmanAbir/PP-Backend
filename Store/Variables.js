import { atom } from "recoil";

export const checkState=atom({
    key: "a",
    default: {
        isLoginOpen: false,
        isSignUpOpen: false
    }
});

export const connectedCredentials=atom({
    key: "b",
    default: {
        name: null,
        token: null
    }
});

export const userProfileDetails=atom({
    key: "c",
    default: {
        isProfile: false
    }
});