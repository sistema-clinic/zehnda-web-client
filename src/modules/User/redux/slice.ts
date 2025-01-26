import { resetALL } from "@/global/redux/actions";
import { clientQuery, clientMutation } from "@/utils/database/apolloClient";
import Logger from "@/utils/log/logging";
import Session from "@/utils/session/session";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE: any = {
    user: null, result: {}
}

const log = Logger.getInstance();

export const getUserInfo = createAsyncThunk(
    'user/getUserInfo',
    async ({uid, token}: any, { getState }) => {
        const url = import.meta.env.VITE_GRAPHQL_SERVER;
        let result : any = { user: null }
        try {
            let response : any = await clientQuery(`
                query GetUsers($uid: String!) {
                    getAllUserInfo(uid: $uid) {
                        id
                        uid
                        email
                        authType
                        firstName
                        lastName
                        photoUrl
                        phoneNumber
                        lastLogin
                        gender
                        createdAt
                        updatedAt
                        countryCode
                        language
                    }                   
                }               
            `, {uid: uid}, url, { Token: token })
            result.user = response.getAllUserInfo
            log.log('getUserInfo result: ', result)
        } catch (error) {
            if(error?.cause && error?.cause?.message === "user_not_found"){
                result.result.authError = true
                Session.getInstance().renewSession()
            }
            log.error(error);
        }   
        return result;
    }
    /*,
    {
         condition: (_, { getState }) => {
            const state: any = getState();
            return !state.userReducer?.loading || false;
        }
    }*/
)

export const getUserPicture = createAsyncThunk(
    'user/getUserPicture',
    async ({uid, token}: any, { getState }) => {
        const url = import.meta.env.VITE_GRAPHQL_SERVER;
        let result : any = { user: null }
        try {
            let response : any = await clientQuery(`
                query GetUsers($uid: String!) {
                    getAllUserInfo(uid: $uid) {
                        id
                        uid                  
                        photoUrl                     
                    }                   
                }               
            `, {uid: uid}, url, { Token: token })
            result.user = response.getAllUserInfo
            log.log('getUserInfo result: ', result)
        } catch (error) {
            if(error?.cause && error?.cause?.message === "user_not_found"){
                result.result.authError = true
                Session.getInstance().renewSession()
            }
            log.error(error);
        }   
        return result;
    }
)


export const setUserInfo = createAsyncThunk(
    'user/setUserInfo',
    async ({uid, fName, lName, countryCode, phoneNumber, gender, languageCode, token}: any, { getState }) => {
        const url = import.meta.env.VITE_GRAPHQL_SERVER;
        let result : any = { result: {success: false, authError: false }}
        try {
            let response : any = await clientMutation(`
                mutation Mutation(
                    $uid: String!, 
                    $fName: String!, 
                    $languageCode: 
                    String!, 
                    $lName: String, 
                    $countryCode: String, 
                    $phoneNumber: String, 
                    $gender: String) {

                    setUser (
                        uid: $uid, 
                        fName: $fName, 
                        languageCode: $languageCode, 
                        lName: $lName, 
                        countryCode: $countryCode, 
                        phoneNumber: $phoneNumber, 
                        gender: $gender
                    )
                }              
            `, {
                uid: uid, 
                fName: fName, 
                lName: lName, 
                countryCode: countryCode, 
                phoneNumber: phoneNumber, 
                gender: gender, 
                languageCode: languageCode}, url, { Token: token })
                result.result.success = response.setUser == null ? false : true 
            log.log('setUserInfo result: ', result)
        } catch (error) {
            if(error?.cause && error?.cause?.message === "user_not_found"){
                result.result.authError = true
                Session.getInstance().renewSession()
            }
            log.error(error);
        }   
        return result;
    }
)

export const setPicture = createAsyncThunk(
    'user/setPicture',
    async ({uid, pictureUrl, mime, token}: any, { getState }) => {
        const url = import.meta.env.VITE_GRAPHQL_SERVER;
        let result : any = { result: {success: false, authError: false },  user : { photoUrl: null }}
        try {
            let response : any = await clientMutation(`
                mutation Mutation(
                    $uid: String!, 
                    $url: String!, 
                    $mime: String!) { 
                    setPicture (
                        uid: $uid, 
                        url: $url, 
                        mime: $mime 
                    )
                        {
                            photoUrl
                        }
                }              
            `, {
                uid: uid, 
                url: pictureUrl, 
                mime: mime }, url, { Token: token })
                result.result.success = response.setPicture == null ? false : true 
                if(result.result.success){
                    result.user.photoUrl = response.setPicture.photoUrl
                }
            log.log('setPicture result: ', result)            
        } 
        catch (error) {
            if(error?.cause && error?.cause?.message === "user_not_found"){
                result.result.authError = true
                Session.getInstance().renewSession()
            }
            log.error(error);
        }
        return result;
    }
)

export const UserSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        resetUser: (state, action) => {
            return action.payload && Object.keys(action.payload).length > 0 ? { ...state, ...action.payload } : { ...INITIAL_STATE }
        },
        resetResult: (state, action) => {
            return action.payload && Object.keys(action.payload).length > 0 ? { ...state, ...action.payload } : { ...INITIAL_STATE }
        },
        refreshPicture: (state, action) => {
            return action.payload && Object.keys(action.payload).length > 0 ? { ...state, ...action.payload } : { ...INITIAL_STATE }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetALL, () =>  INITIAL_STATE )
        builder.addCase(getUserInfo.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            state.user = action.payload.user
        });
        builder.addCase(getUserInfo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(setUserInfo.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(setUserInfo.fulfilled, (state, action) => {
            state.result = action.payload.result
        });
        builder.addCase(setUserInfo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(setPicture.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(setPicture.fulfilled, (state, action) => {
            state.result = action.payload.result
        });
        builder.addCase(setPicture.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }       
})

const { actions, reducer } = UserSlice;

export const { resetUser, resetResult, refreshPicture } = actions;
export default reducer;
