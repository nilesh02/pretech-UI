import {GET_DATA, BDATA, BDATA_001, BDATA_002, BDATA_003, BDATA_004, GET_BENCHMARKS} from "../constants/action-types";

export function getData(payload) {
    return {
        type: GET_DATA,
        payload
    };
}

export function getBenchMarks(payload) {
    return {
        type: GET_BENCHMARKS,
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

export function updateBdata005_Rise(payload) {
    return {
        type: B_DATA_005_RISE,
        payload
    };
}

export function updateBdata005_Fall(payload) {
    return {
        type: B_DATA_005_FALL,
        payload
    };
}

export function updateBdata006_Rise(payload) {
    return {
        type: B_DATA_006_RISE,
        payload
    };
}

export function updateBdata006_Fall(payload) {
    return {
        type: B_DATA_006_FALL,
        payload
    };
}