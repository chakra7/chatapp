import React from "react"
import ReactDOM from "react-dom"

class MessageWindow extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loading : true, 
      messages : []
    }
    //not really sure why
    this.handleOnLoad = this.handleOnLoad.bind(this)
    this.addMessage = this.addMessage.bind(this)
  }

  //placeholder. replace with actual data fetching
  componentDidMount(){
    setTimeout(this.handleOnLoad, 2000)
  }

  handleOnLoad(){
    this.setState({
      loading : false,
      //dummy messages. real messages need to come from server
      messages : [
        'Sampling',
        'Killing',
        'Softly',
        'Loving'
      ]
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
          this.state.messages.map((msgbody, msgkey)=>(
            <Message key={msgkey}>{msgbody}</Message>)
          )
        }
        <textarea ref="messageText"></textarea>
        <button onClick={this.addMessage}>Send</button>
      </div>
    )
  }

  render(){
    if(this.state.loading) return this.renderLoading()
    else return this.renderLoaded()
  }

  addMessage(){
    //get message from textarea
    var message = this.refs.messageText.value
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
    }
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