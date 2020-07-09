import React, { useState, useEffect, useCallback } from "react";
import classes from "./styles.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import { connect } from "react-redux";
import {
  sortByColumn,
  loadTodoItems,
  loadCompletedTodoItems,
  loadOpenTodoItems,
  addTodo,
} from "../../store/actions";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Todo from "../Todo";
import { TODO_STATUS } from "../../constants";
import { ReactComponent as EditIcon } from "../../icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../../icons/delete.svg";

const Home = (props) => {
  const {
    columns,
    todoList,
    pendingList,
    completedList,
    activeTab,
    tabs,
    groupByOptions,
    sortColumn,
    fetchTodoItems,
    fetchCompletedTodoItems,
    fetchPendingTodoItems,
    createTodo,
  } = props;
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState(null);
  const onSearchTextChange = (event) => {
    setSearchText(event.target.value, () => {
      searchData(searchText.trim());
    });
  };

  const searchData = (searchString) => {};

  const mapData = (data = []) => {
    return data.map((item, ind) => {
      return (
        <div className={classes.row} key={ind}>
          {columns.map((col) => {
            if (col.key === "actions") {
              return (
                <div
                  className={
                    classes.row_item +
                    " " +
                    classes.item +
                    " " +
                    classes.actions
                  }
                >
                  <EditIcon className={classes.icon} />
                  <DeleteIcon className={classes.icon} />
                  {item.currentState === TODO_STATUS.OPEN && (
                    <button className={classes.btn + " " + classes.primary}>
                      Done
                    </button>
                  )}
                  {item.currentState === TODO_STATUS.COMPLETED && (
                    <button className={classes.btn + " " + classes.primary}>
                      Re-Open
                    </button>
                  )}
                </div>
              );
            }
            return mapItem(item[col.key]);
          })}
        </div>
      );
    });
  };
  const mapItem = (val = "-") => {
    val = val == "" ? "-" : val;
    return <p className={classes.row_item + " " + classes.item}>{val}</p>;
  };

  const getSortIconClass = (item = {}) => {
    if (!item.active) {
      return "fas fa-sort";
    }
    if (item.asc) {
      return "fas fa-sort-up";
    } else {
      return "fas fa-sort-down";
    }
  };
  const getTableHeadings = (columns) => {
    return columns.map((item, ind) => (
      <p
        className={classes.row_item + " " + classes.header}
        key={ind}
        onClick={() => sortColumn(item)}
      >
        {item.title}
        {item.sort ? (
          <i class={getSortIconClass(item) + " " + classes.sort_icon}></i>
        ) : null}
      </p>
    ));
  };

  const onModalCloseHandler = useCallback(() => setShowModal(false), []);

  useEffect(() => {
    fetchTodoItems();
  }, [activeTab]);

  const onCreateTodo = (todo) => {
    createTodo(todo, () => {
      fetchTodoItems();
    });
  };

  const addTodoClickHandler = () => {
    setModal(
      <Modal onClose={onModalCloseHandler}>
        <Todo onCancel={onModalCloseHandler} onSave={onCreateTodo} />
      </Modal>
    );
    setShowModal(true);
  };

  return (
    <div>
      {showModal && modal}
      <div className={classes.Content}>
        <div className={classes.flex}>
          <div className={classes.search}>
            <SearchBar
              searchText={searchText}
              onSearchTextChange={onSearchTextChange}
            />
            <Button onClick={addTodoClickHandler}>Add Todo</Button>
          </div>
          <div className={classes.row_header}>{getTableHeadings(columns)}</div>
          {mapData(todoList)}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    todoList: state.todoList,
    pendingList: state.pendingList,
    completedList: state.completedList,
    tabs: state.tabs,
    activeTab: state.activeTab,
    columns: state.columns,
    groupByOptions: state.groupByOptions,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    sortColumn: (column) => dispatch(sortByColumn(column)),
    fetchTodoItems: () => dispatch(loadTodoItems()),
    fetchCompletedTodoItems: () => dispatch(loadCompletedTodoItems()),
    fetchPendingTodoItems: () => dispatch(loadOpenTodoItems()),
    createTodo: (todo, callback) => dispatch(addTodo(todo, callback)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
