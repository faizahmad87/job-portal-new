// src/redux/reducer.js

const initialState = {
 candidateDetails: [] // Initially empty array
};

const reducer = (state = initialState, action) => {
 switch (action.type) {
  case 'SET_CANDIDATE_DETAILS':
   return {
    ...state,
    candidateDetails: action.payload // Assign the array to the candidateDetails state
   };
  default:
   return state;
 }
};

export default reducer;
