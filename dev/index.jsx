import React from "react"
import ReactDOM from "react-dom"
import $ from "jquery"
import axios from "axios"

class MessageWindow extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loading : true, 
      messages : []
    }
    //not really sure why
    this.addMessage = this.addMessage.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentDidMount(){
    //get messages from db
    axios.get('/getMessages')
    .then(res => {
      this.setState({
        loading : false,
        messages : res.data//.map(elem => elem.message_body)
      })   
    })
  }

  renderLoading(){
    return(
      <div className="messageWindowDiv">
        <h2>Loading</h2>
      </div>
    )
  }

  renderLoaded(){
    return (
      <div className="messageWindowDiv">
        {
          this.state.messages.map((msg, msgkey)=>(
            <Message key={msgkey}>{new Date(msg.time).toUTCString()+" : "+msg.message_body}</Message>)
          )
        }
        <textarea ref="messageText" onKeyUp={this.handleKeyPress}></textarea>
        <button onClick={this.addMessage}>Send</button>
      </div>
    )
  }

  render(){
    if(this.state.loading) return this.renderLoading()
    else return this.renderLoaded()
  }

  addMessage(){
    //get message from textarea. remove white space or linebreaks etc
    var message = {}
    message.message_body = this.refs.messageText.value.trim()
    message.time = new Date().getTime()
    //only if message is non empty, append it to messages
    if(message.length != 0){
      var arr = this.state.messages
      arr.push(message)
      this.setState({
        loading : false,
        messages : arr
      })
      //reset textarea
      this.refs.messageText.value = ''
      //pass on send message to server
      this.postMessage(message)
    }
  }

  handleKeyPress(e){
    if(e.keyCode == 13){
      e.preventDefault()
      this.addMessage()
    }
  }

  postMessage(message){
    //form json
    var data = message
    //data.message_body = message
    //data.time = new Date().getTime()
    //post message to backend
    $.ajax({
      'url' : '/',
      'type' : 'post',
      'Content-Type' : 'application/json',
      'data' : JSON.stringify(data)
    })
    .done(function(){
      console.log("OK")
    })
    .fail(function(error){
      console.log("Fail", error)
    })
  }
}
 
class Message extends React.Component {
  render(){
    return (
      <div className="messageDiv">
        <p>{this.props.children}</p>
      </div>
    )
  }
}

class MessageBox extends React.Component {
  constructor(props){
    super(props)
    this.state = {empty:true}
  }

  addMessage(){
    //this should create a new Message component, and append it to MessageWindow
    //only if message is non empty
    var message = this.refs.messageText.value
    if(message.length != 0){
      
    }
  }

  render(){
    return (
      <div className="messageBoxDiv">
        <textarea ref="messageText"></textarea>
        <button onClick={this.addMessage}>Send</button>
      </div>
    )
  }
}
 
ReactDOM.render(
  <div>
    <MessageWindow/>
  </div>,
  document.querySelector("#container")
);  