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
  updateTodo,
  deleteTodo,
  markTodoCompleted,
  markTodoOpen,
  selectTodoItem,
  selectAllTodoItems,
} from "../../store/actions";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Todo from "../Todo";
import { TODO_STATUS } from "../../constants";
import { ReactComponent as EditIcon } from "../../icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../../icons/delete.svg";
import ConfirmAlert from "../../components/ConfirmAlert";
import Dropdown from "../../components/Dropdown";
import Checkbox from "../../components/Checkbox";
import { sortDataByColumn } from "./utils";
import Spinner from "../../components/Spinner";

const Home = (props) => {
  const {
    columns,
    todoList,
    pendingList,
    completedList,
    tabs,
    groupByOptions,
    sortColumn,
    fetchTodoItems,
    fetchCompletedTodoItems,
    fetchPendingTodoItems,
    createTodo,
    modifyTodo,
    removeTodo,
    markDone,
    markPending,
  } = props;
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState(null);
  const [groupBy, setGroupBy] = useState("None");
  const [currentTab, setCurrentTab] = useState("ALL");
  const onSearchTextChange = (event) => {
    setSearchText(event.target.value);
    searchData(event.target.value);
  };

  const searchData = (searchString) => {};

  const groupData = (data = [], groupBy) => {
    if (groupBy == "None") {
      return data;
    }
    let groupData = {};
    data.forEach((item) => {
      if (groupData[item[groupBy]]) {
        groupData[item[groupBy]].push(item);
      } else {
        groupData[item[groupBy]] = [item];
      }
    });
    let newData = [];
    for (let key in groupData) {
      newData.push({
        type: "section",
        title: key,
      });
      newData.push(...groupData[key].map((gi) => ({ ...gi, type: "row" })));
    }
    return newData;
  };

  const mapData = (data = []) => {
    return data.map((item, ind) => {
      if (item.type == "section") {
        return (
          <div
            className={
              classes.row_item + " " + classes.item + " " + classes.actions
            }
          >
            <div className={classes.row_item + " " + classes.item}>
              <p>{item.title}</p>
            </div>
          </div>
        );
      }
      return (
        <div
          className={classes.row}
          key={ind}
          onClick={() => onRowClickHandler(item)}
        >
          <Checkbox
            onChange={() => onSelectClickHandler(item)}
            checked={item.selected}
          />
          {columns
            .filter((c) => c.display)
            .map((col) => {
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
                    <EditIcon
                      className={classes.icon}
                      onClick={(e) => {
                        e.stopPropagation();
                        editTodoClickHandler(item);
                      }}
                    />
                    <DeleteIcon
                      className={classes.icon}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteClickHandler(item);
                      }}
                    />
                    {item.currentState === TODO_STATUS.OPEN && (
                      <Button onClick={() => doneClickHandler(item)}>
                        Done
                      </Button>
                    )}
                    {item.currentState === TODO_STATUS.COMPLETED && (
                      <Button onClick={() => reOpenClickHandler(item)}>
                        Re-Open
                      </Button>
                    )}
                  </div>
                );
              }
              return mapItem(item, col);
            })}
          <div
            className={`${classes.todoStatus} ${
              item.currentState == TODO_STATUS.OPEN
                ? classes.pending
                : classes.completed
            }`}
          ></div>
        </div>
      );
    });
  };
  const mapItem = (item, col) => {
    let val = item[col.key] == "" ? "-" : item[col.key];
    if (col.allowSearch) {
      val = val.replace(searchText, `$${searchText}$`).split("$");
      val = val.map((item) => {
        if (item == searchText) {
          return <span style={{ backgroundColor: "yellow" }}>{item}</span>;
        }
        return item;
      });
    }
    return (
      <div className={classes.row_item + " " + classes.item}>
        <p>{val}</p>
      </div>
    );
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
    return columns
      .filter((col) => col.display)
      .map((item, ind) => (
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

  const loadData = () => {
    fetchTodoItems();
  };

  useEffect(() => {
    loadData();
  }, []);

  const onCreateTodo = (todo) => {
    createTodo(todo, () => {
      loadData();
      setShowModal(false);
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

  const onModifyTodo = (todo) => {
    modifyTodo(todo, () => {
      loadData();
      setShowModal(false);
    });
  };

  const doneClickHandler = (todo) => {
    markDone(todo.id, () => {
      loadData();
    });
  };

  const reOpenClickHandler = (todo) => {
    markPending(todo.id, () => {
      loadData(currentTab);
    });
  };

  const editTodoClickHandler = (todo) => {
    setModal(
      <Modal onClose={onModalCloseHandler}>
        <Todo
          onCancel={onModalCloseHandler}
          onSave={onModifyTodo}
          todo={todo}
          mode="update"
        />
      </Modal>
    );
    setShowModal(true);
  };

  const onRowClickHandler = (todo) => {
    setModal(
      <Modal onClose={onModalCloseHandler}>
        <Todo
          onCancel={onModalCloseHandler}
          onSave={onModifyTodo}
          todo={todo}
          mode="view"
        />
      </Modal>
    );
    setShowModal(true);
  };

  const onDeleteTodo = (todo) => {
    removeTodo(todo.id, () => {
      loadData();
      setShowModal(false);
    });
  };

  const onDeleteClickHandler = (todo) => {
    setModal(
      <Modal onClose={onModalCloseHandler}>
        <ConfirmAlert
          heading={todo.title}
          info="Do you want to delete this task?"
          noClick={onModalCloseHandler}
          yesClick={() => {
            onDeleteTodo(todo);
          }}
        />
      </Modal>
    );
    setShowModal(true);
  };

  const onSelectClickHandler = (todo) => {
    props.selectTodoItem(todo);
  };

  const onSelectAllClickHandler = (todo) => {
    props.selectAllTodoItems();
  };

  const getSelectedTodoItems = () => {
    const { todoList } = props;
    return todoList.filter((todo) => todo.selected) || [];
  };

  const bulkDeletedClickHandler = () => {
    const selectedTodoItems = getSelectedTodoItems();
    setModal(
      <Modal onClose={onModalCloseHandler}>
        <ConfirmAlert
          heading={selectedTodoItems.length + " items selected"}
          info="Do you want to delete selected tasks?"
          noClick={onModalCloseHandler}
          yesClick={() => {
            removeTodo(
              selectedTodoItems.map((todo) => todo.id),
              () => {
                loadData();
                setShowModal(false);
              }
            );
          }}
        />
      </Modal>
    );
    setShowModal(true);
  };
  const bulkDoneClickHandler = () => {
    const selectedTodoItems = getSelectedTodoItems();
    markDone(
      selectedTodoItems.map((todo) => todo.id),
      () => {
        loadData();
      }
    );
  };
  const bulkReopenClickHandler = () => {
    const selectedTodoItems = getSelectedTodoItems();
    markPending(
      selectedTodoItems.map((todo) => todo.id),
      () => {
        loadData();
      }
    );
  };

  let dataToBeMapped = [];
  switch (currentTab) {
    case "ALL":
      dataToBeMapped = todoList;
      break;
    case "COMPLETED":
      dataToBeMapped = todoList.filter(
        (todo) => todo.currentState == TODO_STATUS.COMPLETED
      );
      break;
    case "PENDING":
      dataToBeMapped = todoList.filter(
        (todo) => todo.currentState == TODO_STATUS.OPEN
      );
      break;
    default:
      dataToBeMapped = todoList;
  }

  let allChecked = false;
  for (let todo of dataToBeMapped) {
    allChecked = !!todo.selected;
    if (!allChecked) {
      break;
    }
  }
  const selectedRowsCount = (
    dataToBeMapped.filter((todo) => todo.selected) || []
  ).length;
  return (
    <div>
      {showModal && modal}
      {props.loading && <Spinner />}
      <div className={classes.Content}>
        {tabs.map((tab) => (
          <Button onClick={() => setCurrentTab(tab)}>{tab}</Button>
        ))}
        <div className={classes.flex}>
          <div className={classes.search}>
            <SearchBar
              searchText={searchText}
              onSearchTextChange={onSearchTextChange}
            />
            <Button onClick={addTodoClickHandler}>Add Todo</Button>
            <Dropdown
              options={[
                { key: "None", value: "None" },
                ...columns
                  .filter((col) => col.allowGroupBy)
                  .map((col) => ({ value: col.title, key: col.key })),
              ]}
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
            />
          </div>
          {selectedRowsCount > 0 && (
            <div>
              <p>{selectedRowsCount} items selected</p>
              <DeleteIcon
                className={classes.icon}
                onClick={bulkDeletedClickHandler}
              />
              <Button onClick={bulkDoneClickHandler}>Done</Button>
              <Button onClick={bulkReopenClickHandler}>Re-Open</Button>
            </div>
          )}
          <div className={classes.row_header}>
            <Checkbox onChange={onSelectAllClickHandler} checked={allChecked} />
            {getTableHeadings(columns)}
          </div>
          {mapData(
            groupData(
              sortDataByColumn(dataToBeMapped, props.activeSortColumn),
              groupBy
            )
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    todoList: state.todoList,
    tabs: state.tabs,
    columns: state.columns,
    groupByOptions: state.groupByOptions,
    activeSortColumn: state.activeSortColumn,
    loading: state.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    sortColumn: (column) => dispatch(sortByColumn(column)),
    fetchTodoItems: () => dispatch(loadTodoItems()),
    createTodo: (todo, callback) => dispatch(addTodo(todo, callback)),
    modifyTodo: (todo, callback) => dispatch(updateTodo(todo, callback)),
    removeTodo: (id, callback) => dispatch(deleteTodo(id, callback)),
    markDone: (id, callback) => dispatch(markTodoCompleted(id, callback)),
    markPending: (id, callback) => dispatch(markTodoOpen(id, callback)),
    selectTodoItem: (todo) => dispatch(selectTodoItem(todo)),
    selectAllTodoItems: () => dispatch(selectAllTodoItems()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
