import './Searchbook.css';
import {Link} from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';

function Searchbook(){
  const[getList,setList] = useState([]);
  const[getSearch,setSearch]=useState('');


  const onChangeSearchHandler=(event)=>{
    setSearch(event.target.value);
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
   //search data in the table
   const searchFilter=(event)=>{
    event.preventDefault();
    let details = getList.filter((obj)=>{
      return obj.bookTitle === getSearch; 
    })
    setList(details);
  }

   //reset search field
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
        
        <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                  <form>       
                    <div><label><h1>Search Book</h1></label></div> 
                    <div className="form-group row">
                      <label for="booktitle" className="col-sm-2 col-form-label">Book Title:</label>
                      <div className="col-sm-10">
                        <input type="text" value={getSearch} onChange={onChangeSearchHandler}  name="searchBookName" class="form-control" id="booktitle" style={{width: 250, height:30}} />
                      </div>
                    </div>                           
                      <button type="submit" onClick={searchFilter} className="btn btn-warning subbutton" style={{marginLeft: 200}}>Search</button>
                      <button onClick={resetFilter} class="btn btn-warning subbutton">Reset</button>
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
                            {getList.map((obj,index)=>{
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

export default Searchbook;