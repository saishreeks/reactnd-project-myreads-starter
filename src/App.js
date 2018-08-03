import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage';
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI';
import { Link, Route } from 'react-router-dom';

const bookShelves = ['currentlyReading', 'wantToRead', 'read'];

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          books
        })
      })
  }

  getBooksForShelf = (shelf) => {
    const booksInShelf = [];
    this.state.books.filter((book => {
      if (book && book.shelf === shelf) {
        booksInShelf.push(book)
      }
    }))    
    return booksInShelf;
  }


  onShelfChange = (book, newShelf) => {

    // var temp = this.state.books.map((entry) => {
    //   if (entry.title === book.title) {
    //     book.shelf = newShelf
    //   }
    //   return entry;
    // })
    // this.setState((currstate) => ({
    //   books: temp
    // }))


    BooksAPI.update(book, newShelf)
    .then(() =>  BooksAPI.getAll()
    .then((books) =>{
        this.setState({
            books
        })
    })  )   
  }

  render() {
    return (
      <div className="app">

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {bookShelves.map((shelf) => (
                  <BookShelf key={shelf} bookshelfName={shelf} booksForShelf={this.getBooksForShelf(shelf)}
                    onShelfChange={this.onShelfChange} 
                    books = {this.state.books}/>
                ))}
              </div>              
            </div>

            <div className="open-search">
              <Link to='/search'
                className='book-search'>
                Add a bookmark
            </Link>
            </div>

          </div>

        )}
        />

        <Route path='/search' render={() => (
          <SearchPage books={this.state.books} onShelfChange={this.onShelfChange} />

        )} />
      </div>
    )
  }
}

export default BooksApp


