import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },

    subscriptions: (state, action) => {
      if (state.currentUser.subscriberUsers.includes(action.payload)) {
        state.currentUser.subscriberUsers.splice(
          state.currentUser.subscriberUsers.findIndex(
            (channelId) => channelId === action.payload
          ),
          1
        );
      } else {
        state.currentUser.subscriberUsers.push(action.payload);
      }
    },
  },
});
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  subscriptions,
} = userSlice.actions;
export default userSlice.reducer;
