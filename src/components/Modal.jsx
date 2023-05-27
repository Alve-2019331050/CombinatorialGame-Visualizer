import { Button, Modal } from "react-bootstrap";
import classes from "../styles/Modal.module.css";

export default function MyModal(props) {
  return (
    <Modal {...props} size="lg" centered scrollable>
      <Modal.Header>
        <Modal.Title className={classes.title}>
          <p className={classes.p}>Welcome to Combinatorial</p>
          <p className={classes.p}>Game Visualizer !</p>
          <h4 className={classes.h4}>
            Read all the instructions to know about the features of this
            visualizer.
          </h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className={classes.description}>
          1. A combinatorial impartial game is a game in which the allowable
          moves depend only on the position and not on which of the two players
          is currently moving, and where the payoffs are symmetric. In other
          words, the only difference between player 1 and player 2 is that
          player 1 goes first.
        </p>
        <p className={classes.description}>
          2. You can use this visualizer to play some combinatorial games and
          analyze whether you missed a winning chance or not by visualizing any
          possible correct move.
        </p>
        <p className={classes.description}>
          3. To play a particular game, first click on the{" "}
          <b>
            <i>Game</i>
          </b>{" "}
          dropdown menu from the navigation bar and select a game.
        </p>
        <p className={classes.description}>
          4. Then click on the{" "}
          <b>
            <i>Configure</i>
          </b>{" "}
          button from the navigation bar to configure the game.
        </p>
        <p className={classes.description}>
          5. After clicking on configure, a window will open from the right side
          where you will fill/select some value and start the game.
        </p>
        <p className={classes.description}>
          5. If you are unfamiliar with any of the games or want to know the
          rules, just click on the{" "}
          <b>
            <i>Rules</i>
          </b>{" "}
          from navigation bar after selecting a particular game.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button className=".btn" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
