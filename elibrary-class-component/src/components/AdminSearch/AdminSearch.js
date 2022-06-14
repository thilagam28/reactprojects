import './AdminSearch.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Component} from 'react';
class AdminSearch extends Component{
    constructor(props){
        super(props);
        this.state={
            list:[],
            index:-1,
            search:'',
        book:{
            bookId:'',
            bookTitle:'',
            bookDesc:'',
            authorName:'',
            noBooks:''
        }
        }
    }
    onChangeSearchHandler=(event)=>{
            this.setState({search:event.target.value});
          }
        
    onChangeHandler=(event)=>{
            this.setState({book:{
              ...this.state.book,[event.target.name]:event.target.value
     } })
          }
     // Add book details into table
    componentDidMount(){
      axios.get('http://localhost:3000/library').then((response)=>{
      console.log(response.data)
      this.setState({list:response.data});
      }).catch((error)=>{
      console.log(error);
    })
    //         if(JSON.parse(sessionStorage.getItem('bookDetails')) && JSON.parse(sessionStorage.getItem('bookDetails')).length>0){
    //            setList(JSON.parse(sessionStorage.getItem('bookDetails')))
    //         }
     }
     //delete item from table when delete icon clicked
      onDeleteHandler=(index)=>{
      let bookDetails = [...this.state.list];
      let id = bookDetails[index].id;
      axios.delete('http://localhost:3000/library/'+id).then((response)=>{
      bookDetails.splice(index,1);
      this.setState({list:bookDetails});
      }).catch(()=>{
      })
     // sessionStorage.setItem('expenseDetails',JSON.stringify(expenseDetails));
    }
        //edit table item
    onEditHandler=(index)=>{
      this.setState({book:{
      bookName:this.state.list[index].bookName,
      bookId:this.state.list[index].bookId,
      bookTitle:this.state.list[index].bookTitle,
      bookDesc:this.state.list[index].bookDesc,
      authorName:this.state.list[index].authorName,
      noBooks:this.state.list[index].noBooks        
      },
      index:index
    })
      
     }
     onEditSubmitHandler=(event)=>{
      event.preventDefault();  
      let bookDetails =[...this.state.list];  
      let id= bookDetails[this.state.index].id;
        axios.patch('http://localhost:3000/library/'+id,{  
        bookId:this.state.book.bookId,  
        bookTitle:this.state.book.bookTitle,  
        bookDesc:this.state.book.bookDesc,  
        authorName:this.state.book.authorName,  
        noBooks:this.state.book.noBooks  
      }).then(()=>{  
        this.setState({list:bookDetails});  
      bookDetails[this.state.index].bookId = this.state.book.bookId;
      bookDetails[this.state.index].bookTitle=this.state.book.bookTitle;
      bookDetails[this.state.index].bookDesc = this.state.book.bookDesc;
      bookDetails[this.state.index].authorName= this.state.book.authorName;
      bookDetails[this.state.index].noBooks = this.state.book.noBooks;
    }).catch(()=>{
    })
  }




       
    //  //Modal dialog field edit submit
    //  onEditSubmitHandler=(event)=>{
    //   event.preventDefault();
    //   let bookDetails =[...this.state.list];
    //   let id= bookDetails[this.state.index].id;
    //   axios.patch('http://localhost:3000/library/'+id,{
    //     bookId:this.state.book.bookId,
    //     bookTitle:this.state.book.bookTitle,
    //     bookDesc:this.state.book.bookDesc,
    //     authorName:this.state.book.authorName,
    //     noBooks:this.state.book.noBooks
    //   }).then(()=>{
    //     this.setState({list:bookDetails});
    //     bookDetails[this.state.index].bookId = this.state.book.bookId;
    //     bookDetails[this.state.index].bookTitle=this.state.book.bookTitle;
    //     bookDetails[this.state.index].bookDesc = this.state.book.bookDesc;
    //     bookDetails[this.state.index].authorName= this.state.book.authorName;
    //     bookDetails[this.state.index].noBooks = this.state.book.noBooks;
    //   }).catch(()=>{
    //   })

    // }
    //search data in the table
     searchFilter=(event)=>{
      event.preventDefault();
      let details = this.state.list.filter((obj)=>{
        return obj.bookTitle === this.state.search; 
      })
      this.setState({list:details});
    }

     //reset search field
    resetFilter=(event)=>{
        event.preventDefault();
        this.setState({search:''});
        axios.get('http://localhost:3000/library').then((response) => {
          console.log(response);
          this.setState({list:response.data});
      }).catch((error) => {
          console.log(error);

      })

      //   if(JSON.parse(sessionStorage.getItem('bookDetails')) && JSON.parse(sessionStorage.getItem('bookDetails')).length>0){
      //     this.setState({list:JSON.parse(sessionStorage.getItem('bookDetails'))})
      //  }
    }
render()
{
    return(<div>
        
        <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                  <form>       
                    <div><label><h1>Search Book</h1></label> 
                    <button type="submit" class="btn btn-warning subbutton" style={{marginLeft: 1000}}><Link to="/Addbook">Add Book</Link></button></div> 
                    <div class="form-group row">
                      <label for="booktitle" class="col-sm-2 col-form-label">Book Title:</label>
                      <div class="col-sm-10">
                        <input type="text" value={this.state.book.search} onChange={this.onChangeSearchHandler}  name="searchBookName" class="form-control" id="booktitle" style={{width: 500}}/>
                      </div>
                    </div>                           
                      <button type="submit"  onClick={this.searchFilter} class="btn btn-warning subbutton" style={{marginLeft: 200}}>Search</button>
                      <button onClick={this.resetFilter} class="btn btn-warning subbutton">Reset</button>
                      
                    </form>
              </div>                            
            </div>

            <div class="row">
                <div class="col-12">
                  <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Book ID</th>
                          <th scope="col">Book Name</th>
                          <th scope="col">Book Description</th>
                          <th scope="col">Author</th>
                          <th scope="col">Number of books available</th>                         
                          <th scope="col">Edit</th>
                          <th scope="col">Delete</th>
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
                            <td><i  onClick={()=>this.onEditHandler(index)} data-toggle="modal" data-target="#edit" className="fa fa-pencil-square-o" aria-hidden="true"></i></td>
                            <td><i  onClick={()=>this.onDeleteHandler(index)} className="fa fa-trash" aria-hidden="true"></i></td>
                          </tr>)
                            })}                        
                      </tbody>
                    </table>
                </div>
            </div>   
        </div>

        <div className="modal fade" id="edit"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                <form>
                      <div className="form-group">
                          <label>Book Id</label>
                          <input type="text"  value={this.state.book.bookId}  onChange={this.onChangeHandler} name="bookId" className="form-control" id="bookId"  placeholder="Enter book ID"/>
                        </div>
                        <div className="form-group">
                          <label>Book Name</label>
                          <input   value={this.state.book.bookTitle} onChange={this.onChangeHandler} type="text" name="bookTitle" className="form-control" id="bookTitle"  placeholder="Enter book Title"/>
                        </div>
                        
                      <div className="form-group">
                        <label>Book bookDesc</label>
                        <input   value={this.state.book.bookDesc} onChange={this.onChangeHandler} type="text" name="bookDesc" className="form-control" id="bookDesc" placeholder="Enter bookDesc"/>
                      
                      </div>
                      <div className="form-group">
                        <label>Author Name</label>
                        <input   value={this.state.book.authorName}  onChange={this.onChangeHandler} type="text"  name="authorName" className="form-control" id="authorName" placeholder="enter author name"/>
                      </div>
                      <div className="form-group">
                        <label>No. of Books available</label>
                        <input   value={this.state.book.noBooks} onChange={this.onChangeHandler} type="text"  name="noBooks" className="form-control" id="noBooks" placeholder="enter no. of books available"/>
                      </div>
                  
                      <button data-dismiss="modal" onClick={this.onEditSubmitHandler} type="submit" className="btn btn-success">ADD</button>
                    </form>
        </div>
       
      </div>
    </div>
  </div>
    </div>);
 }
}

export default AdminSearch;