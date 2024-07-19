import { applyMiddleware, compose, configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { authReducer } from "./slices/auth";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer,
    },
    devTools: true,
},
composeEnhancers(applyMiddleware())
);

export default store;