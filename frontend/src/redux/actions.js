// src/redux/actions.js

export const setCandidateDetails = candidates => {
 return {
  type: 'SET_CANDIDATE_DETAILS',
  payload: candidates // The new array to set
 };
};

export const setToggleFetchAssessment = () => {
 return {
  type: 'TOGGLE_FETCH_ASSESSMENT'
 };
};
