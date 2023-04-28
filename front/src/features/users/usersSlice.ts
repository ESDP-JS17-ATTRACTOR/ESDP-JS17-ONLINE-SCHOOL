import { createSlice } from "@reduxjs/toolkit";
import { LoginError, Tutor, User, ValidationError } from "../../../types";
import { fetchTutors, editUserProfile, googleLogin, login, register } from "./usersThunks";
import { RootState } from "@/app/store";

interface UserState {
  user: User | null,
  registerLoading: boolean,
  registerError: ValidationError | null,
  loginLoading: boolean,
  loginError: LoginError | null,
  modalWindowStatus: boolean,
  editLoading: boolean,
  tutors: Tutor[],
  tutorsLoading: boolean
}

const initialState: UserState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  modalWindowStatus: false,
  editLoading: false,
  tutors: [],
  tutorsLoading: false
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    switchModalWindow: (state) => {
      state.modalWindowStatus = !state.modalWindowStatus;
      state.loginError = null;
    },
    unsetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(register.fulfilled, (state, { payload: user }) => {
      state.registerLoading = false;
      state.user = user;
    });
    builder.addCase(register.rejected, (state, { payload: error }) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });

    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
    }).addCase(login.fulfilled, (state, { payload: user }) => {
      state.loginLoading = false;
      state.user = user;
    }).addCase(login.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });

    builder.addCase(googleLogin.pending, (state) => {
      state.loginLoading = true;
    }).addCase(googleLogin.fulfilled, (state, { payload: user }) => {
      state.loginLoading = false;
      state.user = user;
    }).addCase(googleLogin.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });

    builder.addCase(editUserProfile.pending, (state) => {
      state.editLoading = true;
    }).addCase(editUserProfile.fulfilled, (state, { payload: user }) => {
      state.editLoading = false;
      state.user = user;
    }).addCase(editUserProfile.rejected, (state, { payload: error }) => {
      state.editLoading = false;
    });
    builder.addCase(fetchTutors.pending, (state) => {
      state.tutorsLoading = true;
    });
    builder.addCase(fetchTutors.fulfilled, (state, { payload: tutors }) => {
      state.tutorsLoading = false;
      state.tutors = tutors;
    });
    builder.addCase(fetchTutors.rejected, (state) => {
      state.tutorsLoading = false;
    });
  }
});

export const usersReducer = usersSlice.reducer;

export const { switchModalWindow, unsetUser } = usersSlice.actions;

export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
export const selectModalWindowStatus = (state: RootState) => state.users.modalWindowStatus;
export const selectEditLoading = (state: RootState) => state.users.editLoading;
export const selectTutors = (state: RootState) => state.users.tutors;
export const selectTutorsLoading = (state: RootState) => state.users.tutorsLoading;
