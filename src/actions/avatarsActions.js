import AvatarsServices from "../services/avatarsServices";
import * as actionTypes from "./types";

export function fetchAvatars() {
  return dispatch => {
    AvatarsServices.getAvatars()
      .then(res => {
        console.log("res", res);
        if (res.data.success) {
          dispatch(fetchAvatarsSuccess(res.data.result));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}
export function fetchAvatarsSuccess(avatars) {
  return {
    type: actionTypes.FETCH_AVATARS,
    avatars
  };
}
