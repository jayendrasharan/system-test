import React, { useState, useEffect } from "react";
import { Fab, Container, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import "./App.css";
import { AddTodoForm, Loader, Header, Todos } from "./components";

const useStyles = makeStyles(theme => ({
  addButton: {
    position: "fixed",
    right: 20,
    bottom: 20
  },
  container: {
    paddingTop: 20,
    paddingBottom: 20
  }
}));

const App = () => {
  const [openAddTodoForm, setOpenAddTodoForm] = useState(false);
  const [actionableTodo, setActionableTodo] = useState(null);
  const [mode, setMode] = useState("add");
  const classes = useStyles();

  const handleCloseTodoForm = close => {
    setActionableTodo(null);
    setOpenAddTodoForm(!close);
    setTimeout(() => {
      setMode("add");
    }, 1000);
  };

  useEffect(() => {
    //On pressing s on document will focus on global search input
    document.onkeyup = function(e) {
      if (e.which === 83) {
        document.querySelector("input[placeholder = 'Search']").focus();
      }
    };
  }, []);

  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="md" className={classes.container}>
        <Todos
          setActionableTodo={setActionableTodo}
          setMode={setMode}
          setOpenAddTodoForm={setOpenAddTodoForm}
          actionableTodo={actionableTodo}
        />
        <AddTodoForm
          isOpen={openAddTodoForm}
          closeModal={handleCloseTodoForm}
          todoData={actionableTodo?.todo || null}
          todoIndex={actionableTodo?.index || null}
          mode={mode}
        />
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => {
            setOpenAddTodoForm(true);
          }}
          className={classes.addButton}
        >
          <AddIcon />
        </Fab>
      </Container>

      <Loader />
    </>
  );
};

export default App;
