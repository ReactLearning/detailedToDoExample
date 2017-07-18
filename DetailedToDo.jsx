import React from 'react';
import ReactDOM from 'react-dom';
import './toDoStyle.css';


class DetailedToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameList: [],
            selectedIndex: 0
        }
        this.addNameToList = this.addNameToList.bind(this);
        this.changeSelectedIndex = this.changeSelectedIndex.bind(this);
    }

    addNameToList(formData) {
        var names = this.state.nameList;
        names.push(formData);
        this.setState({ nameList : names });
        //this.state.nameList.filter((name) => { name.checked === "checked" });
    }
    changeSelectedIndex (index) {
        this.setState({ selectedIndex: index });
        
        if(this.state.nameList[index].checked === 0)
        {
            this.state.nameList[index].checked=1;
            //this.state.nameList[index].checked="checked";
        }
        else{
            this.state.nameList[index].checked=0;
            //this.state.nameList[index].checked="";
        }
    }

    render() {
        return (
            <div>
                <div className="mainDiv">
                    <div className="leftDiv">
                        <h1>Enter Details</h1>
                        <SimpleForm addNames={this.addNameToList} />
                    </div>                    
                    <div className="middleDiv">
                        <h1>List Of Names </h1>
                        <SimpleList names={this.state.nameList} changeEventListner={this.changeSelectedIndex} />
                    </div>        
                    <div className="rightDiv">
                        <h1>Details</h1>
                        <NameInfo details={this.state.nameList[this.state.selectedIndex]}/>
                    </div>        
                </div>
                <div>
                    Total Selcted ToDos : {this.state.nameList.filter((name) => { name.checked == "checked" }
                    )}
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
            lname: '',
            checked:0
        };
        this.localSubmit = this.localSubmit.bind(this);
        this.updateState = this.updateState.bind(this);
    }
    localSubmit(e) {
        
        this.props.addNames(this.state);
    }

    updateState(e) {        
        this.setState({ [e.target.id]: e.target.value });        
    }

    render() {
        return (
            <div>
                <input id="fname" placeholder="First Name"  value={this.state.firstName} onChange={this.updateState}
                />
                <input id="lname" placeholder="Last Name"  value={this.state.lastName} onChange={this.updateState}
                />
                <input type="hidden" id="checked" value="0"/>
                <button onClick={this.localSubmit} className="btn">Add</button>
            </div>
        );
    }
}

class SimpleList extends React.Component {    
    constructor(props) {
        super(props);
        this.localOnNameClick = this.localOnNameClick.bind(this);
    }
    localOnNameClick(key)
    {
        this.props.changeEventListner(key);
    }

    render() {
        const ctx = this;
        return (
            <div>                                
                <div>                        
                    {
                        this.props.names.map(function (name, i) {
                            return <Name key={i} nIndex={i} nameVal={name} onListClick={(i) => ctx.localOnNameClick(i)}/>;
                        })
                    }
                </div>
            </div>
        );
    }
}

class Name extends React.Component {
     constructor(props) {
        super(props);
        this.onListClick = this.onListClick.bind(this);
    }
    onListClick(e)
    {
        this.props.onListClick(this.props.nIndex);
    }   
    render() {               
        let checkedVar = this.props.nameVal.checked;        
        return (
            <div>       
                <span>{this.props.nIndex+1}</span>
                <span><input type="checkbox" onChange={this.onListClick}  checked={checkedVar===0?"":"checked"}                         
           name={this.props.nameVal.fname}/>
                {this.props.nameVal.fname}</span>                
            </div>
        );
    }
}

class NameInfo extends React.Component
{
    render()
    {
        return(       
            <div> 
                <span>{this.props.details && this.props.details.fname? this.props.details.fname: ""}</span>,
                <span>{this.props.details && this.props.details.lname? this.props.details.lname: ""}</span>
            </div>
        );
    }
}

export default DetailedToDo;