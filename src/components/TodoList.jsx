/* eslint-disable react/prop-types */
import Item from "./Item";
import Action from "./Action";
//test 001 - Wow so easy once all tasks are completed

export default function TodoList({
  onToggleModal,
  items,
  onItems,
  onTaskInfo,
  onEditState,
  selectedId,
  onMenuDisplay,
}) {
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
                onEditState={onEditState}
                selectedId={selectedId}
                onMenuDisplay={onMenuDisplay}
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
                  onEditState={onEditState}
                  selectedId={selectedId}
                  onMenuDisplay={onMenuDisplay}
                />
              ))}
          </ul>
        </section>
      )}
    </>
  );
}
