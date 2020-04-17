/**
 * Created by Rakesh Peela
 * Date: 18-Apr-2020
 * Time: 1:34 AM
 */

import React from 'react';

class SearchFormattedText extends React.Component {
    render() {
        const {value, searchText, isSearchable} = this.props;
        if (!isSearchable) {
            return <span>{value} </span>
        }
        const searchResultIndex = searchText !== "" ? value.toLowerCase().indexOf(searchText.toLowerCase()) : -1;
        if (searchResultIndex > -1) {
            return <span> {value.substring(0, searchResultIndex)}
                <mark>{value.substring(searchResultIndex, searchResultIndex + searchText.length)}</mark>
                {value.substring(searchResultIndex + searchText.length)} </span>
        } else {
            return (
                <span>
                {value}
            </span>
            );
        }
    }
}

export default SearchFormattedText;