/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

export default function Modal({
  taskInfo,
  onToggleModal,
  onAddTask,
  onTaskInfo,
  selectedId,
  isEditing,
  onEditState,
  items,
  onItems,
  onMenuDisplay,
}) {
  const inputEl = useRef(null);
  const prevId = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  });

  useEffect(() => {
    prevId.current = selectedId;
  }, [selectedId]);

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

  function handleCancel() {
    onToggleModal();
    onTaskInfo("");
    isEditing ? onEditState() : null;
    selectedId !== null && onMenuDisplay(selectedId);
  }

  function handleConvertTask(e) {
    // This function is to save the task after the task has been edited.
    e.preventDefault();
    const convertedTasks = items.map((item) => {
      if (item.id === selectedId) {
        return { ...item, task: taskInfo };
      }
      return item;
    });
    onItems(convertedTasks);

    onEditState();
    onMenuDisplay(selectedId);
    onTaskInfo("");
    onToggleModal();
  }

  return (
    <>
      <form
        className="form"
        onSubmit={isEditing ? handleConvertTask : handleSubmit}
      >
        <input
          type="text"
          placeholder="Enter a new task"
          ref={inputEl}
          value={taskInfo}
          onChange={(e) => onTaskInfo(e.target.value)}
          spellCheck="false"
        />
        <div className="action-btns">
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit">{isEditing ? "Save" : "Add task"}</button>
        </div>
      </form>
      <div className="overlay" onClick={handleCancel}></div>
    </>
  );
}
