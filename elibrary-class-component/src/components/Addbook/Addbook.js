import './Addbook.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { bookIdValidation, bookTitleValidation, bookDescValidation, authorNameValidation, noBooksValidation } from '../Validation';
import axios from 'axios';
import { Component } from 'react';

class Addbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {
        bookId: '',
        bookTitle: '',
        bookDesc: '',
        authorName: '',
        noBooks: ''
      },
      getValidation: {
        bookId: '',
        bookTitle: '',
        bookDesc: '',
        authorName: '',
        noBooks: ''
      }
    }
  }
  onChangeHandler = (event) => {
    this.setState({
      book: {
        ...this.state.book, [event.target.name]: event.target.value
      }
    })
  }
  onAddHandler = (event) => {
    event.preventDefault();
    this.setState({
      getValidation: {
        bookid: !bookIdValidation(this.state.book.bookId) ? "please provide BookId" : '',
        bookTitle: !bookTitleValidation(this.state.book.bookTitle) ? "Please provide BookTitle" : '',
        bookDesc: !bookDescValidation(this.state.book.bookDesc) ? "Please provide BookDescription" : '',
        authorName: !authorNameValidation(this.state.book.authorName) ? "Please provide AuthorName" : '',
        noBooks: !noBooksValidation(this.state.book.noBooks) ? "Please provide NumberofBooks" : ''
      }
    });
    if (this.state.book.bookId && this.state.book.bookTitle && this.state.book.bookDesc && this.state.book.authorName && this.state.book.noBooks) {
      axios.post('http://localhost:3000/library', {
        bookId: this.state.book.bookId,
        bookTitle: this.state.book.bookTitle,
        bookDesc: this.state.book.bookDesc,
        authorName: this.state.book.authorName,
        noBooks: this.state.book.noBooks
      }).then(() => {
        document.location.href = '/Adminsearchnw';
        //navigate('/Adminsearchnw');
      }).catch(() => {
        alert("error");
      })
      // let bookDetails=[];
      // if(sessionStorage.getItem('bookDetails')){ 
      // let details = JSON.parse(sessionStorage.getItem('bookDetails'));
      // console.log( details);
      // bookDetails.push(...details);
      // bookDetails.push({...this.state.book});
      // sessionStorage.setItem("bookDetails",JSON.stringify(bookDetails));
      // }
      // else{
      // bookDetails.push({...this.state.book});
      // sessionStorage.setItem("bookDetails",JSON.stringify(bookDetails))
      // }
      // document.location.href='/Adminsearchnw';
      // }
      // else{
      // alert("Please add some data");
      // }
    }
  }

    render()
    {
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
                        <td><input type="text" onChange={this.onChangeHandler} className="form-control" id="bookId" name="bookId"/></td>
                      </tr>
                      <tr>
                        <td><label >Book Title:</label>  </td>
                        <td><input type="text" onChange={this.onChangeHandler} className="form-control "  id="bookTitle" name="bookTitle" /></td>
                      </tr>
                      <tr>
                        <td><label >Book Desc:</label></td>
                        <td><input type="text" onChange={this.onChangeHandler} className="form-control"  id="bookDesc" name="bookDesc" /></td>
                      </tr>
                      <tr>
                        <td><label >Author Name:</label> </td>
                        <td><input type="text" onChange={this.onChangeHandler} className="form-control"  id="authorName" name="authorName" /></td>
                      </tr>
                      <tr>
                        <td><label>Number of Book Available:</label>  </td>
                        <td><input type="text" onChange={this.onChangeHandler} width={20} className="form-control"   id="noBooks" name="noBooks"  /></td>
                      </tr>
                      </tbody>
                    </table>                                                            
                       
                    </div>
                                                                 
                      <button type="submit" onClick={this.onAddHandler} className="btn btn-warning ab-subbtn" >Add Book</button>
                    </form>
              </div>
              
                            
            </div>
   
        </div>
    </div>)
}
}
export default Addbook;
