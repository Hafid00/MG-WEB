import PlacesServices from "../services/placesServices";
import * as actionTypes from "./types";
import { addPlaceImages } from "../actions/imagesActions";

export function fetchPlaces(id) {
  return dispatch => {
    PlacesServices.getPlaces(id)
      .then(res => {
        if (res.data.success) {
          dispatch(fetchPlacesSuccess(res.data.result));
          console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}
export function addPlace(idtown, data, token, dataImg) {
  return dispatch => {
    PlacesServices.addPlace(data, token)
      .then(res => {
        console.log("res", res);
        if (res.data.success) {
          dispatch(addPlaceImages(dataImg, token, res.data.result));
          dispatch(fetchPlaces(idtown));
          dispatch(displayDialog(false));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}
export function updPlace(idtown, id, data, token, dataImg) {
  return dispatch => {
    PlacesServices.updPlace(id, data, token)
      .then(res => {
        console.log("res", res);
        if (res.data.success) {
          dispatch(addPlaceImages(dataImg, token, id));
          dispatch(fetchPlaces(idtown));
          dispatch(displayDialog(false));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}
export function delPlace(idtown, id, token) {
  return dispatch => {
    PlacesServices.delPlace(id, token)
      .then(res => {
        console.log("res", res);
        if (res.data.success) {
          dispatch(fetchPlaces(idtown));
          dispatch(displayDialog(false));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}
export function fetchPlacesSuccess(places) {
  return {
    type: actionTypes.FETCH_PLACES,
    places
  };
}
export function displayDialog(bool) {
  return {
    type: actionTypes.DISPLAY_DIALOG_PLACE,
    bool
  };
}
