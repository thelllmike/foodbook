import React, { Component } from 'react';
import Status from './Status';
import "./StatusBar.css";
import deleteicon from "../../../../images/trash-can-regular.svg";

class StatusBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: []
         }
    }

    getData=()=>{
        const thisContext=this;
        fetch("http://localhost:8080/api/statusService/getAllStatus")
        .then(response => response.json())
        .then(json => {
            thisContext.setState({data : json});
        })
        .catch(error =>{

        })
    }


    deleteStatus = (statusID) => {
      fetch(`http://localhost:8080/api/statusService/delete/${statusID}`, {
        method: "DELETE"
      })
        .then(response => {
          if (response.ok) {
            // Post deletion was successful
            // Update the state to remove the deleted status from the data array
            this.setState(prevState => ({
              data: prevState.data.filter(item => item.statusID !== statusID)
            }));
          } else {
            // Post deletion failed
            // Handle the error case accordingly
            throw new Error('Post deletion failed.');
          }
        })
        .catch(error => {
          // Error occurred during the deletion process
          // Handle the error case accordingly
          console.error(error);
        });
    };
    
      

    componentDidMount(){
        this.getData();
    }

    render() {
        return (
          <div className="statusbar__container">
            <Status refresh={this.getData} uploader="true" />
            {this.state.data.map((item) => (
  <div key={item.statusID}>
    <Status refresh={this.getData} object={item} />
    {this.props.uploader && (
      <div className="post__tab">
        <button onClick={() => this.deleteStatus(item.statusID)}>
          <div className="post__tabfirst">
            <img
              className="post__tabimg icons"
              src={deleteicon}
              alt="Delete Icon"
            />
          </div>
          <div className="post__tabtext">Delete</div>
        </button>
      </div>
    )}
  </div>
))}

          </div>
        );
      }
      
}
 
export default StatusBar;