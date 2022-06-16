import books from '../../asserts/LMS-books.jpg';
import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import {emailValidation,passwordValidation}  from '../Validation';
import {useDispatch } from 'react-redux';
import Users from '../../services/users';

function Login(){

  const dispatch = useDispatch();
    const navigate=useNavigate();

    const[getForm,setForm]=useState({
        email:'',
        password:''
    })
    
    const[getValidation,setValidation]=useState({
        email:'',
        password:''
    })
    
    const onChangeHandler=(event)=>{
        setForm({
            ...getForm,[event.target.name]:event.target.value
          })
    }
    const onAdminSubmitHandler=(event)=>{
        let email = "admin@abstract.com";
        let password = "admin";
        if(email === getForm.email && password === getForm.password){
            Users.loadUsers(dispatch);
          navigate('/AdminSearch');
        }
        
        else{
          setValidation({
            email:'no match found',
            password:'no match found'
          });
        }

    }
    
    const onSubmitHandler=(event)=>{
        event.preventDefault();
        setValidation({
            ...getValidation,email:!emailValidation(getForm.email)?"Please enter registered email":'',
        password:!passwordValidation(getForm.password)?"Please enter correct password":''
        });
        if(emailValidation(getForm.email) && passwordValidation(getForm.password)){
            
            let email = sessionStorage.getItem('email');
            let password = sessionStorage.getItem('password');
            if(email === getForm.email && password === getForm.password){
                Users.loadUsers(dispatch,email,password);
              navigate('/about');
            }
            
            else{
              setValidation({
                email:'no match found',
                password:'no match found'
              });
            }
        
          }
        
    
    }
    
    


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
                                        <input type="text" onChange={onChangeHandler} value={getForm.email} className="form-control log-text" name="email" id="email"  aria-describedby="inputGroupPrepend" />
                                        {getValidation.email && <div class="alert alert-danger" role="alert">
                                        {getValidation.email} </div> }
                                </div>                        
                            </div>

                            <div className="form-group row log">
                                    <label>Password    :</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="inputGroupPrepend"><i className="fa fa-key" aria-hidden="true"></i></span>
                                    </div>                          
                                    <input onChange={onChangeHandler} type="password" value={getForm.password} className="form-control log-text"  name="password" id="password"/>
                                    {getValidation.password && <div class="alert alert-danger" role="alert">
                                        {getValidation.password} </div> }
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
                                        <td><button type="submit"  onClick={onAdminSubmitHandler} className="btn btn-warning ">Admin Login</button></td>
                                        <td><button type="submit" onClick={onSubmitHandler} className="btn btn-warning ">Login</button></td>
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

export default Login;