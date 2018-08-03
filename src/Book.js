import React, { Component } from 'react';



class Book extends Component {   
    state = {
        optionstate: this.props.bookDetails.shelf
    }

    shelfChange = (event) => {
        this.setState({ optionstate: event.target.value },
           () => this.props.onShelfChange(this.props.bookDetails, this.state.optionstate)
        )        
    }

    render() {
        const { books,bookDetails } = this.props;
        return (
            
            <div className="book">
                <div className="book-top">                                
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookDetails.imageLinks?bookDetails.imageLinks.thumbnail:''})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={this.state.optionstate}
                            onChange={this.shelfChange}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{bookDetails.title}</div>
                <div className="book-authors">{bookDetails.hasOwnProperty('authors') && bookDetails.authors.length>0 ? bookDetails.authors:''}</div>               
            </div>

        )
    }
}

export default Book;