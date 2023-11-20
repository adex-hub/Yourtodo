/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import Unchecked from "../assets/images/checkcircle.svg";
import Checked from "../assets/images/checked.svg";
import More from "../assets/images/more.svg";

export default function Item({
  item,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  onEditState,
  selectedId,
  onMenuDisplay,
}) {
  const taskRef = useRef(null);
  const [taskWidth, setTaskWidth] = useState(0);
  const [taskHeight, setTaskHeight] = useState(0);

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

  // function handleMenuDisplay(id) {
  //   onSelectedId(id !== selectedId ? id : null);
  // }
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
          onClick={() => onMenuDisplay(item.id)}
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
              onEditState(); //toggles the edit state.
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
