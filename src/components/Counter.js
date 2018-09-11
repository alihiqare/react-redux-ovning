import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import Snackbars from "../components/Snackbars";
import {hideElement, showElement, toggelInput} from "../action/actions";

class Counter extends Component {

    render() {
		
        const { hideElement, showElement, toggelInput, visible, toggel } = this.props;

        return (
		<div>

		    <div style={{margin:'20px' }}>
                <div>Give your feedback:</div>
                <div>
                    <input type="text" onFocus={showElement} /> <br/> <br/>
                    <input type="text" style={{display: visible? 'flex' : 'none' }} />
                    <button type="button" style={{display: visible? 'flex' : 'none' }} onFocus={hideElement}>X</button>
                </div>
            </div>
			
			
            <div>
                <div>Recomend:</div>
                <div>
                    <button type="button" style={{background: toggel===1 ? 'green' : 'grey' }} onClick={e => {toggelInput(1)}}>No</button>
                    <button type="button" style={{background: toggel===2 ? 'green' : 'grey' }} onClick={e => {toggelInput(2)}}>Yes</button>
                </div>
            </div>
			
			<div>
				<br/>
				<br/>
                <div>Snackbars:</div>
                <div>
                    <Snackbars message={'Testing snackbar!'} />
                </div>
            </div>
			
		</div>	
        );
    }
}

const mapsStateToProps = (state, props) => {
    return {
		visible: state.counter.visible,
		toggel: state.counter.toggel
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
   hideElement,
   showElement,
   toggelInput
}, dispatch);

export default connect(
    mapsStateToProps,
    mapDispatchToProps
)(Counter);