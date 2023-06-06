import "../../assets/style/modal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../assets/style/modal.css";
type getModalTypes = {
  show: boolean;
  handleClose: () => void;
  modalHeader: string;
  modalText: string | React.ReactElement;
  handleActionNClose?: () => void;
  firstBtnText?: string;
  secondBtnText?: string;
};
function ModalBox({
  show,
  handleClose,
  modalHeader,
  modalText,
  handleActionNClose,
  firstBtnText,
  secondBtnText
}: getModalTypes) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalHeader}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalText}</Modal.Body>
      <Modal.Footer>
        {firstBtnText !== undefined && (
          <Button variant="primary" onClick={handleActionNClose}>
            {firstBtnText}
          </Button>
        )}
        <Button variant="secondary" onClick={handleClose}>
          {secondBtnText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalBox;
