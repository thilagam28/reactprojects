import {Component} from 'react';


class Form extends Component{

    constructor(props){
        super(props);
        this.state={
            fullName:'salman',
            age:''
        };
       this.onSubmitHandler = this.onSubmitHandler.bind(this); 
    }

    onChangeHandler=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    // onSubmitHandler=(event)=>{
    //        event.preventDefault();
    //        alert(this.state.fullName);
    //        alert(this.state.age);
    // }


    
    onSubmitHandler(event){
        event.preventDefault();
        alert(this.state.fullName);
        alert(this.state.age);
        this.props.onChangeEvent({name:this.state.fullName,age:this.state.age})
 }

    render(){
        return(<div className="container">
            <div>
                FullName: <input type="text" onChange={this.onChangeHandler} value={this.state.fullName} name="fullName"/>
            </div>
            <div>
                Age:<input type="text" onChange={this.onChangeHandler} value={this.state.age} name="age"/>
            </div>
            <div>
                <button onClick={this.onSubmitHandler}>Submit</button>
            </div>
        </div>)
    }
}

export default Form;