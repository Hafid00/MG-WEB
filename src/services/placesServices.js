import axios from "axios";
import Conf from "../config/Conf";

export default class PlacesService {
  static getPlaces = id =>
    axios({
      url: `${Conf.API_URL}/api/places/getbytown/${id}`,
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
  static addPlace = (data, token) =>
    axios({
      url: `${Conf.API_URL}/api/places`,
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      data
    });
  static updPlace = (id, data, token) =>
    axios({
      url: `${Conf.API_URL}/api/places/${id}`,
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: token },
      data
    });
  static delPlace = (id, token) =>
    axios({
      url: `${Conf.API_URL}/api/places/${id}`,
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: token }
    });
}
