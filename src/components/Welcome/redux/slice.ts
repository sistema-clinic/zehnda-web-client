import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE: any = {
    WelcomeText : ''
}

export const WelcomeSlice = createSlice({
    name: 'welcome',
    initialState : INITIAL_STATE,
    reducers: {
        getWelcomeText: (state, action) => {
            return action.payload ? { ...state, ...action.payload } : INITIAL_STATE
        }
    }
})

const { actions, reducer } = WelcomeSlice;

export const { getWelcomeText } = actions

export default reducer