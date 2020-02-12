import axios from "axios";
import Conf from "../config/Conf";

export default class RestaurantsService {
  static getRestaurants = id =>
    axios({
      url: `${Conf.API_URL}/api/restaurants/getbytown/${id}`,
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
  static addRestaurant = (data, token) =>
    axios({
      url: `${Conf.API_URL}/api/restaurants`,
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      data
    });
  static updRestaurant = (id, data, token) =>
    axios({
      url: `${Conf.API_URL}/api/restaurants/${id}`,
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: token },
      data
    });
  static delRestaurant = (id, token) =>
    axios({
      url: `${Conf.API_URL}/api/restaurants/${id}`,
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: token }
    });
}
