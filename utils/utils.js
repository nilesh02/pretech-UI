import axios from 'axios';
import React from 'react';

export const getNormalizedData = (data) => {

    let maximum = Math.max(...data);
    let minimum = Math.min(...data);
    let finalData = [];

    if (maximum === minimum) {
        return data;
    }

    // return data.map(item => ((item - minimum) / (maximum - minimum)) * 100);

    for (let i = 0; i <= 60; i = i + 5) {
        let calculatedData = (((data[i/5] - minimum) / (maximum - minimum)) * 100)
        finalData[i / 5] = {x: i, y: calculatedData};
    }
    return finalData;
}

export const getDaysHrsMins = (value) => {

    let mins = parseFloat(value);
    let hours = parseFloat(mins / 60);
    let days = parseFloat(hours / 24);

    return (days.toFixed(2) + "/\n" + hours.toFixed(2) + "/\n" + mins.toFixed(2))
}

export const getDataFromApi = () => {

    let apiData = {};
    axios.get(API_LINK)
        .then(res => {
            apiData = res.data;
        })
    console.log("response data", apiData)
    return apiData;
}

export const VARIABLES = {
    PARA_001: 'Para-001',
    PARA_002: 'Para-002',
    PARA_003: 'Para-003',
    PARA_004: 'Para-004',
    PARA_005: 'Para-005',
    PARA_006: 'Para-006',
    PARA_007: 'Para-007',
    PARA_008: 'Para-008',
    PARA_009: 'Para-009',
    PARA_010: 'Para-010',
    PARA_011: 'Para-011',
    PARA_012: 'Para-012',
    PARA_013: 'Para-013',
    PARA_014: 'Para-014',
    PARA_015: 'Para-015',
    PARA_016: 'Para-016',
    PARA_017: 'Para-017',
    PARA_018: 'Para-018',
    TIME: 'Time',
    DATE: 'Date',
    BDATA_001: 'Bdata_001',
    BDATA_002: 'Bdata_002',
    BDATA_003: 'Bdata_003',
    BDATA_004: 'Bdata_004',
    DATA_001: 'Data-001',
    DATA_002: 'Data-002',
    DATA_003: 'Data-003',
    DATA_004: 'Data-004',
    DATA_005: 'Data-005',
    DATA_006: 'Data-006',
    DATA_007: 'Data-007',
    DATA_008: 'Data-008',
    DATA_009: 'Data-009',
    DATA_011: 'Data-011',
    BM_001: 'BM-001',
    BM_002: 'BM-002',
    BM_003: 'BM-003',
    BM_004: 'BM-004',
    BM_005: 'BM-005',
    BM_006: 'BM-006',
    BM_007: 'BM-007',
    BM_008: 'BM-008',
    BM_009: 'BM-009',
    BM_010: 'BM-010'
}

export const DAYS_HOURS_MINS_STRING = "Days/" + "\n" + "Hours/" + "\n" + "Mins"

export const API_LINK = 'https://protected-shore-12318.herokuapp.com/';
// export const API_LINK = 'http://192.168.2.154:8081/';

export const GET_ALL_DATA_TIMEOUT_INTERVAL = 3000;
