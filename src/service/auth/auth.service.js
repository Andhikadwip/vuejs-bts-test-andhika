import { base_url } from '@/config/base_url.js';
import ApiRoute from '../api.route';
import axios from 'axios';

export async function signIn(payload) {
    return axios.post(base_url + ApiRoute.sign, payload);
}
export async function signUp(payload) {
    return axios.post(base_url + ApiRoute.signup,  payload);
}