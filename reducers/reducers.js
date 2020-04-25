import {GET_DATA, BDATA, BDATA_001, BDATA_002, BDATA_003, BDATA_004, GET_BENCHMARKS} from "../constants/action-types";
import {
    calculateTotalTime,
    parseGraphData,
    calculate_P_Alt_Variables,
    calculate_C_Para_Variables
} from "../utils/utils";

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
};

function rootReducer(state = initialState, action) {

    let result = action.payload;
    switch (action.type) {

        case GET_DATA:
            let graphData = parseGraphData(result);
            let totalTimeDifferenceInMinutes = calculateTotalTime(result);
            let P_ALT = calculate_P_Alt_Variables(result[result.length - 1], state.benchmarkRow, totalTimeDifferenceInMinutes)
            let C_PARA = calculate_C_Para_Variables(result[result.length - 1], state.benchmarkRow, totalTimeDifferenceInMinutes,
                P_ALT, BDATA_001, BDATA_002, BDATA_003, BDATA_004)
            // console.log(graphData)
            return Object.assign({}, state, {
                currentRow: result[result.length - 1],
                graphLabel: graphData.label,
                productRecovered: graphData.productRecovered,
                rmConsumed: graphData.rmConsumed,
                energyConsumed: graphData.energyConsumed,
                effluentToETP: graphData.effluentToETP,
                totalTimeDifferenceInMinutes: totalTimeDifferenceInMinutes,
                P_ALT: P_ALT,
                C_PARA: C_PARA
            });

        case GET_BENCHMARKS:
            // console.log(result)
            return Object.assign({}, state, {
                benchmarkRow: result[result.length - 1]
            });

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