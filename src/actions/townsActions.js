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
export function addTown(data,token){
    return (dispatch) => {
      TownsServices.addTown(data,token)
        .then((res) => {
            console.log('res add', res);
            if(res.data.success){
                dispatch(fetchTowns());
            }
        })
        .catch((err) => {
            console.log(err);
        })
  
        ;
  }
}
export function addNewTown(newTown){
    return{
        type: actionTypes.ADD_TOWN,
        newTown
    }
}
export function fetchTownsSuccess(towns){
    return{
        type: actionTypes.FETCH_TOWNS,
        towns
    }
}
export function displayDialog(bool) {
    return {
      type: actionTypes.DISPLAY_DIALOG_TOWNS,
      bool
    };
  }