import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from '../reducers/snackbarsReducer';

/*export const hideElement = (event) => {
	return { 
		type: HIDE_INPUT, 
		visible: false
	};
};*/

export const  handleClick = () => {
	console.log('handleClick ----> ');
	return { 
		type: OPEN_SNACKBAR,
		open: true
	};	
};

export const  handleClose = (event, reason) => {
	console.log('handleClose ----> ', reason);
	return { 
		type: CLOSE_SNACKBAR,
		open: false
	};
};