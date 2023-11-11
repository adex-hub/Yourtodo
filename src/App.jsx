/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import "./style.scss";
import Unchecked from "./assets/images/checkcircle.svg";
import Checked from "./assets/images/checked.svg";
import More from "./assets/images/more.svg";
import { useKey } from "./useKey";

function App() {
  const [items, setItems] = useState([]);
  const [taskInfo, setTaskInfo] = useState("");

  function handleAddTask(item) {
    setItems((items) => [...items, item]);
  }
  const [modalVisible, setModalVisible] = useState(false);

  function handleToggleModal() {
    setModalVisible((show) => !show);
  }

  // function handleToggleItem(id) {
  //   initialItems.forEach((item) => {
  //     item.id === id ? { ...item, done: !item.done } : item;
  //     console.log(item.id);
  //   });
  // }

  return (
    <>
      <Title />
      {modalVisible && (
        <AddTask
          onToggleModal={handleToggleModal}
          onAddTask={handleAddTask}
          taskInfo={taskInfo}
          onTaskInfo={setTaskInfo}
        />
      )}

      <main>
        <TodoList
          onToggleModal={handleToggleModal}
          items={items}
          onItems={setItems}
          onTaskInfo={setTaskInfo}
        />
        <Indicator items={items} />
      </main>
    </>
  );
}

// const initialItems = [
//   { id: 1, task: "Complete wetin I dey do", done: false },
//   { id: 2, task: "Call aunty mhariya", done: false },
//   { id: 3, task: "Build some amazing web applications", done: false },
//   { id: 4, task: "Call home and find out how everyone is doing", done: false },
//   { id: 5, task: "Wash plates", done: true },
//   { id: 6, task: "Bake pancakes for my brothers", done: true },
// ];

function Title() {
  return (
    <header>
      <h1>
        <span contentEditable spellCheck="false">
          ADE
        </span>
        &apos;S TODO
      </h1>
    </header>
  );
}

function Action({ children, onClick, items }) {
  const sexyStyling = {
    textAlign: "center",
    color: "#2f2f2f",
    background: "#fbce2f",
    fontWeight: 700,
    padding: ".6rem 0",
    borderRadius: "30px",
    margin: "0 0 1.3rem 0",
  };

  return (
    <p
      className="action-btn"
      style={
        items.every((item) => item.done) && children === "Add task"
          ? sexyStyling
          : null
      }
      onClick={onClick}
    >
      {items.every((item) => item.done) && children === "Add task"
        ? "+ "
        : null}
      {children}
    </p>
  );
}

function TodoList({ onToggleModal, items, onItems, onTaskInfo }) {
  useKey("Escape", onToggleModal); //not too necessary.

  const handleToggleTask = (taskId) => {
    const updatedItems = items.map((item) => {
      if (item.id === taskId) {
        return { ...item, done: !item.done };
      }
      return item;
    });

    onItems(updatedItems);
  };

  function handleDeleteTask(id) {
    onItems(items.filter((item) => item.id !== id));
  }

  function handleDeleteAll() {
    const goneItems = items.filter((item) => !item.done);
    onItems(goneItems);
  }

  function handleEditTask(task) {
    onTaskInfo(task);
    onToggleModal();
  }

  return (
    <>
      <section className="unfinished">
        <Action onClick={onToggleModal} items={items}>
          Add task
        </Action>

        <ul className="list list-undone">
          {items
            .filter((item) => !item.done)
            .map((item) => (
              <Item
                item={item}
                key={item.id}
                onToggleTask={handleToggleTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            ))}
        </ul>
      </section>

      {items.some((item) => item.done) && (
        <section className="finished">
          <div className="headings">
            <h3 className="title">Completed</h3>
            <Action items={items} onClick={handleDeleteAll}>
              Delete All
            </Action>
          </div>
          <ul className="list list-done">
            {items
              .filter((item) => item.done)
              .map((item) => (
                <Item
                  item={item}
                  key={item.id}
                  onToggleTask={handleToggleTask}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                />
              ))}
          </ul>
        </section>
      )}
    </>
  );
}

function Item({ item, onToggleTask, onDeleteTask, onEditTask }) {
  const taskRef = useRef(null);
  const [taskWidth, setTaskWidth] = useState(0);
  const [taskHeight, setTaskHeight] = useState(0);
  const [selectedId, setSelectedId] = useState(null);

  // to calculate task menu position.
  useEffect(function () {
    const taskEl = taskRef.current;
    if (taskEl) {
      setTaskWidth(taskEl.offsetWidth);
      setTaskHeight(taskEl.offsetHeight);
    }

    function handleResize() {
      setTaskWidth(taskEl.offsetWidth);
      setTaskHeight(taskEl.offsetHeight);
    }

    window.addEventListener("resize", handleResize);
    return function () {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleMenuDisplay(id) {
    setSelectedId(id !== selectedId ? id : null);
  }

  return (
    <li>
      <div className="task" ref={taskRef}>
        <img
          src={item.done ? Checked : Unchecked}
          alt="check-circle"
          className="check-circle"
          onClick={() => onToggleTask(item.id)}
        />
        <span
          className="task-description"
          style={
            item.done
              ? { textDecoration: "line-through", color: "#696969" }
              : {}
          }
        >
          {item.task}
        </span>
        <img
          src={More}
          onClick={() => handleMenuDisplay(item.id)}
          className="more-btn"
          alt="more"
        />
      </div>
      {item.id === selectedId && (
        <span
          className="task-menu"
          style={{
            transform: `translateX(${taskWidth + 10}px)`,
            height: `${taskHeight}px`,
          }}
        >
          <p
            style={{ cursor: "pointer" }}
            onClick={() => {
              onEditTask(item.task);
              handleMenuDisplay(item.id);
            }}
          >
            Edit
          </p>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => onDeleteTask(item.id)}
          >
            Delete
          </p>
        </span>
      )}
    </li>
  );
}

function Indicator({ items }) {
  const completed = items.filter((item) => item.done).length;

  return (
    <>
      {items.length > 0 && (
        <div className="indicator">
          {completed} / {items.length}
        </div>
      )}
    </>
  );
}

function AddTask({ taskInfo, onToggleModal, onAddTask, onTaskInfo }) {
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  });

  useEffect(function () {
    const body = document.body;
    const webpageHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;

    if (webpageHeight > viewportHeight) body.style.overflow = "hidden";

    return () => {
      if (webpageHeight > viewportHeight) body.style.overflowY = "scroll";
    };
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (!taskInfo) return;

    const newTask = { id: Date.now(), task: taskInfo, done: false };
    onAddTask(newTask);
    onTaskInfo("");
    onToggleModal();
  }

  // function saveEditedTask(e, taskId) {
  //   e.preventDefault();
  // }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        {" "}
        {/*taskInfo === "" ? handleSubmit : onEdit */}
        <input
          type="text"
          placeholder="Enter a new task"
          ref={inputEl}
          value={taskInfo}
          onChange={(e) => onTaskInfo(e.target.value)}
          spellCheck="false"
        />
        <div className="action-btns">
          <button type="button" onClick={onToggleModal}>
            Cancel
          </button>
          <button type="submit">Add task</button>{" "}
          {/*taskInfo === "" ? Add task : Save  (It wouldn't actually work.)*/}
        </div>
      </form>
      <div className="overlay" onClick={onToggleModal}></div>
    </>
  );
}

export default App;
