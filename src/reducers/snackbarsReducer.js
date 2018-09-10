export const HIDE_INPUT = 'HIDE_INPUT';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';

const intialState = {
  open: false
};

export default function snackbars (state = intialState, action) {
  switch(action.type) {

    /*case HIDE_INPUT:
      return { 
				...state,
				//visible: action.visible
				...action
	 };*/

    case OPEN_SNACKBAR:
      return { 
				...state,
				...action
	};
	  
    case CLOSE_SNACKBAR:
      return { 
				...state,
				...action
	};
	 
    default:
      return state;
  }
};