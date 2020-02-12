import axios from 'axios';
import Conf from '../config/Conf';

export default class LoginService {
  static login = (data) => axios({
    url: `${Conf.API_URL}/api/users/login/`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    data,
  });
}
