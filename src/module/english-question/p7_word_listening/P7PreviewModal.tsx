import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import savvybird from "../../../assets/image/savvybird.png";
import listenToTheSound from "../../../assets/image/listenToTheSound.png";
import chooseAWord from "../../../assets/image/chooseAWord.png";
import wordListeningBottomBoard from "../../../assets/image/wordListeningBottomBoard.png";
import topBarBackButton from "../../../assets/image/topBarBackButton.png";

type getModalTypes = {
  show: boolean;
  handleClose: () => void;
  modalHeader: string;
  modalBackgroundImage?: string;
  modalQuestionImage?: string | any;
  choiceA?: string | any;
  choiceB?: string | any;
  choiceC?: string | any;
  stageBackground?: string;
};
function P7PreviewModal({
  show,
  handleClose,
  modalHeader,
  choiceA,
  choiceB,
  choiceC,
  stageBackground
}: getModalTypes) {
  return (
    <Modal show={show} onHide={handleClose}>
      <div className="preview-modal">
        <Modal.Header closeButton>
          <Modal.Title>{modalHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="preview-container p2-preview-container d-flex flex-column position-relative">
            <div className="p2-preview-top position-relative">
              <img src={topBarBackButton} alt="background" />
            </div>
            <div className="p2-preview-body position-relative">
              <img src={stageBackground} alt="background" />
              <div className="p2-left-board">
                <img src={listenToTheSound} alt="background" />
              </div>
              <div className="p2-middle-board">
                <img src={chooseAWord} alt="background" />
              </div>
              <div className="p7-bottom-board">
                <img src={wordListeningBottomBoard} alt="background" />
              </div>
              <div className="p2-savvy-bird">
                <img src={savvybird} alt="background" />
              </div>
              <div className="p7-option-container-wrapper">
                <div className="p7-option-container">
                <div className="preview-rectangle-button-style">{choiceA}</div>
                <div className="preview-rectangle-button-style">{choiceB}</div>
                <div className="preview-rectangle-button-style">{choiceC}</div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

export default P7PreviewModal;
