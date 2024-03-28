import { combineReducers } from "@reduxjs/toolkit";
import user from './slices/user';

const rootReducer = combineReducers({
    user
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;