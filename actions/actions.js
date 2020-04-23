import { GET_DATA } from "../constants/action-types";

export function getData(payload) {
    return { 
        type: GET_DATA, 
        payload
    };
  }