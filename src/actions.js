import { HIDE_INPUT, SHOW_INPUT } from './reducers/counter';


export function hideElement(hide) {
	return { 
		type: HIDE_INPUT, 
		visibile: hide
	};
}

export function showElement(show) {
	return { 
		type: SHOW_INPUT,
		visibile: show
	};
}