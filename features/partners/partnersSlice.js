//import { PARTNERS } from "../../app/shared/PARTNERS";
import { createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../app/shared/baseUrl";
import { mapImageUrl } from "../../utils/mapImageUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPartners = createAsyncThunk(
  "partners/fetchPartners",
  async () => {
    const response = await fetch(baseUrl + "partners");
    if (!response.ok) {
      return Promise.reject(
        "Unable to fetch data from the server " + response.statusText
      );
    }
    const partners = await response.json();
    return partners;
  }
);

const initialState = {
  partnersArray: [],
  isLoading: true,
  errMsg: "",
};

const partnersSlice = createSlice({
  name: "partners",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPartners.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchPartners.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errMsg = "";
      state.partnersArray = mapImageUrl(action.payload);
    },
    [fetchPartners.rejected]: (state, action) => {
      state.isLoading = false;
      state.errMsg = action.error ? action.error.message : "Fetch failed";
    },
  },
});

export const partnersReducer = partnersSlice.reducer;

export const selectAllPartners = (state) => {
  return state.partners.partnersArray;
};

export const selectFeaturedPartners = (state) => {
  return {
    featured: state.partners.partnersArray.filter(
      (partner) => partner.featured
    ),
    isLoading: state.partners.isLoading,
    errMsg: state.partners.errMsg,
  };
};
