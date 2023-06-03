import { Modal } from "react-bootstrap";
import classes from "../styles/SideBar.module.css";

export default function RightSideBar({ setSideBar, children }) {
  const handleClose = () => {
    setSideBar(false);
  };

  return (
    <Modal
      show
      size="lg"
      onHide={handleClose}
      dialogClassName={classes.dialog}
      contentClassName={classes.content}
    >
      <Modal.Header closeButton>Game Configuration Section</Modal.Header>
      <Modal.Body className={classes.body}>{children}</Modal.Body>
    </Modal>
  );
}
