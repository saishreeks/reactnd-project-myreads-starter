import React, { Component } from 'react';
import Book from './Book';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';


class SearchPage extends Component {
 
  constructor(props){
    super(props);
    
  }
  state = {
    query: '',
    showing:'',
    updatedBooks: ''

  }

  onSearch = (event) => {
    event = event.target.value;
    BooksAPI.search(event).then((books) => this.setState({
      query: event,
      showing: books
    },
    () => this.matchTheShelf()
  ))
  }

  

  matchTheShelf =() => {
    const { books } = this.props;
    const booksOnSearch = this.state.showing;
    let updatedShelfBooks;

    if(booksOnSearch && !booksOnSearch.hasOwnProperty("error")){
       updatedShelfBooks = booksOnSearch.map((bookOnSearch) => {
        bookOnSearch.shelf = 'none';      
        books.forEach(book => {
          if(book.title === bookOnSearch.title){
            bookOnSearch.shelf = book.shelf
          }
        });
        return bookOnSearch;
      });
    }

    

    this.setState({
      updatedBooks: updatedShelfBooks
    })


  }

  render() {

    const { query } = this.state;
    

      
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'>Close</Link>          
          <div className="search-books-input-wrapper">
            {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
            <input type="text" placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.onSearch} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">          
          {this.state.updatedBooks && !this.state.updatedBooks.hasOwnProperty("error") && this.state.updatedBooks.map((book) => (
            <li>
            <Book  bookDetails = {book} onShelfChange ={this.props.onShelfChange} books={this.props.books}/>
            </li>
          ))}           
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage;