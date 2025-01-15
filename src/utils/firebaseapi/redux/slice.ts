import { clientQuery } from "@/utils/database/apolloClient";
import Logger from "@/utils/log/logging";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE: any = {
    internalData : {
        id : -1,
        uid : '',
        email : '',
        authType : '',
    }
}

export const getAuthInfo = createAsyncThunk('utils/auth/getAuthInfo',
    async ({uid, token}: any) => {
        const url = import.meta.env.VITE_GRAPHQL_SERVER;
        let result : any = INITIAL_STATE.internalData
        const log = Logger.getInstance();
        try {
            let response : any = await clientQuery(`
                query GetUsers($uid: String!) {
                    getUserInfo(uid: $uid) {
                        id
                        uid
                        email
                        authType                          
                    }                   
                }               
            `, {uid: uid}, url, { token: token })
            result = response.getUserInfo
            log.log(result)
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
