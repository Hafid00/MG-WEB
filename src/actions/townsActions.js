import TownsServices from "../services/townsServices";
import * as actionTypes from './types'

export function fetchTowns(){
    return (dispatch) => {
      TownsServices.getTowns()
        .then((res) => {
            console.log('res', res);
            if(res.data.success){
                dispatch(fetchTownsSuccess(res.data.result))
            }
        })
        .catch((err) => {
            console.log(err);
        })
  
        ;
  }
}
export function fetchTownsSuccess(towns){
    return{
        type: actionTypes.FETCH_TOWNS,
        towns
    }
}
