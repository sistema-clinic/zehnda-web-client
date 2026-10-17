import { resetALL } from "@/global/redux/actions";
import { clientQuery } from "@/utils/database/apolloClient";
import Logger from "@/utils/log/logging";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE: any = {
    internalData : {
        id : -1,
        uid : '',
        firstName : '',
        lastName : '',
        email : '',
        language : '',
        authType : '',
        photoUrl: '',
        role : {
            id: -1,
            name: "",
            menu: [],
            permissions: []
        },
    }
}

const log = Logger.getInstance();

export const getAuthInfo = createAsyncThunk('utils/auth/getAuthInfo',
    async ({uid, token, displayName, email, phoneNumber, photoUrl, authType }: any) => {
        const url = import.meta.env.VITE_GRAPHQL_SERVER;
        let result : any = {
            id : -1,
            uid : '',
            email : '',
            language : '',
            authType : '',
            role : {}            
        }
        const language = navigator.language.split("-")[0]
        try {
            let user : any = await clientQuery(`
                query GetUsers($uid: String!, $displayName: String!, $email: String!, $phoneNumber: String, $photoUrl: String, $authType: String!, $language: String!) {
                    getUserInfo(uid: $uid, displayName: $displayName, email: $email, phoneNumber: $phoneNumber, photoUrl: $photoUrl, authType: $authType, language: $language) {
                        id
                        firstName
                        lastName
                        uid
                        email
                        authType
                        language
                        countryCode
                        photoUrl                          
                    }                   
                }               
            `, {uid: uid, displayName: displayName, email: email, phoneNumber: phoneNumber, photoUrl: photoUrl, authType: authType, language: language}, url, { token: token })

            result.id = user.getUserInfo.id
            result.uid = user.getUserInfo.uid
            result.email = user.getUserInfo.email
            result.language = user.getUserInfo.language
            result.authType = user.getUserInfo.authType
            result.firstName = user.getUserInfo.firstName
            result.lastName = user.getUserInfo.lastName
            result.photoUrl = user.getUserInfo.photoUrl

            let role : any = await clientQuery(`
                query GetRoleData($uid: String!) {
                    getRoleData(uid: $uid) {
                        uid
                        role {
                        id
                        name
                        menu {
                            id
                            name
                            visible
                            type
                            lang_code
                            icon
                            template
                            parent
                            page
                            position
                        }
                        permissions {
                            permission {
                                key
                            }
                            section {
                                code
                            }
                        }
                        }
                    }
                }               
            `, {uid: uid}, url, { token: token })

            result.role = role.getRoleData.role
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
