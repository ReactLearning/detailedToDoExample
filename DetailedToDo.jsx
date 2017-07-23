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
            todoList: [],
            selectedIndex: 0,
            showCompletedFlag: 0,
            searchTodoText: null
        }
        this.addTodoToList = this.addTodoToList.bind(this);
        this.changeSelectedIndex = this.changeSelectedIndex.bind(this);
        this.showCompleted = this.showCompleted.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
        this.searchTodo = this.searchTodo.bind(this);
    }

    addTodoToList(formData) {
        var todo = this.state.todoList;
        todo.push(formData);
        this.setState({ nameList: todo, selectedIndex: this.state.todoList.length - 1 });
        document.getElementById("todoTitle").value = "";
        document.getElementById("todoDesc").value = "";
    }
    changeSelectedIndex(index) {
        this.setState({ selectedIndex: index });

        if (this.state.todoList[index].checked === 0) {
            this.state.todoList[index].checked = 1;
        }
        else {
            this.state.todoList[index].checked = 0;
        }
    }
    showCompleted(e) {
        this.setState({ showCompletedFlag: 1 });
    }

    searchTodo(e) {
        this.setState({ searchTodoText: e.target.value });
    }
    clearFilter(e) {
        document.getElementById("searchTodoText").value = "";
        this.setState({ showCompletedFlag: 0, searchTodoText: null });
    }

    render() {
        return (
            <div>
                <div className="mainDiv">
                    <div className="leftDiv">
                        <h1>Enter ToDo</h1>
                        <SimpleForm addTodo={this.addTodoToList} />
                    </div>
                    <div className="middleDiv">
                        <h1>List Of ToDos </h1>
                        <SimpleList todos={this.state.todoList}
                            showCompleted={this.state.showCompletedFlag}
                            listSearchTodo={this.state.searchTodoText}
                            changeEventListner={this.changeSelectedIndex} />
                    </div>
                    <div className="rightDiv">

                        <h1>Details</h1>
                        <NameInfo details={this.state.todoList[this.state.selectedIndex]} />
                    </div>
                </div>
                <div>
                    Total Selcted ToDos : <CountCheckedNames todos={this.state.todoList} />
                    <button onClick={this.showCompleted} >Completed</button><br />
                    <input type="text" id="searchTodoText" onChange={this.searchTodo} placeholder="Search" /><br />
                    <button onClick={this.clearFilter} >Clear Filter</button>
                </div>
            </div>
        );
    }
}
class CountCheckedNames extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let filterTodos = this.props.todos.filter((todo) => { return todo.checked === 1 });
        return (
            <div>{filterTodos.length}</div>
        );
    }
}
class SimpleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoTitle: '',
            todoDesc: '',
            checked: 0
        };
        this.localSubmit = this.localSubmit.bind(this);
        this.updateState = this.updateState.bind(this);
    }
    localSubmit(e) {
        this.setState({ checked: 0 });
        this.props.addTodo(this.state);
    }

    updateState(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    render() {
        return (
            <div>
                <input id="todoTitle" placeholder="ToDo Title" onChange={this.updateState}
                />
                <textarea rows="5" cols="30" id="todoDesc" placeholder="Description" onChange={this.updateState}
                />                <br />
                <button onClick={this.localSubmit} className="btn">Add</button>
            </div>
        );
    }
}

class SimpleList extends React.Component {
    constructor(props) {
        super(props);
        this.localOnToDoClick = this.localOnToDoClick.bind(this);
    }
    localOnToDoClick(key) {
        this.props.changeEventListner(key);
    }

    render() {
        const ctx = this;
        let showCompletedFlag = this.props.showCompleted;
        let searchTodo = this.props.listSearchTodo;
        let todoFilterList = [];
        this.props.todos.map(function (todo, i) {
            if (showCompletedFlag === 1 && todo.checked === 1) {
                if (searchTodo ? todo.todoTitle.includes(searchTodo) : true)
                { todoFilterList.push(todo); }
            }
            if (showCompletedFlag === 0) {
                if (searchTodo ? todo.todoTitle.includes(searchTodo) : true) {
                    todoFilterList.push(todo);
                }
            }
        });

        return (
            <div>
                <div>
                    {

                        todoFilterList.map(function (todo, i) {
                            return <Name key={i} nIndex={i} todoVal={todo}
                                onListClick={(i) => ctx.localOnToDoClick(i)} />;
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
    onListClick(e) {
        this.props.onListClick(this.props.nIndex);
    }
    render() {
        let checkedVar = this.props.todoVal.checked;
        return (
            <div>
                <span>{this.props.nIndex + 1}</span>
                <span>
                    <input type="checkbox" onChange={this.onListClick}
                        checked={checkedVar === 0 ? "" : "checked"} />
                    {this.props.todoVal.todoTitle}</span>
            </div>
        );
    }
}

class NameInfo extends React.Component {
    render() {
        let todoInfo;
        if (this.props.details) {
            todoInfo = (<div><span><i>{this.props.details.todoTitle ? this.props.details.todoTitle : ""}</i></span>
                <br />
                <textarea rows="5" cols="30" readOnly="readonly" value={this.props.details.todoDesc}>
                </textarea></div>);
        }
        // else
        //     {
        //         todoInfo = (<div><span><i>Todo Title</i></span>
        //         <br />
        //         <textarea rows="5" cols="30" readOnly="readonly" value="No data">
        //         </textarea></div>);
        //     }
        return (
            <div>
                {todoInfo}
            </div>
        );
    }
}

export default DetailedToDo;