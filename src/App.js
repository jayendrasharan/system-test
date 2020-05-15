import React,{useEffect} from 'react';
import { connect } from 'react-redux';

import { GlobalStyle } from './styled/GlobalStyle';
import Todo from './components/Todo/index';
import { fetchTodos } from './store/Action/index';
import { Data } from './data/todoData';

function App({ dispatch, setData}) {
  
  useEffect(()=>{
    setData(Data);
  },[]);

  return (
    <>
     <GlobalStyle/>
      <Todo/>
    </>
  );
}

const mapDispatchToProps = dispatch => ({
  setData : data => dispatch(fetchTodos(data))
})

export default connect(null, mapDispatchToProps)(App);
