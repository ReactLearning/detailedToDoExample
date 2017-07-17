import React from 'react';

class App extends React.Component{
    constructor(props)
   {
       super(props);
       this.state = {counter :0};
      this.handleClick = this.handleClick.bind(this);
   }
   handleClick(increment) {   
       this.setState({counter : this.state.counter+increment});       
   }
    render()
    {
        return(
            <div>
                <Button localHandleClick = {this.handleClick} increment={1}/>
                <Button localHandleClick = {this.handleClick} increment={5}/>
                <Button localHandleClick = {this.handleClick} increment={10}/>
                <Button localHandleClick = {this.handleClick} increment={100}/>
                <Result localCounter = {this.state.counter} />
                <hr/>
                </div>
        );
    }
}
class Button extends React.Component {
 constructor(props)
   {      
       super(props);
      this.localHandleClick = this.localHandleClick.bind(this);
   }

    localHandleClick()
    {
        this.props.localHandleClick(this.props.increment);
    }
    render() {
      return (                          
            <button onClick={this.localHandleClick}>+{this.props.increment}</button>                     
      );
    }
}

class Result extends React.Component
{
    render()
    {
        return(
            <div>{this.props.localCounter}</div>
        );
    };
}

export default App;