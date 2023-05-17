import React, { Component } from 'react';
import "./LoginHome.css";
import { Grid } from '@material-ui/core';
import { Paper, Avatar } from '@material-ui/core';
import {firebase} from "../../firebase";

class LoginHome extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            signIN : true,

            //signIN
            signin_email:null,
            signin_password:null,

            //signup
            signup_name: null,
            signup_email:null,
            signup_password:null


         }
    }
    switchPanel=()=>{
        if(this.state.signIN)
            this.setState({signIN : false });
        else
            this.setState({signIN : true });
    }

    getImage=()=>{
        return "dp"+Math.floor(Math.random() * 10);
    }

    signUP=()=>{

        firebase.auth().createUserWithEmailAndPassword(this.state.signup_email, this.state.signup_password)
        .then((userCredential) => {
            var user = userCredential.user;

            let payload = {
                "userID" : user.uid,
                "userName": this.state.signup_name,
                "userImage" : this.getImage()
            }

            const requestOptions ={
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body : JSON.stringify(payload),
            };

            fetch("http://localhost:8080/api/userService/save",requestOptions)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("user",JSON.stringify(data));
                window.location.reload();
            })
            .catch(error =>{

            })
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });
    }

    signInMethod=()=>{
        firebase.auth().signInWithEmailAndPassword(this.state.signin_email, this.state.signin_password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            fetch("http://localhost:8080/api/getAllUsers/"+user.uid)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("user",JSON.stringify(data));
                window.location.reload();
            })
            .catch(error =>{

            })
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    }
    
    render() { 
        return ( 
        <div className="main__container">
            <Grid className="main__content" container >
                    <Grid item xs={7}>
                        <div className="fblogo">
                            <img src="https://scontent.fcmb11-1.fna.fbcdn.net/v/t39.30808-6/299987464_464407755696002_6665699850502123634_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHa2Jz9Lqt68HvX3NJB7ClhjVwFjUanC0ONXAWNRqcLQwYcqoanhIXuozUNTw_ji0x6rIlZ01ERrGBZXHUAGDDk&_nc_ohc=emCUkzdeaQ4AX_tk_0X&_nc_oc=AQmopYA5frrc0EKEXxmEcsLCB5cLJZaSOt_JorDTtTZ000-A3W2mdjYDBaptoC8v0RScoYGkTcjt0ZQEHVg3Bv4M&_nc_zt=23&_nc_ht=scontent.fcmb11-1.fna&oh=00_AfCzy20g3CEy-f4Ep2rS_4ISPfezZ8BCyqJyQAbJiBvbHQ&oe=646A2AFC" width="300px" />
                        </div>
                        <br/>
                        <div>
                            <h1 className="text">Foodbook helps you connect and share with the people Your Food experiance.</h1>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className="logincard__container">
                        {
                            this.state.signIN == true ?
                        
                            <div container="login__panel" >
                                <div>
                                    <input onChange={(event)=>{this.state.signin_email=event.currentTarget.value}}  type="text" className="login__input" placeholder="Email address" />
                                </div>
                                <div>
                                    <input onChange={(event)=>{this.state.signin_password=event.currentTarget.value}}  type="password" className="login__input" placeholder="Password"/>
                                </div>
                                <div>
                                    <button onClick={this.signInMethod} className="login__button">Log in</button>
                                </div>
                                <div>
                                    <div className="forget_Text">Forgotten password?</div>
                                </div>
                                <div>
                                    <div className="dividor"></div>
                                </div>
                                <div>
                                    <button className="login__createnew" onClick={this.switchPanel}>Create New Account</button>
                                </div>
                            </div>
                            :
                            <div container="login__panel">
                                <div>
                                    <input onChange={(event)=>{this.state.signup_name=event.currentTarget.value}} type="text" className="login__input" placeholder="Name" />
                                </div>
                                <div>
                                    <input onChange={(event)=>{this.state.signup_email=event.currentTarget.value}}  type="text" className="login__input" placeholder="Email address" />
                                </div>
                                <div>
                                    <input onChange={(event)=>{this.state.signup_password=event.currentTarget.value}}  type="password" className="login__input" placeholder="Password"/>
                                </div>
                                <div>
                                    <button onClick={this.signUP} className="login__button">Sign Up</button>
                                </div>
                                <div>
                                    <div onClick={this.switchPanel} className="forget_Text">Already have account?</div>
                                </div>
                            </div>
                         }

                        </Paper>
                    </Grid>
                    <Grid item xs={1}></Grid>
            </Grid>
        </div> );
    }
}
 
export default LoginHome;