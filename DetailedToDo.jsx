import React from 'react';
import ReactDOM from 'react-dom';
// import Button from 'react-bootstrap/lib/Button';
// import 'bootstrap/less/bootstrap.less';
//import 'bootstrap/less/bootstrap.less';
import './toDoStyle.css';
// import './node_modules/bootstrap/dist/css/bootstrap.min.css';


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
        this.setState({ nameList : names,selectedIndex:this.state.nameList.length-1 });
    }
    changeSelectedIndex (index) {
        this.setState({ selectedIndex: index });
        
        if(this.state.nameList[index].checked === 0)
        {
            this.state.nameList[index].checked=1;
        }
        else{
            this.state.nameList[index].checked=0;
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
                    Total Selcted ToDos : <CountCheckedNames names={this.state.nameList} />                                        
                </div>                               
            </div>
        );
    }
}
class CountCheckedNames extends React.Component
{
    constructor(props) {
        super(props);
    }
    render()
    {
        let filterNames = this.props.names.filter((name) => {return name.checked===1});        
        return(
            <div>{filterNames.length}</div>
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
        this.setState({checked:0});
        this.props.addNames(this.state);
    }

    updateState(e) {            
        this.setState({ [e.target.id]: e.target.value });        
    }

    render() {
        return (
            <div>
                <input id="fname" placeholder="First Name"   onChange={this.updateState}
                />
                <input id="lname" placeholder="Last Name"   onChange={this.updateState}
                />                
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
        let nameInfo;
        if(this.props.details)
        {
            nameInfo = (<div><span>{this.props.details.fname ? this.props.details.fname: ""}</span>
            <span>{this.props.details.lname? ', '+this.props.details.lname: ""}</span></div>);
        }
        return(                   
            <div> 
                {nameInfo}
            </div>
        );
    }
}

export default DetailedToDo;