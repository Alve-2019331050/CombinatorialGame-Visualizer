import { useState } from "react";
import "../styles/App.css";
import Modal from "./Modal";
import Navbar from "./Navbar";
import NimConfig from "./NimConfig";
import RightSideBar from "./RightSideBar";

function App() {
  const [modalShow, setModalShow] = useState(true);
  const [game, setGame] = useState("Games");
  const [sidebar, setSideBar] = useState(false);

  const handleShow = () => {
    setModalShow(true);
  };

  const handleHide = () => {
    setModalShow(false);
  };

  return (
    <div className="App">
      <Navbar
        game={game}
        handleShow={handleShow}
        setGame={setGame}
        setSideBar={setSideBar}
      ></Navbar>
      <Modal show={modalShow} onHide={() => handleHide()}></Modal>
      {sidebar && (
        <RightSideBar setSideBar={setSideBar}>
          <NimConfig />
        </RightSideBar>
      )}
    </div>
  );
}

export default App;
