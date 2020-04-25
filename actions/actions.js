import { GET_DATA,BDATA,BDATA_001,BDATA_002,BDATA_003,BDATA_004} from "../constants/action-types";

export function getData(payload) {
    return {
        type: GET_DATA,
        payload
    };
}
export function updateBdata(payload) {
    return {
        type: BDATA,
        payload
    };
}
export function updateBdata_001(payload) {
    return {
        type: BDATA_001,
        payload
    };
}
export function updateBdata_002(payload) {
    return {
        type: BDATA_002,
        payload
    };
}
export function updateBdata_003(payload) {
    return {
        type: BDATA_003,
        payload
    };
}
export function updateBdata_004(payload) {
    return {
        type: BDATA_004,
        payload
    };
}