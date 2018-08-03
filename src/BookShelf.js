import React,{Component} from 'react';
import Book from './Book';



class BookShelf extends Component{
    
    render(){
        const {bookshelfName, booksForShelf, onShelfChange} = this.props;
        return(
            <div className="bookshelf">
                  <h2 className="bookshelf-title">{bookshelfName}</h2>                  
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {booksForShelf.map((book)=>(
                        <li key={book.title}>
                        <Book  bookDetails = {book} onShelfChange ={onShelfChange} books={this.props.books}/>                         
                      </li>
                    ))}                                           
                    </ol>                                    
                  </div>    
                            
                </div>
        )
    }
}

export default BookShelf;