import { configureStore } from "@reduxjs/toolkit";
import { campsitesReducer } from "../features/campsites/CampsitesSlice";
import { partnersReducer } from "../features/partners/PartnersSlice";
import { promotionsReducer } from "../features/promotions/promotionsSlice";
import { commentsReducer } from "../features/comments/CommentsSlice";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    campsites: campsitesReducer,
    partners: partnersReducer,
    promotions: promotionsReducer,
    comments: commentsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
