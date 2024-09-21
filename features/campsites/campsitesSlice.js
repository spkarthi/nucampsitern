import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { CAMPSITES } from "../../app/shared/CAMPSITES";
import { baseUrl } from "../../app/shared/baseUrl";
import { mapImageUrl } from "../../utils/mapImageUrl";

export const fetchCampsites = createAsyncThunk(
  "campsites/fetchCampsites",
  async () => {
    const response = await fetch(baseUrl + "campsites");
    if (!response.ok) {
      return Promise.reject(
        "Unable to fetch data from the server " + response.statusText
      );
    }
    const campsites = await response.json();
    return campsites;
  }
);

const initialState = {
  campsites: [],
  isLoading: true,
  errMsg: "",
};

const campsitesSlice = createSlice({
  name: "campsites",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCampsites.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchCampsites.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errMsg = "";
      state.campsites = mapImageUrl(action.payload);
    },
    [fetchCampsites.rejected]: (state, action) => {
      state.isLoading = false;
      state.errMsg = action.error ? action.error.message : "Fetch failed";
    },
  },
});

export const campsitesReducer = campsitesSlice.reducer;

export const selectAllCampsites = (state) => {
  return state.campsites.campsites;
};

export const selectCampsiteById = (id) => (state) => {
  return {
    campsite: state.campsites.campsites.find(
      (campsite) => campsite.id === parseInt(id)
    ),
    isLoading: state.campsites.isLoading,
    errMsg: state.campsites.errMsg,
  };
};

export const selectFeaturedCampsites = (state) => {
  return {
    featured: state.campsites.campsites.filter((campsite) => campsite.featured),
    isLoading: state.campsites.isLoading,
    errMsg: state.campsites.errMsg,
  };
};
