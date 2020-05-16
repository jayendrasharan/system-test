import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';


import './style.css';
import { globalSearch } from '../../store/Action';


const Header = props =>{
  const { searchEve } = props;
  const inputEl = useRef(null);

  const handleChange = e =>{
    searchEve(e.target.value)
  }

  useEffect(()=>{
    document.onkeyup = function(e){
      if(e.ctrlKey && e.shiftKey && e.which == 70){
        inputEl.current.focus();
      }
    }
  },[]);

  return (
    <div className='row mx-0 header'>
      <h2 className='col-sm-8 text-left'>Todo  Application</h2>
      <div className='col-sm-4 searchText'>
        <input ref={inputEl} type='text' className='p-1 w-75' placeholder='Enter text to search' onChange={(e) => handleChange(e)}/><br/>
        
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch =>({
  searchEve: search => dispatch(globalSearch({search: search.toLowerCase()})) 
});

export default connect(null, mapDispatchToProps)(Header);