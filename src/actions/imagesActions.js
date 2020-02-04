import ImagesServices from "../services/imagesServices";
import * as actionTypes from "./types";

export function addHotelImages(data, token, idhotel) {
  return dispatch => {
    ImagesServices.addHotelImages(data, token, idhotel)
      .then(res => {
        console.log("res", res);
        if (res.data.success) {
          console.log("success");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}
export function addRestauImages(data, token, idRestau) {
  return dispatch => {
    ImagesServices.addRestauImages(data, token, idRestau)
      .then(res => {
        console.log("res", res);
        if (res.data.success) {
          console.log("success");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}
export function addPlaceImages(data, token, idPlace) {
  return dispatch => {
    ImagesServices.addPlaceImages(data, token, idPlace)
      .then(res => {
        console.log("res", res);
        if (res.data.success) {
          console.log("success");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}
