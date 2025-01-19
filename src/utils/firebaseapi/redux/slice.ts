import { resetALL } from "@/global/redux/actions";
import { clientQuery } from "@/utils/database/apolloClient";
import Logger from "@/utils/log/logging";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE: any = {
    internalData : {
        id : -1,
        uid : '',
        email : '',
        language : '',
        authType : '',
    }
}

const log = Logger.getInstance();

export const getAuthInfo = createAsyncThunk('utils/auth/getAuthInfo',
    async ({uid, token, displayName, email, phoneNumber, photoUrl, authType }: any) => {
        const url = import.meta.env.VITE_GRAPHQL_SERVER;
        let result : any = INITIAL_STATE.internalData
        const language = navigator.language.split("-")[0]
        try {
            let response : any = await clientQuery(`
                query GetUsers($uid: String!, $displayName: String!, $email: String!, $phoneNumber: String, $photoUrl: String, $authType: String!, $language: String!) {
                    getUserInfo(uid: $uid, displayName: $displayName, email: $email, phoneNumber: $phoneNumber, photoUrl: $photoUrl, authType: $authType, language: $language) {
                        id
                        uid
                        email
                        authType
                        language
                        countryCode                          
                    }                   
                }               
            `, {uid: uid, displayName: displayName, email: email, phoneNumber: phoneNumber, photoUrl: photoUrl, authType: authType, language: language}, url, { token: token })
            result = response.getUserInfo
            log.log('result: ', result)
        } catch (error) {
            log.error(error);
        }   
        return result;
    } 
    
)

export const userSlice = createSlice({
    name: 'userData',
    initialState : INITIAL_STATE,
    reducers: {
        resetUserData: (state, action) => {
            return action.payload ? { ...state, ...action.payload } : INITIAL_STATE
        }
    },
    extraReducers :(builder) => {
        builder.addCase(resetALL, () =>  INITIAL_STATE )
        builder.addCase(getAuthInfo.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAuthInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.internalData = action.payload;
        });
        builder.addCase(getAuthInfo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

const { actions, reducer } = userSlice;

export const { resetUserData } = actions

export default reducer
