import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { searchKeyword,resetSearch } from '../actions/task';

class Search extends React.Component {

    constructor(props){
        super(props);
        this.state = { keyword:'', blank:''}
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange= (e)=>{
        this.setState({keyword:e.target.value})
        this.props.setKeyword(e.target.value);
    }
  
    render(){
        return(
            <div className="formArea">
                <div className="container">
                    <div className="sub">
                        <form method="post" id="searchfrm" name="searchfrm" > 
                        <label> Search Keyword: </label>
                            <input className="customfild" type="text" name="keyword" required placeholder="Keyword*" onChange={this.handleChange} value={this.state.keyword} />
                        </form>
                    </div>
                </div> 
            </div>    
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setKeyword: (data) => {
            dispatch(searchKeyword(data))
        }
    }
}

export default connect(null,mapDispatchToProps)(Search)