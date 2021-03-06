import axios from "axios";
import Conf from "../config/Conf";

export default class ImagesService {
  static addHotelImages = (data, token, idhotel) =>
    axios({
      url: `${Conf.API_URL}/api/images/uploadHotelImages/${idhotel}`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token
      },
      data
    });
  static addRestauImages = (data, token, idRestau) =>
    axios({
      url: `${Conf.API_URL}/api/images/uploadRestauImages/${idRestau}`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token
      },
      data
    });
  static addPlaceImages = (data, token, idPlace) =>
    axios({
      url: `${Conf.API_URL}/api/images/uploadPlaceImages/${idPlace}`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token
      },
      data
    });
  static delImages = (data, token) =>
    axios({
      url: `${Conf.API_URL}/api/images/deleteImages`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      data
    });
}
