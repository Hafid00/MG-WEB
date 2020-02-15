import RestaurantsServices from "../services/restaurantsServices";
import * as actionTypes from "./types";
import { addRestauImages } from "../actions/imagesActions";

export function fetchRestaurants(id) {
  return dispatch => {
    RestaurantsServices.getRestaurants(id)
      .then(res => {
        if (res.data.success) {
          dispatch(fetchRestaurantsSuccess(res.data.result));
          console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}
export function addRestaurant(idtown, data, token, dataImg) {
  return dispatch => {
    RestaurantsServices.addRestaurant(data, token)
      .then(res => {
        console.log("res", res);
        if (res.data.success) {
          dispatch(addRestauImages(dataImg, token, res.data.result));
          dispatch(fetchRestaurants(idtown));
          dispatch(displayDialog(false));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}
export function updRestaurant(idtown, id, data, token, dataImg) {
  return dispatch => {
    RestaurantsServices.updRestaurant(id, data, token)
      .then(res => {
        console.log("res", res);
        if (res.data.success) {
          dispatch(addRestauImages(dataImg, token, id));
          dispatch(fetchRestaurants(idtown));
          dispatch(displayDialog(false));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}
export function delRestaurant(idtown, id, token) {
  return dispatch => {
    RestaurantsServices.delRestaurant(id, token)
      .then(res => {
        console.log("res", res);
        if (res.data.success) {
          dispatch(fetchRestaurants(idtown));
          dispatch(displayDialog(false));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}
export function fetchRestaurantsSuccess(restaurants) {
  return {
    type: actionTypes.FETCH_RESTAURANTS,
    restaurants
  };
}
export function displayDialog(bool) {
  return {
    type: actionTypes.DISPLAY_DIALOG_RESTAURANT,
    bool
  };
}
