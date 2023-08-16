import { createSlice } from "@reduxjs/toolkit";

//lưu token và thông tin user
const innitialAuth = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: innitialAuth,
  reducers: {
    login(state, action) {
      const user = action.payload.employee;
      state.user = user;

      localStorage.setItem("user", JSON.stringify(user));
    },

    clearUser(state) {
      localStorage.removeItem("user");
      state.user = null;
    },
    // logout(state) {
    //   state.token = "";
    //   state.user = null;

    //   localStorage.removeItem("token");
    //   localStorage.removeItem("expiredTime");
    //   localStorage.removeItem("user");
    // },

    //UX
    // applyData(state, action) {
    //   state.token = action.payload.token;
    //   state.user = action.payload.user;
    // },
  },
});

export default authSlice;
