/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import Unchecked from "../assets/images/checkcircle.svg";
import Checked from "../assets/images/checked.svg";
import More from "../assets/images/more.svg";
import styles from "./Item.module.css";
import editIcon from "../assets/Edit.svg";
import deleteIcon from "../assets/Delete.svg";

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

  const isMobile = window.innerWidth <= 520 ? true : false;
  console.log(isMobile);

  // to calculate task menu position.
  useEffect(
    function () {
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
    },
    [taskWidth, taskHeight]
  );

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
        <>
          <span
            className="task-menu"
            style={
              !isMobile
                ? {
                    transform: `translateX(${taskWidth + 10}px)`,
                    height: `${taskHeight}px`,
                  }
                : {
                    zIndex: 50,
                    width: "100%",
                    fontSize: "1.25rem",
                    position: "fixed",
                    background: "#2d2d2d",
                    bottom: 0,
                    left: 0,
                    border: 0,
                    // borderColor: "#c6c6c614",
                    height: "144px",
                    borderRadius: "2rem 2rem 0 0",
                  }
            }
          >
            <p
              style={
                isMobile
                  ? {
                      margin: "1rem 0 24px 12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }
                  : {}
              }
              onClick={() => {
                onEditTask(item.task);
                onEditState(); //toggles the edit state.
              }}
            >
              {isMobile && <img src={editIcon} alt="edit-icon" />} Edit
            </p>
            <p
              style={
                isMobile
                  ? {
                      margin: "0 0 0 12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }
                  : {}
              }
              onClick={() => onDeleteTask(item.id)}
            >
              {isMobile && <img src={deleteIcon} alt="delete-icon" />} Delete
            </p>
          </span>
          {isMobile && (
            <div
              className={styles.overlay}
              onClick={() => onMenuDisplay(item.id)}
            ></div>
          )}
        </>
      )}
    </li>
  );
}
