import { selector } from "recoil";
import { checkState, connectedCredentials, userProfileDetails } from "./Variables";

export const getLogin=selector({
    key: "abc",
    get: ({get})=>{
        const check =get(checkState);
        return check.isLoginOpen;
    }
});

export const getSignUp=selector({
    key: "efg",
    get: ({get})=>{
        const check =get(checkState);
        return check.isSignUpOpen;
    }
});

export const userName=selector({
    key: "ijk",
    get: ({get})=>{
        const check =get(connectedCredentials);
        return check.name;
    }
});

export const userToken=selector({
    key: "lmn",
    get: ({get})=>{
        const check =get(connectedCredentials);
        return check.token;
    }
});

export const getUserProfileDetails=selector({
    key: "opq",
    get: ({get})=>{
        const check =get(userProfileDetails);
        return check.isProfile;
    }
});