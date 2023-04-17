import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase_setup/firebase";
import {
  LOGIN_FAILED,
  LOGIN_PROGRESS,
  LOGIN_SUCCESS,
  LOGIN_USER,
  LOGOUT_USER,
} from "./auth.types";

export const loginUser = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_PROGRESS });

  //   console.log(email, password);
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      alert("logged In successfully");

      // dispatch LOGIN_USER action and send token
      dispatch({ type: LOGIN_SUCCESS });
      dispatch({ type: LOGIN_USER, payload: user.accessToken });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // dispatch login failed to stop loader
      dispatch({ type: LOGIN_FAILED });
      alert("Login Failed");
    });
};

export const logoutUser = () => (dispatch) => {
  alert("logged out");
  dispatch({ type: LOGOUT_USER });
};
