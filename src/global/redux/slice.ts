import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Logger from "@utils/log/logging";

const INITIAL_STATE: any = {
    language : navigator.language.split("-")[0],
    page : '',
    breadCrumb : []
}

export const getUserLanguage = createAsyncThunk('common/getUserLanguage',
    async ({id} : any)  => {
        const log = Logger.getInstance();
        let result : any = {language : 'en'}
         try {
            log.error(result)
        } catch (error) {
            log.error(error)
        }  
        return result
    }
)


export const commonSlice = createSlice({
    name: 'common',
    initialState : INITIAL_STATE,
    reducers: {
        changePage : (state, action) => {
            return action.payload ? { ...state, ...action.payload } : INITIAL_STATE
        },
        setBreadCrumb : (state, action) => {
            return action.payload ? { ...state, ...action.payload } : INITIAL_STATE
        }
    },
    extraReducers :(builder) => {
        builder.addCase(getUserLanguage.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getUserLanguage.fulfilled, (state, action) => {
            state.language = action.payload.language
        });
        builder.addCase(getUserLanguage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

const { actions, reducer } = commonSlice;

export const { changePage, setBreadCrumb } = actions

export default reducer