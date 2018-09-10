import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
//import Icon from '@material-ui/core/Icon';

import { handleClick, handleClose } from "../action/snackbarsAction"

class Snackbars extends Component {

    render() {
		
        const { handleClick, handleClose, open } = this.props;

        return (
		 <div>
			<Button onClick={handleClick}>Open simple snackbar</Button>
				<Snackbar
				  anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				  }}
				  open={open}
				  autoHideDuration={6000}
				  onClose={handleClose}
				  ContentProps={{
					'aria-describedby': 'message-id',
				  }}
				  message={<span id="message-id">Note archived</span>}
				  action={[
					<Button key="undo" color="secondary" size="small" onClick={handleClose}>
					  UNDO
					</Button>,
					<IconButton
					  key="close"
					  aria-label="Close"
					  color="inherit"
					  onClick={handleClose}
					>
					 x
					</IconButton>,
				  ]}
				/>
         </div>
	  
        );
    }
}

const mapsStateToProps = (state, props) => {
    return {
		open: state.snackbars.open
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
	handleClick,
	handleClose
}, dispatch);

export default connect(
    mapsStateToProps,
    mapDispatchToProps
)(Snackbars);