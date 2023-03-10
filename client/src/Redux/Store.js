import { configureStore } from "@reduxjs/toolkit";
import Reducer1 from "./Reducers";

const store = configureStore({
    reducer: {
        r1: Reducer1
    }
})

export default store