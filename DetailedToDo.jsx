import React from 'react';
import ReactDOM from 'react-dom';
import './toDoStyle.css';
class DetailedToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameList: [],
            inputName: "Hello.."
        }
        this.addNameToList = this.addNameToList.bind(this);

    }

    addNameToList(formData) {
        var names = this.state.nameList;
        names.push(formData);
        this.setState({ names });
    }

    getNameDetails()
    {
        console.log('hi');
    }

    render() {
        return (
            <div>
                <div className="mainDiv">
                    <div className="leftDiv"><h1>Enter Details</h1>
                            <SimpleForm addNames={this.addNameToList} /></div>                    
                    <div className="middleDiv"><h1>List Of Names </h1><SimpleList names={this.state.nameList} onNameClick={this.addNameToList}/></div>        
                    <div className="rightDiv"><h1>Details</h1></div>        
                </div>
               
                

            </div>
        );
    }

}

class SimpleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: ''
        };
        this.localSubmit = this.localSubmit.bind(this);
        this.updateState = this.updateState.bind(this);
    }
    localSubmit(e) {
        e.preventDefault();
        this.props.addNames(this.state);
    }

    updateState(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    render() {
        return (
            <div>
                <input id="fname" placeholder="First Name" ref="firstName" value={this.state.firstName} onChange={this.updateState}
                />
                <input id="lname" placeholder="Last Name" ref="lastName" value={this.state.lastName} onChange={this.updateState}
                />
                <button onClick={this.localSubmit}>Add</button>
            </div>
        );
    }
}

class SimpleList extends React.Component {    
    render() {

        var nameArr = "";      
        if (this.props.names != undefined) {
            nameArr = this.props.names.map(function (name, i) {                
                return <Name key={i} nIndex={i} nameVal={name} />;
            });
        }

        return (
            <div>                                
                <div>                        
                     {nameArr}
                </div>

            </div>
        );
    }
}

class Name extends React.Component {
    
    onNameClick(e)
    {
        console.log(e.target.name);
        console.log(this.props.names);
    }
    render() {        
        return (
            <div>       
                <span>{this.props.nIndex+1}</span>
                <span><a href="#" onClick={this.onNameClick.bind(this)} name={this.props.nameVal.fname}>{this.props.nameVal.fname}</a></span>
                {/*<span>{this.props.nameVal.lname}</span>*/}
            </div>
        );
    }
}
export default DetailedToDo;