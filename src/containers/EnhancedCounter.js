import { connect } from 'react-redux';
import { Counter } from '../components/Counter';
import { bindActionCreators } from 'redux';
import { hideElement, shoiwElement } from '../actions';

const mapDispatchToProps = dispatch => bindActionCreators ({
	hideElement, 
	shoiwElement
}, dispatch);

/*
  return (hideElement, shoiwElement,
	{
    increment() {
      dispatch({type: INCREMENT});
    },
    decrement() {
      dispatch({type: DECREMENT});
    }
  })
*/

const mapStateToProps = state => {
  return {
    //Counter: state.Counter,
	visibile: state.Counter.visibile
  };
}

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(Counter);