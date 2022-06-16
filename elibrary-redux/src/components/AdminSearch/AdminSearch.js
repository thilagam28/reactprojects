import './AdminSearch.css';
import {Link} from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';

function AdminSearch(){
  const[getList,setList] =  useState([]);
  const[getIndex,setIndex]=useState(-1);
  const[getSearch,setSearch]=useState('');

  const[getBook,setBook]=useState({
    bookId:'',
    bookTitle:'',
    bookDesc:'',
    authorName:'',
    noBooks:''
  });

  const onChangeSearchHandler=(event)=>{
    setSearch(event.target.value);
  }

  const onChangeHandler=(event)=>{
    setBook({
      ...getBook,[event.target.name]:event.target.value
    })
  }
    //Modal dialog field edit submit
    const onEditSubmitHandler=(event)=>{
      event.preventDefault();
      let bookDetails =[...getList];
      let id= bookDetails[getIndex].id;
      axios.patch('http://localhost:3000/library/'+id,{
        bookId:getBook.bookId,
        bookTitle:getBook.bookTitle,
        bookDesc:getBook.bookDesc,
        authorName:getBook.authorName,
        noBooks:getBook.noBooks

      }).then(()=>{
        setList(bookDetails);
        bookDetails[getIndex].bookId = getBook.bookId;
        bookDetails[getIndex].bookTitle=getBook.bookTitle;
        bookDetails[getIndex].bookDesc = getBook.bookDesc;
        bookDetails[getIndex].authorName= getBook.authorName;
        bookDetails[getIndex].noBooks = getBook.noBooks;
      }).catch(()=>{

      })
    }
    // Add book details into table
     useEffect(()=>{

      axios.get('http://localhost:3000/library').then((response)=>{
        console.log(response.data)
        setList(response.data);
    }).catch((error)=>{
      console.log(error);
    })
    //         if(JSON.parse(sessionStorage.getItem('bookDetails')) && JSON.parse(sessionStorage.getItem('bookDetails')).length>0){
    //            setList(JSON.parse(sessionStorage.getItem('bookDetails')))
    //         }
     },[])
     //delete item from table when delete icon clicked
     const onDeleteHandler=(index)=>{
      let bookDetails = [...getList];
      let id = bookDetails[index].id;
      axios.delete('http://localhost:3000/library/'+id).then((response)=>{
       bookDetails.splice(index,1);
       setList(bookDetails);
      }).catch(()=>{

      })
     // sessionStorage.setItem('expenseDetails',JSON.stringify(expenseDetails));
    }
    //edit table item
    const onEditHandler=(index)=>{
      setBook({
        bookName:getList[index].bookName,
        bookId:getList[index].bookId,
        bookTitle:getList[index].bookTitle,
        bookDesc:getList[index].bookDesc,
        authorName:getList[index].authorName,
        noBooks:getList[index].noBooks        
      })
      setIndex(index);
     }
   //search data in the table
     const searchFilter=(event)=>{
      event.preventDefault();
      let details = getList.filter((obj)=>{
        return obj.bookTitle === getSearch; 
      })
      setList(details);
    }

     //reset search field
    const resetFilter=(event)=>{
      axios.get('http://localhost:3000/library').then((response)=>{
        console.log(response.data)
        setList(response.data);
    }).catch((error)=>{
      console.log(error);
    })
    }

 
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
                        <input type="text" value={getSearch} onChange={onChangeSearchHandler}  name="searchBookName" class="form-control" id="booktitle" style={{width: 500}}/>
                      </div>
                    </div>                           
                      <button type="submit"  onClick={searchFilter} class="btn btn-warning subbutton" style={{marginLeft: 200}}>Search</button>
                      <button onClick={resetFilter} class="btn btn-warning subbutton">Reset</button>
                      
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
                            {getList.map((obj,index)=>{
                            return(<tr key={index}>                          
                            <td>{obj.bookId}</td>
                            <td>{obj.bookTitle}</td>
                            <td>{obj.bookDesc}</td>
                            <td>{obj.authorName}</td>
                            <td>{obj.noBooks}</td>
                            <td><i  onClick={()=>onEditHandler(index)} data-toggle="modal" data-target="#edit" className="fa fa-pencil-square-o" aria-hidden="true"></i></td>
                            <td><i  onClick={()=>onDeleteHandler(index)} className="fa fa-trash" aria-hidden="true"></i></td>
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
                          <input type="text"  value={getBook.bookId} onChange={onChangeHandler} name="bookId" className="form-control" id="bookId"  placeholder="Enter book ID"/>
                        </div>
                        <div className="form-group">
                          <label>Book Name</label>
                          <input  value={getBook.bookTitle} onChange={onChangeHandler} type="text" name="bookTitle" className="form-control" id="bookTitle"  placeholder="Enter book Title"/>
                        </div>
                        
                      <div className="form-group">
                        <label>Book bookDesc</label>
                        <input value={getBook.bookDesc} onChange={onChangeHandler} type="text" name="bookDesc" className="form-control" id="bookDesc" placeholder="Enter bookDesc"/>
                      
                      </div>
                      <div className="form-group">
                        <label>Author Name</label>
                        <input value={getBook.authorName} onChange={onChangeHandler} type="text"  name="authorName" className="form-control" id="authorName" placeholder="enter author name"/>
                      </div>
                      <div className="form-group">
                        <label>No. of Books available</label>
                        <input value={getBook.noBooks} onChange={onChangeHandler} type="text"  name="noBooks" className="form-control" id="noBooks" placeholder="enter no. of books available"/>
                      </div>
                  
                      <button data-dismiss="modal" onClick={onEditSubmitHandler} type="submit" className="btn btn-success">ADD</button>
                    </form>
        </div>
       
      </div>
    </div>
  </div>




    </div>);
}

export default AdminSearch;