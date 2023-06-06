import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import topClockCounter from "../../../assets/image/topClockCounter.png";
import bottomBg from "../../../assets/image/bottom-bg.png";
import rectangle from "../../../assets/image/rectangle.png";
import board from "../../../assets/image/board.png";

type getModalTypes = {
  show: boolean;
  handleClose: () => void;
  modalHeader: string;
  modalBackgroundImage?: string;
  modalQuestionImage?: string | any;
  questionText?: string;
  choiceA?: string;
  choiceB?: string;
  choiceC?: string;
};
function PreviewModalBox({
  show,
  handleClose,
  modalHeader,
  modalBackgroundImage,
  modalQuestionImage,
  questionText,
  choiceA,
  choiceB,
  choiceC
}: getModalTypes) {
  return (
    <Modal show={show} onHide={handleClose}>
      <div className="preview-modal">
        <Modal.Header closeButton>
          <Modal.Title>{modalHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="preview-container d-flex flex-column ">
            <div className="top-header d-flex flex-row align-items-center justify-content-center position-relative">
              <img src={topClockCounter} alt="" />
            </div>
            <div className="question-preview-theme-body">
              <div className="theme-bg-style">
                <img
                  src={modalBackgroundImage}
                  className="theme-bg-style-image"
                  alt=""
                />
                <div className="board board-style">
                  <img src={board} alt="" />
                </div>
                <div className="front-style">
                  <div>
                    <img src={rectangle} alt="" />
                    <span className="question-text-style">{questionText}</span>
                  </div>
                  {modalQuestionImage && (
                    <div>
                      {typeof modalQuestionImage === "string" ? (
                        <img
                          className="front-image-style"
                          src={modalQuestionImage}
                          alt=""
                        />
                      ) : (
                        <img
                          className="front-image-style"
                          src={URL.createObjectURL(modalQuestionImage)}
                          alt=""
                        />
                      )}
                    </div>
                  )}
                </div>
                <div className="theme-bottom-style">
                  <img src={bottomBg} alt="" />
                  <div className="button-container-style">
                    <div className="button-style">{choiceA}</div>
                    <div className="button-style">{choiceB}</div>
                    <div className="button-style">{choiceC}</div>
                  </div>
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

export default PreviewModalBox;
