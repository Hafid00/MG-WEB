import axios from 'axios';
import Conf from '../config/Conf';

export default class PlacesService {
  static getPlaces = () => axios({
    url: `${Conf.API_URL}/api/places/all`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json'},
  });
}
