import { GET_DATA } from "../constants/action-types";

const initialState = {
    currentRow: {
        'Data-001' : "Data-001"
    }
};

function rootReducer(state = initialState, action) {
  if (action.type === GET_DATA) {
    // state.currentRow=[]
    // state.currentRow.push(action.payload);
    
    return Object.assign({}, state, {
        currentRow: action.payload
      });
  }
  return state;
}

export default rootReducer;