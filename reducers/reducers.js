import {GET_DATA} from "../constants/action-types";
import {parseGraphData} from "../utils/utils";

const initialState = {
    currentRow: {},
    productRecoveredData : [],
    graphLabel: []
};

function rootReducer(state = initialState, action) {
    if (action.type === GET_DATA) {
        // state.currentRow=[]
        // state.currentRow.push(action.payload);
        let result = action.payload
        let productRecoveredData = parseGraphData(result);
        return Object.assign({}, state, {
            currentRow: result[result.length - 1]
        });
    }
    return state;
}

export default rootReducer;