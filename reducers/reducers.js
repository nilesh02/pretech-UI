import {GET_DATA, BDATA, BDATA_001, BDATA_002, BDATA_003, BDATA_004} from "../constants/action-types";
import {parseGraphData} from "../utils/utils";

const initialState = {
    currentRow: {},
    graphLabel: ['0'],
    productRecovered: [0],
    rmConsumed: [0],
    energyConsumed: [0],
    effluentToETP: [0],
    BDATA_001:0,
    BDATA_002:0,
    BDATA_003:0,
    BDATA_004:0,
};

function rootReducer(state = initialState, action) {
    if (action.type === GET_DATA) {
        // state.currentRow=[]
        // state.currentRow.push(action.payload);
        let result = action.payload
        let graphData = parseGraphData(result);
        console.log(graphData)
        return Object.assign({}, state, {
            currentRow: result[result.length - 1],
            graphLabel: graphData.label,
            productRecovered: graphData.productRecovered,
            rmConsumed: graphData.rmConsumed,
            energyConsumed: graphData.energyConsumed,
            effluentToETP: graphData.effluentToETP
        });
    } else if (action.type === BDATA) {
        let result = action.payload
        return Object.assign({}, state, {
            BDATA_001: result.BDATA_001,
            BDATA_002: result.BDATA_002,
            BDATA_003: result.BDATA_003,
            BDATA_004: result.BDATA_004,
        });
    } else if (action.type === BDATA_001) {
        return Object.assign({}, state, {
            BDATA_001:action.payload
        });
    } else if (action.type === BDATA_002) {
        return Object.assign({}, state, {
            BDATA_002:action.payload
        });
    } else if (action.type === BDATA_003) {
        return Object.assign({}, state, {
            BDATA_003:action.payload
        });
    } else if (action.type === BDATA_004) {
        return Object.assign({}, state, {
            BDATA_004:action.payload
        });
    }
    return state;
}

export default rootReducer;