import {BDATA, BDATA_001, BDATA_002, BDATA_003, BDATA_004, GET_DATA} from "../constants/action-types";

const initialState = {
    currentRow: {},
    benchmarkRow: {},
    P_ALT: {},
    C_PARA: {},
    graphLabel: ['0'],
    productRecovered: [0],
    rmConsumed: [0],
    energyConsumed: [0],
    effluentToETP: [0],
    totalTimeDifferenceInMinutes: 0,
    BDATA_001: 0,
    BDATA_002: 0,
    BDATA_003: 0,
    BDATA_004: 0,
    GRAPH_P_ALT_001: [0],
    GRAPH_P_ALT_002: [0],
    GRAPH_C_PARA_001: [0],
    GRAPH_C_PARA_008: [0],
    LAST_ONE_HR_PARA_001: 0,
    LAST_ONE_HR_PARA_010: 0,
    LAST_ONE_HR_PARA_012: 0,
    LAST_ONE_HR_C_PARA_008: 0,
    SHIFT_PARA_001: 0,
    SHIFT_PARA_010: 0,
    SHIFT_PARA_012: 0,
    SHIFT_C_PARA_008: 0,
    BATCH_PARA_001: 0,
    BATCH_PARA_010: 0,
    BATCH_PARA_012: 0,
    BATCH_C_PARA_008: 0,
    normalizedRMConsumed: [0],
    normalizedProductRecovered: [0],
    normalizedEnergyConsumed: [0]

};

function rootReducer(state = initialState, action) {

    let result = action.payload;
    switch (action.type) {

        case GET_DATA:

            const apiData = result;

            if ((state.currentRow !== apiData.currentRow) && (apiData !== {})) {
                return Object.assign({}, state, {
                    currentRow: apiData.currentRow,
                    benchmarkRow: apiData.benchmarkRow,
                    graphLabel: apiData.graphLabel,
                    productRecovered: apiData.productRecovered,
                    rmConsumed: apiData.rmConsumed,
                    energyConsumed: apiData.energyConsumed,
                    effluentToETP: apiData.effluentToETP,
                    totalTimeDifferenceInMinutes: apiData.totalTimeDifferenceInMinutes,
                    P_ALT: apiData.P_ALT,
                    C_PARA: apiData.C_PARA,
                    GRAPH_P_ALT_001: apiData.GRAPH_P_ALT_001,
                    GRAPH_P_ALT_002: apiData.GRAPH_P_ALT_002,
                    GRAPH_C_PARA_001: apiData.GRAPH_C_PARA_001,
                    GRAPH_C_PARA_008: apiData.GRAPH_C_PARA_008,
                    LAST_ONE_HR_PARA_001: apiData.LAST_ONE_HR_PARA_001,
                    LAST_ONE_HR_PARA_010: apiData.LAST_ONE_HR_PARA_010,
                    LAST_ONE_HR_PARA_012: apiData.LAST_ONE_HR_PARA_012,
                    LAST_ONE_HR_C_PARA_008: apiData.LAST_ONE_HR_C_PARA_008,
                    SHIFT_PARA_001: apiData.SHIFT_PARA_001,
                    SHIFT_PARA_010: apiData.SHIFT_PARA_010,
                    SHIFT_PARA_012: apiData.SHIFT_PARA_012,
                    SHIFT_C_PARA_008: apiData.SHIFT_C_PARA_008,
                    BATCH_PARA_001: apiData.BATCH_PARA_001,
                    BATCH_PARA_010: apiData.BATCH_PARA_010,
                    BATCH_PARA_012: apiData.BATCH_PARA_012,
                    BATCH_C_PARA_008: apiData.BATCH_C_PARA_008,
                    normalizedRMConsumed: apiData.normalizedRMConsumed,
                    normalizedProductRecovered: apiData.normalizedProductRecovered,
                    normalizedEnergyConsumed: apiData.normalizedEnergyConsumed,
                    normalizedGRAPH_P_ALT_001: apiData.normalizedGRAPH_P_ALT_001,
                    normalizedGRAPH_P_ALT_002: apiData.normalizedGRAPH_P_ALT_002,
                    normalizedGRAPH_C_PARA_001: apiData.normalizedGRAPH_C_PARA_001,
                    BAR_GRAPH_PARA_001: apiData.BAR_GRAPH_PARA_001,
                    BAR_GRAPH_PARA_010: apiData.BAR_GRAPH_PARA_010,
                    BAR_GRAPH_PARA_012: apiData.BAR_GRAPH_PARA_012,
                    BAR_GRAPH_C_PARA_008: apiData.BAR_GRAPH_C_PARA_008,
                });
            }
            break;

        case BDATA:
            return Object.assign({}, state, {
                BDATA_001: result.BDATA_001,
                BDATA_002: result.BDATA_002,
                BDATA_003: result.BDATA_003,
                BDATA_004: result.BDATA_004,
            });

        case BDATA_001:
            return Object.assign({}, state, {
                BDATA_001: action.payload
            });

        case BDATA_002:
            return Object.assign({}, state, {
                BDATA_002: action.payload
            });

        case BDATA_003:
            return Object.assign({}, state, {
                BDATA_003: action.payload
            });

        case BDATA_004:
            return Object.assign({}, state, {
                BDATA_004: action.payload
            });

        default:
            return state;
    }
}

export default rootReducer;
