import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader
} from 'reactstrap';

import Avatar from '../asset/avatar.png';

export default class PrintText extends Component{
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
			printStack: [],           
        }
        this.toggle = this.toggle.bind(this);
        this.print = this.print.bind(this);
    }

    print() {
        var content = document.getElementById('printarea');
        var pri = document.getElementById('ifmcontentstoprint').contentWindow;
        pri.document.open();
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
    }

    renderPrintPreview() {
        var i = 0;
        return this.state.printStack.map((d) => {
            return (<p key={d.key + i++}>{i} - {d.key}</p>)
        });
    }

    toggle() {
		
        this.setState({
            modal: !this.state.modal
        })
		
    }

	printStore(e){
		
		console.log('print the Stack', this.state.printStack);
		let el = (e) =>{
		  return <div dangerouslySetInnerHTML={createMarkup(e)} />;
		}
				this.state.printStack.push({'key' : el})		
		console.log('print the Stack', this.state.printStack);
	}
	
	createMarkup(e) { return {__html: e.currentTarget.innerHTML}; }
	

	
    render() {
        return (
		
            <div>
							
                <Button 
                    style={
                        {
                            'position': 'fixed',
                            'top': '30%',
                            'left': '95%',
                            'transform': 'translate(-50%, -50%)'
                        }
                    } 
                    onClick={this.toggle}
                >
                    View slected information
                </Button>         
                <Modal 
                    size='lg' 
                    isOpen={this.state.modal} 
                    toggle={this.toggle} 
                    className='results-modal'
                >  
                    <ModalHeader toggle={this.toggle} >
                        Slected information
                    </ModalHeader>
                    <iframe id="ifmcontentstoprint" style={{
                        height: '0px',
                        width: '0px',
                        position: 'absolute'
                    }}></iframe>      
                    <Button onClick={this.print}>Print</Button>
                    <ModalBody id='printarea'>              
                        {this.renderPrintPreview()}
                    </ModalBody>
                </Modal>
				
								<div onClick={e => {this.printStore(e)}}><img src={Avatar} alt=""/></div>
				<div>First Name: <span onClick={e => {this.printStore(e)}}>Rashid</span></div>
				<div>Last Name: <span onClick={e => {this.printStore(e)}}>Ali</span></div>
				<div>Group: <span onClick={e => {this.printStore(e)}}>Konsult</span></div>
				
            </div>
        )
    }
}