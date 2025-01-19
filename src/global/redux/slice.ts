import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Logger from "@utils/log/logging";
import { resetALL } from "./actions";
import { clientQuery } from "@/utils/database/apolloClient";

const INITIAL_STATE: any = {
    language : navigator.language.split("-")[0],
    page : '',
    breadCrumb : [],
    countries : []
}

const log = Logger.getInstance();

export const getCountries = createAsyncThunk('global/getCountries',
    async ({token, code} : any) => {
        const url = import.meta.env.VITE_GRAPHQL_SERVER;
        let result = { countries : [] }
        try {
            let countries: any = await clientQuery(`
                query GetCountries($code: String!) {
                    getCountries (code: $code) {
                        id
                        name
                        code
                        areaCode
                    }
                }        
            `, {code: code}, url, { Token: token })

            result.countries = countries.getCountries
            log.log('getCountries result: ', result)
        } 
        catch (error) {
            log.error(error);
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
        },
        setUserLanguage : (state, action) => {
            return action.payload ? { ...state, ...action.payload } : INITIAL_STATE
        }
    },
    extraReducers :(builder) => {
        builder.addCase(resetALL, () =>  INITIAL_STATE )
        builder.addCase(getCountries.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getCountries.fulfilled, (state, action) => {
            state.countries = action.payload.countries
        });
        builder.addCase(getCountries.rejected, (state, action) => {
            state.loading = false;
        });
    }
})

const { actions, reducer } = commonSlice;

export const { changePage, setBreadCrumb, setUserLanguage } = actions

export default reducer