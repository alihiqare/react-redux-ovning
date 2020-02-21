export const HIDE_INPUT = 'HIDE_INPUT';
export const SHOW_INPUT = 'SHOW_INPUT';
export const TOGGLE_INPUT = 'TOGGLE_INPUT';
export const ASYN_REQUEST = 'ASYN_REQUEST';

const intialState = {
  visible: '',
  toggel: null,
  printFlag:null,
  buildFlag: null,
  releaseFlag: null,
};

export default function counter (state = intialState, action) {
  switch(action.type) {

    case HIDE_INPUT:
      return { 
				...state,
				//visible: action.visible
				...action
	 };

    case SHOW_INPUT:
      return { 
				...state,
				...action
	 };
	  
    case TOGGLE_INPUT:
      return { 
				...state,
				...action
	 };
	 
    default:
      return state;
  }
};
