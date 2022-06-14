import './Register.css';
import {Link,useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {firstNameValidation,lastNameValidation,emailValidation,passwordValidation}  from '../Validation';
import { Component } from 'react';

class Register extends Component(){

  constructor(props){
    super(props);
     this.state={
       getForm:{
            firstName:'',
            lastName:'',
            email:'',
            password:''
       },
       getValidation:{
            firstName:'',
            lastName:'',
            email:'',
            password:''
       }
     }
  }
  onChangeHandler=(event)=>{
    this.setState({
        getForm:{
          ...this.state.getForm,
            [event.target.name]:event.target.value
        }
        })
      }

  
 onSubmitHandler=(event)=>{
      event.preventDefault(); 
      this.setState({
        getValidation:{
            firstName:!firstNameValidation(this.state.getForm.firstName)?"Please provide the firstName":'',
            lastName:!lastNameValidation(this.state.getForm.lastName)?"Please provide the lastName":'',
            email:!emailValidation(this.state.getForm.email)?"please provide email":'',
            password:!passwordValidation(this.state.getForm.password)?"Please provide the password":''
          }        
      });
      
      if(emailValidation(this.state.getForm.email) && passwordValidation(this.state.getForm.password) && 
      firstNameValidation(this.state.getForm.firstName) && lastNameValidation(this.state.getForm.lastName)){
        alert("success");
        sessionStorage.setItem("firstName",this.state.getForm.firstName);
        sessionStorage.setItem("lastName",this.state.getForm.lastName);
        sessionStorage.setItem("email",this.state.getForm.email);
        sessionStorage.setItem("password",this.state.getForm.password);       

        document.location.href="/login";
      }
  }
     
    
  render(){
    return(<div>
        <div className="container">
              <div className="row">
                    <div className="col-4">
                    </div>
                    <div className="col-4" >
                    <label><h1>Sign Up</h1></label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                    </div>
                
                    <div className="col-4">
                    <form>
                            <div className="form-group">                                                    
                            </div>
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" onChange={this.onChangeHandler} className="form-control" id="firstName" name="firstName" placeholder="Enter first name"/>
                                {this.state.getValidation.firstName && <div class="alert alert-danger" role="alert">
                                {this.state.getValidation.firstName}
                                </div> }
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" onChange={this.onChangeHandler} className="form-control"  id="lastName" name="lastName"  placeholder="Enter last name"/>
                                {this.state.getValidation.lastName && <div class="alert alert-danger" role="alert">
                                {this.state.getValidation.lastName}
                                </div> }

                            </div>                        
                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" onChange={this.onChangeHandler} className="form-control"  id="email" name="email" placeholder="Enter email"/>                      
                                {this.state.getValidation.email && <div class="alert alert-danger" role="alert">
                                {this.state.getValidation.email}
                                </div> }
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" onChange={this.onChangeHandler} className="form-control" id="password" name="password" placeholder="Password"/>
                                {this.state.getValidation.password && <div class="alert alert-danger" role="alert">
                                {this.state.getValidation.password}
                                </div> }
                            </div>                    
                            <button onClick={this.onSubmitHandler} type="submit" className="btn btn-warning btn-lg subbutton">Submit</button>
                        </form>
                    </div>
                    <div className="col-4">                    
                    </div>
                </div>     
        </div>
    </div>);
}
}

export default Register;