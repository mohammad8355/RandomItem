import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [showInput, setShowInput] = useState(null);
  const [text, setText] = useState("");
  const [items, setItems] = useState(() => {
    if (localStorage.getItem("items").length > 0) {
      const data = JSON.parse(localStorage.getItem("items"));
      return data;
    } else {
      return [];
    }
  });
  const [randomItem, setRandomItem] = useState(null);

  const handleOnChange = (e) => {
    setText(e.target.value);
    if (e.target.value) {
      setShowInput("write");
    }
  };
  const RandomItem = () => {
    const randomIndex = Math.floor(Math.random() * items.length);
    setRandomItem(items[randomIndex]);
  };
  useEffect(() => {
    if (text && text.length === "") setShowInput("close");
  }, [text]);
  const handleBtnClick = () => {
    setShowInput((prevShowInput) => {
      if (prevShowInput === "write" && text) {
        setItems((prevItems) => [
          ...prevItems,
          { id: prevItems.length, text: text },
        ]);
        setText("");
        return null;
      } else if (prevShowInput === "write" && text === "") {
        setShowInput("close");
      } else if (prevShowInput === null) {
        return "close";
      } else if (prevShowInput === "close") {
        return null;
      }
      return prevShowInput;
    });
  };
  const handleRandomBtnClick = () => {
    RandomItem();
  };
  const handleDeleteItem = (index) => {
    setItems((prev) => prev.filter((i) => i.id !== index));
  };
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);
  return (
    <div className="container">
      <h2>
        <span className="primary-text">{items.length}</span> Items
      </h2>
      <div className="btn-container">
        <div className="input-container">
          <button onClick={handleBtnClick}>
            {showInput === null ? (
              <i className="fa-solid fa-plus"></i>
            ) : showInput === "write" ? (
              <i className="fa-solid fa-check"></i>
            ) : (
              showInput === "close" && <i className="fa-solid fa-close"></i>
            )}
          </button>
          {showInput !== null && (
            <input value={text} onChange={handleOnChange} />
          )}
        </div>
        <div>
          <button className="randomBtn" onClick={handleRandomBtnClick}>
            <i className="fa-solid fa-rotate-right"></i>
          </button>
        </div>
      </div>
      <div className="item">
        <p>{randomItem ? randomItem.text : "No Item Found"}</p>
      </div>
      <ul className="list">
        {items &&
          items.map((item) => {
            return (
              <li key={item.id} className="list-item">
                {item.text}
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="deleteBtn"
                >
                  <i className="fa-solid fa-close"></i>
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default App;
