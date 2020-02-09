import HotelsServices from "../services/hotelsServices";
import * as actionTypes from "./types";
import { addHotelImages } from "../actions/imagesActions";

export function fetchHotels(id) {
  return dispatch => {
    HotelsServices.getHotels(id)
      .then(res => {
        console.log(res);
        if (res.data.success) {
          dispatch(fetchHotelsSuccess(res.data.result));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}
export function addHotel(idtown, data, token, dataImg) {
  return dispatch => {
    HotelsServices.addHotel(data, token)
      .then(res => {
        console.log("res", res);
        if (res.data.success) {
          dispatch(fetchHotels(idtown));
          dispatch(addHotelImages(dataImg, token, res.data.result));
          dispatch(displayDialog(false));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}
export function updHotel(idtown, id, data, token) {
  return dispatch => {
    HotelsServices.updHotel(id, data, token)
      .then(res => {
        console.log("res", res);
        if (res.data.success) {
          dispatch(fetchHotels(idtown));
          dispatch(displayDialog(false));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}
export function delHotel(idtown, id, token) {
  return dispatch => {
    HotelsServices.delHotel(id, token)
      .then(res => {
        console.log("res", res);
        if (res.data.success) {
          dispatch(fetchHotels(idtown));
          dispatch(displayDialog(false));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}
export function fetchHotelsSuccess(hotels) {
  return {
    type: actionTypes.FETCH_HOTELS,
    hotels
  };
}
export function displayDialog(bool) {
  return {
    type: actionTypes.DISPLAY_DIALOG,
    bool
  };
}
