import Logger from "@/utils/log/logging";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE: any = {
    userData :{
        currentUser : {},
        isLogin: false,
        isloading: true,
        token: '',
        internalData: {}
    }
}

export const getUser = createAsyncThunk('utils/users/getUser',
    async (data : any)  => {
        const log = Logger.getInstance();
        const { user } = data
        let result : any = {}
        let internalData : any = {'name': 'Carlos','lastname' : 'Morante'}
        try {
        
            result = {
                currentUser: user,
                isLogin: true,
                isloading: false,
                token: '1234',
                internalData: internalData
            }        
            
        } catch (exc) {
            log.error(exc)
        } 
        return result
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
        builder.addCase(getUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
        });
        builder.addCase(getUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

const { actions, reducer } = userSlice;

export const { resetUserData } = actions

export default reducer
