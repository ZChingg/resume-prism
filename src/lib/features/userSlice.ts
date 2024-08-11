import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// 因 action 有 payload 故需定義型別使用 PayloadAction

interface UserProfile {
  name: string;
  email: string;
  login: boolean;
}

interface UserState {
  profile: UserProfile;
}

const initialState: UserState = {
  profile: {
    name: "",
    email: "",
    login: false,
  },
};

// reducer
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<UserProfile>) {
      // 若此 function 需靠外部(參數)傳資料進來則需 action
      // console.log(action)
      state.profile = action.payload;
    },
    setLogout(state) {
      state.profile = initialState.profile;
    },
  },
});

export const { setLogin, setLogout } = userSlice.actions;

export default userSlice.reducer;
