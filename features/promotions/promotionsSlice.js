//import { PROMOTIONS } from "../../app/shared/PROMOTIONS";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../app/shared/baseUrl";
import { mapImageUrl } from "../../utils/mapImageUrl";

export const fetchPromotions = createAsyncThunk(
  "promotions/fetchPromotions",
  async () => {
    const response = await fetch(baseUrl + "promotions");
    if (!response.ok) {
      return Promise.reject(
        "Unable to fetch data from the server " + response.statusText
      );
    }
    const promotions = await response.json();
    return promotions;
  }
);

const initialState = {
  promotionsArray: [],
  isLoading: true,
  errMsg: "",
};

const promotionsSlice = createSlice({
  name: "promotions",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPromotions.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchPromotions.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errMsg = "";
      state.promotionsArray = mapImageUrl(action.payload);
    },
    [fetchPromotions.rejected]: (state, action) => {
      state.isLoading = false;
      state.errMsg = action.error ? action.error.message : "Fetch failed";
    },
  },
});

export const promotionsReducer = promotionsSlice.reducer;

export const selectAllPromotions = (state) => {
  return state.promotions.promotionsArray;
};

export const selectFeaturedPromotion = (state) => {
  return {
    featured: state.promotions.promotionsArray.filter(
      (promotion) => promotion.featured
    ),
    isLoading: state.promotions.isLoading,
    errMsg: state.promotions.errMsg,
  };
};
