import { applyMiddleware, compose, configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = configureStore({
    reducer: {
        posts: postsReducer,
    },
    devTools: true,
},
composeEnhancers(applyMiddleware())
);

export default store;