import axios from "axios";
import Conf from "../config/Conf";

export default class HotelsService {
  static getHotels = id =>
    axios({
      url: `${Conf.API_URL}/api/hotels/getbytown/${id}`,
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
  static addHotel = (data, token) =>
    axios({
      url: `${Conf.API_URL}/api/hotels`,
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      data
    });
  static updHotel = (id, data, token) =>
    axios({
      url: `${Conf.API_URL}/api/hotels/${id}`,
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: token },
      data
    });
  static delHotel = (id, token) =>
    axios({
      url: `${Conf.API_URL}/api/hotels/${id}`,
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: token }
    });
}
