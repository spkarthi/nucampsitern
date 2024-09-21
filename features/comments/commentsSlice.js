//import { COMMENTS } from "../../app/shared/COMMENTS";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../app/shared/baseUrl";

const initialState = {
  commentsArray: [],
  isLoading: true,
  errMsg: "",
};

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const response = await fetch(baseUrl + "comments");
    if (!response.ok) {
      return Promise.reject(
        "Unable to fetch data from the server " + response.statusText
      );
    }
    const comments = await response.json();
    return comments;
  }
);

export const postComment = createAsyncThunk(
  "comments/postComment",
  async (comment, { dispatch }) => {
    const response = await fetch(baseUrl + "comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    if (!response.ok) {
      return Promise.reject(
        "Unable to post data to the server " + response.statusText
      );
    }
    const data = await response.json();
    dispatch(addComment(data));
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.commentsArray.push(action.payload);
    },
  },
  extraReducers: {
    [fetchComments.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errMsg = "";
      state.commentsArray = action.payload;
    },
    [fetchComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.errMsg = action.error ? action.error.message : "Fetch failed";
    },

    [postComment.rejected]: (state, action) => {
      alert(
        "Your comment could not be posted\nError: " +
          (action.error ? action.error.message : "Fetch failed")
      );
    },
  },
});

export const commentsReducer = commentsSlice.reducer;

export const { addComment } = commentsSlice.actions;

export const selectCommentsByCampsiteId = (campsiteId) => (state) => {
  return state.comments.commentsArray.filter(
    (comment) => comment.campsiteId === parseInt(campsiteId)
  );
};

export const selectCommentById = (id) => {
  return (state) => {
    return {
      comment: state.comments.commentsArray.find(
        (comment) => comment.id === parseInt(id)
      ),
      isLoading: state.comments.isLoading,
      errMsg: state.comments.errMsg,
    };
  };
};
