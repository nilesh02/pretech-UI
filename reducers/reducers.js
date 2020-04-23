import {GET_DATA} from "../constants/action-types";
import {parseGraphData} from "../utils/utils";

const initialState = {
    currentRow: {},
    graphLabel: ['0'],
    productRecovered: [0],
    rmConsumed: [0],
    energyConsumed: [0],
    effluentToETP: [0]
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
    }
    return state;
}

export default rootReducer;