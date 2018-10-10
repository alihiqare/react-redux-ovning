import React, { Component } from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader
} from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.userContainer = React.createRef();

    this.state = {
      users: [],
      searchKey: "",
      error: false,
      hidden: {},

      modal: false,
      printStack: [],
      elementStack: [],
      styleStack: []	
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsersList = this.handleUsersList.bind(this);
    this.handleRowChange = this.handleRowChange.bind(this);

    this.toggle = this.toggle.bind(this);
    this.print = this.print.bind(this);
    this.printStore = this.printStore.bind(this);
    this.removeElementAttribute = this.removeElementAttribute.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const query = this.state.searchKey;

    if (query.length <= 0) {
      return null;
    }

    fetch("/AdressSearchApi/OpenQuery", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      mode: "same-origin",
      body: JSON.stringify(query)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        console.log(response);
      })
      .then(response => {
        this.setState({
          users: response.result
        });
      });
  }

  handleUsersList(users) {
    const { hidden } = this.state;
    return users.map((user, i) => {
      const fullName = `${user.givenName} ${user.surname}`;
      const id = `hiq-hide-${i}`;

      return (
        <div className="d-flex flex-column" key={`user-container-${i}`}>
          <div
            className="hiq-user-container d-flex justify-content"
            onClick={event => this.handleRowChange(event, id)}
          >
            <div className="hiq-image-placeholder">64x64</div>
            <div id={`fullName-${i}`}  onClick={(e) => {this.printStore(e)}} className="hiq-name">{fullName}</div>
            {user.department && (
              <div className="hiq-group hiq-button">{user.department}</div>
            )}
            <div className="hiq-arrow ml-auto p-2 bd-highlight">
              <span
                className={`oi oi-chevron-${hidden[id] ? "top" : "bottom"}`}
              />
            </div>
          </div>
          {hidden[id] && (
            <div className="hiq-user-container d-flex flex-md-row flex-sm-column justify-content-between pl-4 pr-4">
              <div>
                <p>
                  <strong>Företagsinfo:</strong>
                </p>
                <p id={`department-${i}`} onClick={(e) => {this.printStore(e)}}>{user.department}</p>
                <p id={`companyName-${i}`} onClick={(e) => {this.printStore(e)}}>{user.companyName}</p>
              </div>
              <div>
                <p>
                  <strong>Kontaktuppgifter:</strong>
                </p>
                <p id={`mobilePhone-${i}`} onClick={(e) => {this.printStore(e)}}>
                  <a className="hiq-mail-link" href={`tel:${user.mobilePhone}`}>
                    {user.mobilePhone}
                  </a>
                </p>
                <p id={`mail-${i}`} onClick={(e) => {this.printStore(e)}}>
                  <a className="hiq-mail-link" href={`mailto:${user.mail}`}>
                    {user.mail}
                  </a>
                </p>
              </div>
              <div>
                <p>
                  <strong>Adress:</strong>
                </p>
                <p id={`streetAddress-${i}`} onClick={(e) => {this.printStore(e)}}>{user.streetAddress}</p>
                <p id={`postalCode-${i}`} onClick={(e) => {this.printStore(e)}}>
                  {user.postalCode} {user.city}
                </p>
                <p id={`country-${i}`} onClick={(e) => {this.printStore(e)}}>{user.country}</p>
              </div>
            </div>
          )}
        </div>
      );
    });
  }

  handleRowChange(event, id) {
    const { hidden } = this.state;
    event.preventDefault();

    if (hidden[id] === undefined) {
      hidden[id] = true;
    } else {
      hidden[id] = !hidden[id];
    }

    this.setState({
      hidden
    });
  }


  /*
   The following code snipt handle the printing of selected informations.
  */
  print() {
    console.log('print is fired');
    var content = document.getElementById('printContainer');
    var pri = document.getElementById('ifmcontentstoprint').contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();	
    this.removeElementAttribute();
    this.setState({ printStack: [], elementStack: [], styleStack: [] });
  }

  renderPrintPreview() {
    var i = 0;
    return this.state.printStack.map((d) => {
        console.log(d);
        return (<p key={d.key + i++} dangerouslySetInnerHTML={{__html: d.key}}></p>)
    });
  }

  printStore(e){
    console.log(e, e.currentTarget);
    let selectedElement = document.getElementById(e.currentTarget.id);
    if(!selectedElement.hasAttribute("name")){

    this.state.printStack.push({'key': e.currentTarget.innerHTML});
    this.state.elementStack.push(e.currentTarget.id);
    this.state.styleStack.push(e.currentTarget.id);

    let selectedElement = document.getElementById(e.currentTarget.id);

    let styleAtt = document.createAttribute("style");
    styleAtt.value = "background: grey";
    selectedElement.setAttributeNode(styleAtt);

    let att = document.createAttribute("name");
    att.value = "selected";
    selectedElement.setAttributeNode(att);
    }
  }

  removeElementAttribute(){
    this.state.elementStack.map((id) => {
      let selectedElement = document.getElementById(id);
      selectedElement.removeAttribute("name");
    });

    this.state.styleStack.map((id) => {
      let selectedElement = document.getElementById(id);
      selectedElement.removeAttribute("style");
    });
  }

  toggle() {
    this.setState({
        modal: !this.state.modal
    })
  }
  /* End of  printing of selected informations*/

  render() {
    const { users, searchKey } = this.state;

    let userList = [];
    if (users.length > 0) {
      userList = this.handleUsersList(users);
    }

    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col">
              <input
                className="form-control form-control-lg pr-2"
                name="searchKey"
                type="text"
                placeholder="För-/efternamn, adress, telefonnummer, konsultgrupp ..."
                value={searchKey}
                onChange={this.handleChange}
              />
            </div>
            <div className="col">
              <input
                className="btn btn-lg btn-primary hiq-bootstrap-button"
                type="submit"
                value="Sök"
                onClick={this.handleSearch}
              />
              <input
                    className="btn btn-lg btn-primary hiq-bootstrap-button"
                    style={{
                          'margin-left': '30px',
                    }}
                    value="Visa valbara information"
                    type="button"
                    onClick={this.toggle} 
              />
            </div>
          </div>
        </form>
        <br />
        <div ref={this.userContainer}>{userList}</div>

        <Modal
            size='lg'
            isOpen={this.state.modal}
            toggle={this.toggle}
            className='results-modal'
        >
            <ModalHeader toggle={this.toggle}>
                Valbara information
            </ModalHeader>
            <iframe id="ifmcontentstoprint" className="hiq-frame-body" />
            <input 
                className="btn btn-lg btn-primary hiq-bootstrap-button"
                style={
                  {
                      'position': 'fixed',
                      'top': '7%',
                      'left': '2.8%',
                  }
              }
              value="Skriv ut"
              type="button"
              onClick={this.print}
            />
            <ModalBody id='printContainer' style={{
                background: '#000'
            }}>
                {this.renderPrintPreview()}
            </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default App;
