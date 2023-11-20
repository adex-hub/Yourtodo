/* eslint-disable react/prop-types */
import { useState } from "react";
import "./styles/style.scss";
import { useLocalStorageState } from "./useLocalStorageState";
import Indicator from "./components/Indicator";
import TodoList from "./components/TodoList";
import Modal from "./components/Modal";
import Title from "./components/Title";

function App() {
  const [items, setItems] = useLocalStorageState([], "items");
  const [taskInfo, setTaskInfo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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
            <img src="phone.svg" className="illustration" alt="phone" />
            <p className="quote">
              &quot;To win the week, you have to win the day. Create your first
              task to start winning.&quot;
            </p>
            <button className="first-click" onClick={handleToggleModal}>
              Add task
            </button>
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
          </>
        )}
      </main>
    </>
  );
}

export default App;
