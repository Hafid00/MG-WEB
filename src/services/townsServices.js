import axios from 'axios';
import Conf from '../config/Conf';

export default class TownsService {
  static getTowns = () => axios({
    url: `${Conf.API_URL}/api/towns/all`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json'},
  });
  static addTown = (data, token) => axios({
    url: `${Conf.API_URL}/api/towns`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token},
    data
  });

  
}
