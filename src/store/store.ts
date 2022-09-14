import { configureStore } from "@reduxjs/toolkit";
import dietMealGenerateReducer from "./dietMealGenerate";

export const store = configureStore({
  reducer: {
    dietMealGenerate: dietMealGenerateReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
