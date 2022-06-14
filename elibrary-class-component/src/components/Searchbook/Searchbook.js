import './Searchbook.css';
import {Link} from 'react-router-dom';
import { useEffect,useState } from 'react';
import {Component} from 'react';
class Searchbook extends Component{
  constructor(props){
  super(props);
  this.state={
    getForm:{
     bookId:'',
     bookTitle:'',
     bookDesc:'',
     authorName:'',
     noBooks:''
    },
     getValidation:{
     bookId:'',
     bookTitle:'',
     bookDesc:'',
     authorName:'',
     noBooks:''
    }
    }
    }
    searchFilter=(event)=>{
      event.preventDefault();
      let details = this.state.list.filter((obj)=>{
        return obj.bookTitle === this.state.search; 
      })
      this.setState({list:details});
      }
     
    resetFilter=(event)=>{
      event.preventDefault();
      this.setState({search:''});
      if(JSON.parse(sessionStorage.getItem('bookDetails')) && JSON.parse(sessionStorage.getItem('bookDetails')).length>0){
      this.setState({list:JSON.parse(sessionStorage.getItem('bookDetails'))})
 }
}
    onChangeSearchHandler=(event)=>{
    this.setState({search:event.target.value});
    }
         // Add book details into table
    componentDidMount(){
    if(JSON.parse(sessionStorage.getItem('bookDetails')) && JSON.parse(sessionStorage.getItem('bookDetails')).length>0){
        this.setState({list:JSON.parse(sessionStorage.getItem('bookDetails'))})
       }
}


    render(){
    return(<div>
        
        <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                  <form>       
                    <div><label><h1>Search Book</h1></label></div> 
                    <div className="form-group row">
                      <label for="booktitle" className="col-sm-2 col-form-label">Book Title:</label>
                      <div className="col-sm-10">
                        <input type="text"  onChange={this.onChangeSearchHandler}  name="searchBookName" class="form-control" id="booktitle" style={{width: 250, height:30}} />
                      </div>
                    </div>                           
                      <button type="submit" onClick={this.searchFilter} className="btn btn-warning subbutton" style={{marginLeft: 200}}>Search</button>
                      <button onClick={this.resetFilter} class="btn btn-warning subbutton">Reset</button>
                    </form>
              </div>                            
            </div>

            <div className="row">
                <div className="col-12">
                <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Book ID</th>
                          <th scope="col">Book Name</th>
                          <th scope="col">Book Description</th>
                          <th scope="col">Author</th>
                          <th scope="col">Number of books available</th>                         
                          <th scope="col">Purchase</th>                          
                        </tr>
                      </thead>
                      <tbody>
                            {this.state.list.map((obj,index)=>{
                            return(<tr key={index}>                          
                            <td>{obj.bookId}</td>
                            <td>{obj.bookTitle}</td>
                            <td>{obj.bookDesc}</td>
                            <td>{obj.authorName}</td>
                            <td>{obj.noBooks}</td>
                            <td><Link to="">Purchase</Link></td> 
                          </tr>)
                            })}                        
                      </tbody>
                    </table>
                </div>
            </div>
   
        </div>
    </div>);
  }
}

export default Searchbook;