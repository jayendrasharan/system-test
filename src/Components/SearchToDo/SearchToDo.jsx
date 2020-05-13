import React, {Component} from 'react';

class SearchToDo extends Component {
    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            id="searchBox"
                            className="form-control"
                            placeholder="Search to-do list"
                            aria-label="search to-do list"
                            onChange={this.props.searchList}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text" id="searchToDo">Search</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default SearchToDo;