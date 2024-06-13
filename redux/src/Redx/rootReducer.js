import { combineReducers } from "@reduxjs/toolkit";
import {operationsReducer} from "./todoapp/reducers/operations";
 
export const rootReducer = combineReducers({
    operationsReducer
});
