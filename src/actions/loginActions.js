import LoginService from "../services/LoginService";


export function login(data){
    return () => {
      LoginService.login(data)
        .then((res) => {
          console.log('res', res)
        })
  
        ;
  }
}