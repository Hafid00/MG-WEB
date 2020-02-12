import LoginService from "../services/LoginService";
import history from "../history";
import * as actionTypes from './types';

export function login(data){
    return (dispatch) => {
      LoginService.login(data)
        .then((res) => {
            if(res.data.success){
                dispatch(addToken(res.data.result.token));
                localStorage.setItem('token', res.data.result.token);
                history.push('/townSelect');
            }
        })
        .catch((err) => {
            console.log(err);
        })
  
        ;
  }
}
export function addToken(token){
    return{
        type: actionTypes.AUTH_USER,
        token
    }
}