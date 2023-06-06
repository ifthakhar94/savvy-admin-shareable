import "../../assets/style/modal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../assets/style/modal.css";
import { errorContents } from "../../Components/modal/modalContents";
type getModalTypes = {
  showDialog: boolean;
  cancelNavigation: any;
  confirmNavigation: any;
};
function ModalBox({
  showDialog,
  cancelNavigation,
  confirmNavigation
}: getModalTypes) {
  return (
    <Modal show={showDialog}>
      <Modal.Header closeButton>
        <Modal.Title>There is no preservation yet.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        The entered question is not yet saved.
        <br />
        If you move to a different screen,
        <br />
        your input will not be reflected and will be deleted.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={confirmNavigation}>
          Ok
        </Button>

        <Button variant="secondary" onClick={cancelNavigation}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalBox;
