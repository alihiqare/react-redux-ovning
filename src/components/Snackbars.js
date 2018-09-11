import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

/*import CheckCircleIcon from '@material-ui/Icon/CheckCircle';
import ErrorIcon from '@material-ui/Icon/Error';
import InfoIcon from '@material-ui/Icon/Info';
import CloseIcon from '@material-ui/Icon/Close';
import WarningIcon from '@material-ui/icons/Warning';

import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';*/

import Button from '@material-ui/core/Button';

import Snackbar from '@material-ui/core/Snackbar';
//import SnackbarContent from '@material-ui/core/SnackbarContent';

import IconButton from '@material-ui/core/IconButton';


//import Icon from '@material-ui/core/Icon';

//helping Guide: https://medium.freecodecamp.org/how-to-show-informational-messages-using-material-ui-in-a-react-web-app-5b108178608
// https://www.youtube.com/watch?v=mkualZPRZCs

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

const MySnackbarContent =(props) => {
  const { classes, className, message, onClose, variant } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          x
        </IconButton>,
      ]}
    />
  );
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