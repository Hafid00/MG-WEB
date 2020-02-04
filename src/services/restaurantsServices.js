import axios from 'axios';
import Conf from '../config/Conf';

export default class RestaurantsService {
  static getRestaurants = () => axios({
    url: `${Conf.API_URL}/api/restaurants/all`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json'},
  });
}
