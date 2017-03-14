import React from "react"
import ReactDOM from "react-dom"

var MessageWindow = React.createClass({
  getInitialState : function(){
    return {loading:true, newMessage:false}
  },

  //placeholder. replace with actual data fetching
  componentDidMount : function(){
    setTimeout(this.handleOnLoad, 2000)
  },

  handleOnLoad : function(){
    this.setState({loading : false})
  },

  renderLoading : function(){
    return(
      <div className="messageWindowDiv">
        <Message>Loading</Message>
      </div>
    )
  },

  renderLoaded : function(){
    return (
      <div className="messageWindowDiv">
        <Message>Sampling</Message>
        <Message>Killing</Message>
        <Message>Softly</Message>
        <Message>Loving</Message>
      </div>
    )
  },

  render : function(){
    if(this.state.loading) return this.renderLoading()
    else return this.renderLoaded()
  },
  
  appendMessage : function(msg){
    
  }
});
 
var Message = React.createClass({
  render : function(){
    return (
      <div className="messageDiv">
        <p>{this.props.children}</p>
      </div>
    )
  }
});

var MessageBox = React.createClass({
  getInitialState : function(){
    return {empty:true}
  },

  addMessage : function(){
    //this should create a new Message component, and append it to MessageWindow
    //only if message is non empty
    var message = this.refs.messageText.value
    if(message.length != 0){
      return <Message>{message}</Message>
    }
  },

  render : function(){
    return (
      <div className="messageBoxDiv">
        <textarea ref="messageText"></textarea>
        <button onClick={this.addMessage}>Send</button>
      </div>
    )
  }
});
 
ReactDOM.render(
  <div>
    <MessageWindow/>
    <MessageBox/>
  </div>,
  document.querySelector("#container")
);  