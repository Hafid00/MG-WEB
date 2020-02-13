import ImagesServices from "../services/imagesServices";
import { fetchHotels } from "../actions/hotelsActions";

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
export function delImages(data, token, idtown) {
  return dispatch => {
    ImagesServices.delImages(data, token)
      .then(res => {
        console.log("res", res);
        if (res.data.success) {
          dispatch(fetchHotels(idtown));
          console.log("success");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}
