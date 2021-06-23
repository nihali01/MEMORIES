import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';
// for signin..using async function we can save our history and form data
//export const signin = (formData,router) => async (dispatch) => {
  export const signin = (formData,history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    history.push('/');
    //router.push('/');
  } catch (error) {
    console.log(error);
  }
};
// for signup..using async function we can save our history and form data
//export const signup = (formData, router) => async (dispatch) => {
  export const signup = (formData,history) => async (dispatch) => {

  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    //router.push('/');
    history.push('/');

  } catch (error) {
    console.log(error);
  }
};
