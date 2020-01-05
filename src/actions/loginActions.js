import LoginService from "../services/LoginService";
import history from "../history";

export function login(data){
    return () => {
      LoginService.login(data)
        .then((res) => {
            if(res.data.success){
                // dispatch({ type: types.AUTH_USER });
                // localStorage.setItem('token', response.data.token);
                history.push('/home');
            }
        })
        .catch((err) => {
            console.log(err);
        })
  
        ;
  }
}