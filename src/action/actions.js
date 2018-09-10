import { HIDE_INPUT, SHOW_INPUT, ASYN_REQUEST, TOGGLE_INPUT } from '../reducers/counter';


export const hideElement = (event) => {
	return { 
		type: HIDE_INPUT, 
		visible: false
	};
};

export const showElement = (event) => {
	console.log('showElement ----> ', event);

	return { 
		type: SHOW_INPUT,
		visible: true
	};
};

export const asynRequest = () => {
	return { 
		type: ASYN_REQUEST,
		visible: true
	};
};

export const toggelInput = (toggelValue) => {
	
	console.log('toggelValue ----> ',toggelValue);
	
	return { 
		type: TOGGLE_INPUT,
		toggel: toggelValue
	};
};

export const userPicture = () => {
	
	fetch('https://randomuser.me/api/').then( res => {
			return res.json();
	}).then( data => {
			//data.result
			console.log('userPicture ---> ',data);
	});
	
};

/*

function fetchPostsSuccess(payload) {
  return {
    type: "FETCH_SUCCESS",
    payload
  }
}

export const fetchPosts = () => {
  const URL = "https://jsonplaceholder.typicode.com/posts";
  return fetch(URL, { method: 'GET'})
     .then( response => Promise.all([response, response.json()]));
}

function fetchPostsWithRedux() {
	return (dispatch) => {
  	dispatch(fetchPostsRequest());
    return fetchPosts().then(([response, json]) =>{
    	if(response.status === 200){
      	dispatch(fetchPostsSuccess(json))
      }
      else{
      	dispatch(fetchPostsError())
      }
    })
  }
}
*/