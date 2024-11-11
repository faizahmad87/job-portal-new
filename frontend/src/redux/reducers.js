// src/redux/reducer.js

const initialState = {
 candidateDetails: [], // Initially empty array
 toggleFetchAssessment: false
};

const reducer = (state = initialState, action) => {
 switch (action.type) {
  case 'SET_CANDIDATE_DETAILS':
   return {
    ...state,
    candidateDetails: action.payload // Assign the array to the candidateDetails state
   };
  case 'TOGGLE_FETCH_ASSESSMENT':
   return {
    ...state,
    toggleFetchAssessment: !state.toggleFetchAssessment // Toggle the fetch assessment state
   };
  default:
   return state;
 }
};

export default reducer;
