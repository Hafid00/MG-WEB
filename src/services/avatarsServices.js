import axios from "axios";
import Conf from "../config/Conf";

export default class AvatarsService {
  static getAvatars = () =>
    axios({
      url: `${Conf.API_URL}/api/avatar/all`,
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
}
