import { clientQuery } from "@/utils/database/apolloClient";
import Logger from "@/utils/log/logging";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE: any = {
    user: null
}

export const getUserInfo = createAsyncThunk('user/getUserInfo', 
    async ({uid, token}: any) => {
        const url = import.meta.env.VITE_GRAPHQL_SERVER;
        let result : any = { user: null }
        const log = Logger.getInstance();
        try {
            let response : any = await clientQuery(`
                query GetUsers($uid: String!) {
                    getUserInfo(uid: $uid) {
                        id
                        uid
                        email
                        authType
                        firstName
                        lastName
                        photoUrl
                        phoneNumber
                        lastLogin
                        createdAt
                        updatedAt
                    }                   
                }               
            `, {uid: uid}, url, { Token: token })
            result.user = response.getUserInfo
            log.log(result)
        } catch (error) {
            log.error(error);
        }   
        return result;
})


export const UserSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
    },
    extraReducers: (builder) => {
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
    }       
})

const { actions, reducer } = UserSlice;

export default reducer;
