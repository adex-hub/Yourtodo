/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import "./style.scss";
import Unchecked from "./assets/images/checkcircle.svg";
import Checked from "./assets/images/checked.svg";
import More from "./assets/images/more.svg";
import { useKey } from "./useKey";

function App() {
  // function handleOpenModal{}
  const [modalVisible, setModalVisible] = useState(false);

  function handleToggleModal() {
    //1. Make modal visible
    setModalVisible((show) => !show);
  }

  return (
    <>
      <Title />
      {modalVisible && <NewTask onToggleModal={handleToggleModal} />}

      <main>
        <TodoList onToggleModal={handleToggleModal} />
        <Indicator />
      </main>
    </>
  );
}

const initialItems = [
  { id: 1, task: "Complete wetin I dey do", done: false },
  { id: 2, task: "Call aunty mhariya", done: false },
  { id: 3, task: "Build some amazing web applications", done: false },
  { id: 4, task: "Call home and find out how everyone is doing", done: false },
  { id: 5, task: "Wash plates", done: true },
  { id: 6, task: "Bake pancakes for my brothers", done: true },
];

function Title() {
  return (
    <header>
      <h1>
        <span contentEditable={true} spellCheck="false">
          ADE
        </span>
        &apos;S TODO
      </h1>
    </header>
  );
}

function Action({ children, onClick }) {
  return (
    <p className="action-btn" onClick={onClick}>
      {children}
    </p>
  );
}

function TodoList({ onToggleModal }) {
  useKey("Escape", onToggleModal); //not too necessary.
  return (
    <>
      <section className="unfinished">
        <Action onClick={onToggleModal}>Add task</Action>

        <ul className="list list-undone">
          {initialItems
            .filter((item) => !item.done)
            .map((item) => (
              <Item item={item} key={item.id} />
            ))}
        </ul>
      </section>

      {initialItems.some((item) => item.done) && (
        <section className="finished">
          <div className="headings">
            <h3 className="title">Completed</h3>
            <Action>Delete All</Action>
          </div>
          <ul className="list list-done">
            {initialItems
              .filter((item) => item.done)
              .map((item) => (
                <Item item={item} key={item.id} />
              ))}
          </ul>
        </section>
      )}
    </>
  );
}

function Item({ item }) {
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

  function handleClick(id) {
    setSelectedId(id !== selectedId ? id : null);
  }

  return (
    <li>
      <div className="task" ref={taskRef}>
        <img
          src={item.done ? Checked : Unchecked}
          alt="check-circle"
          className="check-circle"
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
          onClick={() => handleClick(item.id)}
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
          <p style={{ cursor: "pointer" }}>Edit</p>
          <p style={{ cursor: "pointer" }}>Delete</p>
        </span>
      )}
    </li>
  );
}

function Indicator() {
  return <div className="indicator">2 / 6</div>;
}

function NewTask({ onToggleModal }) {
  const textArea = useRef(null);

  useEffect(() => {
    textArea.current.focus();
  });
  return (
    <div className="form-container hidden" onClick={onToggleModal}>
      <form className="form">
        <textarea
          placeholder="Enter a new task"
          ref={textArea}
          spellCheck="false"
        ></textarea>
        <div className="action-btns">
          <button type="button" onClick={onToggleModal}>
            Cancel
          </button>
          <button type="submit">Add task</button>
        </div>
      </form>
    </div>
    // <div className="overlay"></div>
  );
}

export default App;
