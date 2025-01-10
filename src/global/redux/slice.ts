import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE: any = {
    language : navigator.language.split("-")[0]
}

export const getUserLanguage = createAsyncThunk('common/getUserLanguage',
    async ({id} : any)  => {
       
        let result : any = {language : 'en'}
         try {
            console.log(id)
            console.log(result)
        } catch (error) {
            
        }  
        return result
    }
)

export const commonSlice = createSlice({
    name: 'common',
    initialState : INITIAL_STATE,
    reducers: {
        
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

export default reducer