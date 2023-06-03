import { MDBCol, MDBRadio, MDBRow } from "mdb-react-ui-kit";
import { Form, FormLabel, InputGroup } from "react-bootstrap";
import classes from "../styles/SideBar.module.css";

export default function NimConfig() {
  return (
    <>
      <InputGroup>
        <InputGroup.Text className="text-white">
          Number of piles
        </InputGroup.Text>
        <Form.Select size="sm" className="bg-dark text-white">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Select>
      </InputGroup>
      <FormLabel className="text-white mt-5">
        Number of stones in each pile
      </FormLabel>
      <Form.Control id="array" className="bg-dark text-white"></Form.Control>
      <Form.Text id="array" className="text-white text-wrap">
        Provide inputs for the initial number of objects in each pile ( Comma
        separated numbers within 1-10)
        <br />
      </Form.Text>
      <MDBRow className="mt-5">
        <MDBCol sm="4">
          <FormLabel className="text-white ">Play as:</FormLabel>
        </MDBCol>
        <MDBCol sm="4">
          <MDBRadio label="1st Player" name="radio" inline />
        </MDBCol>
        <MDBCol sm="4">
          <MDBRadio label="2nd Player" name="radio" inline />
        </MDBCol>
      </MDBRow>
      <button className={`btn ${classes.startButton}`}>Start Game</button>
    </>
  );
}
