import './Addbook.css';
import {Link,useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {bookIdValidation,bookTitleValidation,bookDescValidation,authorNameValidation,noBooksValidation}  from '../Validation';
import axios from 'axios';

function Addbook(){

  const[getBook,setBook]=useState({
    bookId:'',
    bookTitle:'',
    bookDesc:'',
    authorName:'',
    noBooks:''
  });

  const[getValidation,setValidation]=useState({
    bookId:'',
    bookTitle:'',
    bookDesc:'',
    authorName:'',
    noBooks:''
  });

  const navigate = useNavigate();


  const onChangeHandler=(event)=>{
    setBook({
      ...getBook,[event.target.name]:event.target.value
    })
  }
  
  const onAddHandler=(event)=>{
    event.preventDefault();
    setValidation({
      ...getValidation,bookid:!bookIdValidation(getBook.bookId)?"please provide BookId":'',
      bookTitle:!bookTitleValidation(getBook.bookTitle)?"Please provide BookTitle":'',
      bookDesc:!bookDescValidation(getBook.bookDesc)?"Please provide BookDescription":'',
      authorName:!authorNameValidation(getBook.authorName)?"Please provide AuthorName":'',
      noBooks:!noBooksValidation(getBook.noBooks)?"Please provide NumberofBooks":''
    });
   
      if(getBook.bookId && getBook.bookTitle && getBook.bookDesc && getBook.authorName && getBook.noBooks){
          axios.post('http://localhost:3000/library',{
            bookId:getBook.bookId,  
            bookTitle:getBook.bookTitle,
            bookDesc:getBook.bookDesc,
            authorName:getBook.authorName,
            noBooks:getBook.noBooks
          }).then(()=>{
            navigate('/AdminSearch');
          }).catch(()=>{
             alert("error");
          })
     
    }
    else{
      alert("Please add some data");
    }
  }


    return(<div>
        
        <div className="container">
            <div className="row">
            
              <div className="col-12">
                  <form>       
                    <div><label><h1>Add Book</h1></label></div> 
                   
                    <div className="form-group row">   
                    <table className="addbook_table">
                      <tbody>
                      <tr>
                        <td><label >Book ID:</label></td>
                        <td><input type="text" onChange={onChangeHandler} className="form-control" value={getBook.bookId} id="bookId" name="bookId"/></td>
                      </tr>
                      <tr>
                        <td><label >Book Title:</label>  </td>
                        <td><input type="text" onChange={onChangeHandler} className="form-control " value={getBook.bookTitle} id="bookTitle" name="bookTitle" /></td>
                      </tr>
                      <tr>
                        <td><label >Book Desc:</label></td>
                        <td><input type="text" onChange={onChangeHandler} className="form-control" value={getBook.bookDesc} id="bookDesc" name="bookDesc" /></td>
                      </tr>
                      <tr>
                        <td><label >Author Name:</label> </td>
                        <td><input type="text" onChange={onChangeHandler} className="form-control" value={getBook.authorName} id="authorName" name="authorName" /></td>
                      </tr>
                      <tr>
                        <td><label>Number of Book Available:</label>  </td>
                        <td><input type="text" onChange={onChangeHandler} width={20} className="form-control" value={getBook.noBooks}  id="noBooks" name="noBooks"  /></td>
                      </tr>
                      </tbody>
                    </table>                                                            
                       
                    </div>
                                                                 
                      <button type="submit" onClick={onAddHandler} className="btn btn-warning ab-subbtn" >Add Book</button>
                    </form>
              </div>
              
                            
            </div>
   
        </div>
    </div>)
}

export default Addbook;
