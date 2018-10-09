
import {
  SET_FORM
} from './actionTypes';

export const setForm = (changedFields)=>{
  return {
    type:SET_FORM,
    changedFields
  }
}