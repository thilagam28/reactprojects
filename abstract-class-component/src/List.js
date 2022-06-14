
import {Component } from 'react';
import axios from 'axios';

class List extends Component{

    constructor(props){
       super(props);
       this.state={
           list:[]
       }
    }

    componentDidMount(){
        axios.get('http://localhost:3000/expense').then((response)=>{
            this.setState({
                list:response.data
            });
        }).catch(()=>{

        })
    }

    render(){
        return(<div>List - {this.props.fullName} - {this.props.age}
        <table>
            <tr>
                <th>ExpenseName</th>
                <th>amount</th>
            </tr>
            {this.state.list.map((obj,index)=>{
                return(<tr key={index}>
                    <td>{obj.expenseName}</td>
                    <td>{obj.amount}</td>
                </tr>)
            })}
        </table>
        </div>)
    }
}

export default List;