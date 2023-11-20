import { useLocalStorageState } from "../useLocalStorageState";

export default function Title() {
  const [name, setName] = useLocalStorageState("ADE", "yourName");

  function handleNameChange(e) {
    setName(e.target.innerHTML);
  }

  return (
    <header>
      <h1>
        <span
          contentEditable
          dangerouslySetInnerHTML={{ __html: name }}
          onBlur={handleNameChange}
          spellCheck="false"
        />
        &apos;S TODO
      </h1>
    </header>
  );
}
