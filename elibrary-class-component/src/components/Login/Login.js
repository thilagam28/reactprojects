import books from '../../asserts/LMS-books.jpg';
import {Link, useNavigate} from 'react-router-dom';
import {emailValidation,passwordValidation}  from '../Validation';
import { Component } from 'react';



class Login extends Component(){

    constructor(props){
        super(props);
        this.state={
            getForm:{
                email:'',
                password:''

            },
            getValidation:{
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
                email:!emailValidation(this.state.getForm.email)?"Please enter registered email":'',
                password:!passwordValidation(this.state.getForm.password)?"Please enter correct password":''
            }
        });
        if(emailValidation(this.state.getForm.email) && passwordValidation(this.state.getForm.password)){
            
            let email = sessionStorage.getItem('email');
            let password = sessionStorage.getItem('password');
            if(email === this.state.getForm.email && password === this.state.getForm.password){
                document.location.href="/about";
            }
            
            else{
                this.setState({
                    getValidation:{
                        email:'no match found',
                        password:'no match found'
                    }
                })
            }
        
          }
        
    
    }

    
    render(){ 

    return(<div>
        
        <div className="container bgimg">            
              <div className="row">
                    <div className="col-4">
                    </div>
                    <div className="col-4 logform">
                            <div className="row">
                                <div className="col-4">
                                        <div><img src={books} width= {100} height= {100}/> </div>
                                </div>   
                                <div className="col-4">                          
                                    <h1>LIBRARY</h1>
                                    <h6>MANAGEMENTSYSTEM</h6>
                                </div>    
                            </div>                    
                        <form className="form-inline">
                            <div className="form-group row log">
                                        <label for="validationCustomUsername">User Name :</label>
                                <div className="input-group">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text" id="inputGroupPrepend"><i className="fa fa-user" aria-hidden="true"></i></span>
                                        </div>
                                        <input type="text" onChange={this.onChangeHandler}  className="form-control log-text" name="email" id="email"  aria-describedby="inputGroupPrepend" />
                                        {this.state.getValidation.email && <div class="alert alert-danger" role="alert">
                                        {this.state.getValidation.email} </div> }
                                </div>                        
                            </div>

                            <div className="form-group row log">
                                    <label>Password    :</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="inputGroupPrepend"><i className="fa fa-key" aria-hidden="true"></i></span>
                                    </div>                          
                                    <input onChange={this.onChangeHandler} type="password"  className="form-control log-text"  name="password" id="password"/>
                                    {this.state.getValidation.password && <div class="alert alert-danger" role="alert">
                                        {this.state.getValidation.password} </div> }
                                </div>
                            </div>                      
                        
                            <div className="form-group row">
                                <div className="col-sm-10" >
                                <table>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td><button type="submit"  className="btn btn-warning "><Link to="/AdminSearch">Admin Login</Link></button></td>
                                        <td><button type="submit" onClick={this.onSubmitHandler} className="btn btn-warning ">Login</button></td>
                                    </tr>
                                </table>                                
                                </div>
                            </div>
                        </form>
                
                        <div className="col-4">                    
                        </div>
                    </div>     
                </div>
        </div>
    </div>);
}
}

export default Login;