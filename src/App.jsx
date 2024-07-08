/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./styles/style.scss";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import Indicator from "./components/Indicator";
import TodoList from "./components/TodoList";
import Modal from "./components/Modal";
import Title from "./components/Title";
import ConfettiDisplay from "./components/ConfettiDisplay";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import data from "./data.json";
import NotificationComponent from "./components/NotificationComponent";

function App() {
  const [items, setItems] = useLocalStorageState([], "items");
  const [taskInfo, setTaskInfo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // const randomNum = Math.round(Math.random() * 4);

  useEffect(function () {
    function callback(e) {
      if (e.key === "+") {
        handleToggleModal();
      }
    }

    document.addEventListener("keydown", callback);

    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, []);

  const allTasksCompleted = items.every((item) => item.done);

  useEffect(() => {
    if (allTasksCompleted) {
      const toastId = toast("🥳 You've completed your tasks!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        className: "custom-toast",
      });

      return () => {
        toast.dismiss(toastId);
      };
    }
  }, [allTasksCompleted]);

  function handleAddTask(item) {
    setItems((items) => [...items, item]);
  }
  const [modalVisible, setModalVisible] = useState(false);

  function handleToggleModal() {
    setModalVisible((show) => !show);
  }

  function toggleEditState() {
    setIsEditing((isEditing) => !isEditing);
  }

  function handleMenuDisplay(id) {
    setSelectedId(id !== selectedId ? id : null);
  }

  return (
    <>
      <NotificationComponent items={items} />
      {items.every((item) => item.done) && items.length !== 0 ? (
        <ConfettiDisplay />
      ) : null}
      <Title />
      {modalVisible && (
        <Modal
          onToggleModal={handleToggleModal}
          onAddTask={handleAddTask}
          taskInfo={taskInfo}
          onTaskInfo={setTaskInfo}
          isEditing={isEditing}
          onEditState={toggleEditState}
          selectedId={selectedId}
          onMenuDisplay={handleMenuDisplay}
          items={items}
          onItems={setItems}
        />
      )}

      <main>
        {items.length === 0 ? (
          <div className="initial-screen">
            <img src={data[0].image} className="illustration" alt="phone" />
            <p className="quote">&quot;{data[0].quote}&quot;</p>
            <button className="first-click" onClick={handleToggleModal}>
              Add task
            </button>
            <p
              className="kbd-info"
              style={{ position: "absolute", bottom: 10, opacity: 0.5 }}
            >
              Hit{" "}
              <kbd
                style={{
                  background: "#4d4d4d",
                  padding: "0 .3rem",
                  borderRadius: "3px",
                  textAlign: "center",
                }}
              >
                +
              </kbd>{" "}
              on your keyboard to add a new task
            </p>
          </div>
        ) : (
          <>
            <TodoList
              onToggleModal={handleToggleModal}
              items={items}
              onItems={setItems}
              onTaskInfo={setTaskInfo}
              onEditState={toggleEditState}
              selectedId={selectedId}
              onMenuDisplay={handleMenuDisplay}
            />
            <Indicator items={items} />
            {items.every((item) => item.done) && <ToastContainer />}
          </>
        )}
      </main>
    </>
  );
}

export default App;
