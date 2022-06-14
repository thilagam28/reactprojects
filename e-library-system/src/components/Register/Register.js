import './Register.css';
import {Link,useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {firstNameValidation,lastNameValidation,emailValidation,passwordValidation}  from '../Validation';

function Register(){

  const navigate = useNavigate();
  const[getForm,setForm]=useState({
      firstName:'',
      lastName:'',
      email:'',
      password:''
    });

    const[getValidation,setValidation]=useState({
      firstName:'',
      lastName:'',
      email:'',
      password:''
    });


    const onChangeHandler=(event)=>{
      setForm({
        ...getForm,[event.target.name]:event.target.value
      })
    }
    const onSubmitHandler=(event)=>{
      event.preventDefault(); 
      setValidation({
        ...getValidation,firstName:!firstNameValidation(getForm.firstName)?"Please provide the firstName":'',
        lastName:!lastNameValidation(getForm.lastName)?"Please provide the lastName":'',
        email:!emailValidation(getForm.email)?"please provide email":'',
        password:!passwordValidation(getForm.password)?"Please provide the password":''
        
      });
      
      if(emailValidation(getForm.email) && passwordValidation(getForm.password) && 
      firstNameValidation(getForm.firstName) && lastNameValidation(getForm.lastName)){
        alert("success");
        sessionStorage.setItem("firstName",getForm.firstName);
        sessionStorage.setItem("lastName",getForm.lastName);
        sessionStorage.setItem("email",getForm.email);
        sessionStorage.setItem("password",getForm.password);
        

        navigate('/login');
      }
  }
     
    

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
                                <input type="text" onChange={onChangeHandler} className="form-control" value={getForm.firstName} id="firstName" name="firstName" placeholder="Enter first name"/>
                                {getValidation.firstName && <div class="alert alert-danger" role="alert">
                                {getValidation.firstName}
                                </div> }
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" onChange={onChangeHandler} className="form-control" value={getForm.lastName} id="lastName" name="lastName"  placeholder="Enter last name"/>
                                {getValidation.lastName && <div class="alert alert-danger" role="alert">
                                {getValidation.lastName}
                                </div> }

                            </div>                        
                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" onChange={onChangeHandler} className="form-control" value={getForm.email} id="email" name="email" placeholder="Enter email"/>                      
                                {getValidation.email && <div class="alert alert-danger" role="alert">
                                {getValidation.email}
                                </div> }
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" onChange={onChangeHandler} className="form-control" value={getForm.password} id="password" name="password" placeholder="Password"/>
                                {getValidation.password && <div class="alert alert-danger" role="alert">
                                {getValidation.password}
                                </div> }
                            </div>                    
                            <button onClick={onSubmitHandler} type="submit" className="btn btn-warning btn-lg subbutton">Submit</button>
                        </form>
                    </div>
                    <div className="col-4">                    
                    </div>
                </div>     
        </div>
    </div>);
}

export default Register;