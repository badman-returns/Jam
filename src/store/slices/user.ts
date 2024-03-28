import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces/user';
import { INITIAL_STATE } from '../initialState/user';

const initialState = INITIAL_STATE;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        storeUserData(state, action: PayloadAction<IUser>) {
          return {
            ...state,
            ...action.payload
          } 
        },
    }
});

export const { storeUserData } = userSlice.actions;

export const userSelector = (state: any) => state.rootReducer.user;

export default userSlice.reducer;