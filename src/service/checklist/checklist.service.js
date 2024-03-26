import { base_url } from '@/config/base_url.js';
import ApiRoute from '../api.route';
import axios from "@/config/axios";

export async function checklistGetList() {
    return axios.get(base_url + ApiRoute.checklist);
}
export async function findChecklistByItem(id) {
    return axios.get(base_url + ApiRoute.checklist+id+"/item");
}
export async function saveItemChecklist(id, data) {
    return axios.post(base_url + ApiRoute.checklist+id+"/item", data);
}
export async function saveChecklist(data) {
    return axios.post(base_url + ApiRoute.checklist, data);
}
export async function deleteChecklist(id) {
    return axios.delete(base_url + ApiRoute.checklist+id);
}
export async function deleteItemChecklist(id, id_item) {
    return axios.delete(base_url + ApiRoute.checklist+id+"/item/"+id_item);
}
export async function changeStatusItemChecklist(id, id_item) {
    return axios.put(base_url + ApiRoute.checklist+id+"/item/"+id_item);
}