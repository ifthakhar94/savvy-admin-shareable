import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import topBarBackButton from "../../../assets/image/topBarBackButton.png";
import savvybird from "../../../assets/image/savvybird.png";
import bottomBg from "../../../assets/image/btmboard.png";
import grass from "../../../assets/image/grass.png";
import board from "../../../assets/image/board.png";
import { previewLightGreen, midGray } from "../../../assets/style/color";
import questionBar from "../../../assets/image/questionBar.png";
import CSS from "csstype";

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

const themeBgStyle: CSS.Properties = {
  backgroundColor: `${midGray}`,
  position: "absolute",
  width: "100%",
  left: 0,
  top: 0
};
const themeBgStyleImage: CSS.Properties = {
  marginTop: "60px",
  objectFit: "cover",
  width: "100%", // height: auto
  height: "inherit"
};
const frontStyle: CSS.Properties = {
  position: "absolute",
  width: "100%",
  left: "0",
  top: "72px"
};
const frontImageStyle: CSS.Properties = {
  height: "188px",
  width: "290px",
  objectFit: "cover",
  border: "3px solid white",
  borderRadius: "20px",
  backgroundColor: "white"
};
const boardStyle: CSS.Properties = {
  position: "absolute",
  top: "60px",
  left: "20px"
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
          <div className="preview-container bird-back d-flex flex-column position-relative">
            <div className="top-header top-header-p1 d-flex flex-row align-items-center justify-content-center position-relative">
              <img src={topBarBackButton} alt="" className="full-image" />
            </div>
            <div className="theme-body">
              <div style={themeBgStyle} className="modal-preview-body">
                <img
                  src={modalBackgroundImage}
                  style={themeBgStyleImage}
                  alt=""
                />
                <div className="board" style={boardStyle}>
                  <img src={board} alt="" />
                </div>
              </div>
              <div className="p1-savvy-bird">
                <img src={savvybird} alt="background" className="full-image" />
              </div>
              <div style={frontStyle}>
                <div>{/* <img src={rectangle} alt="" /> */}</div>
                {modalQuestionImage && (
                  <div>
                    {typeof modalQuestionImage === "string" ? (
                      <img
                        style={frontImageStyle}
                        src={modalQuestionImage}
                        alt=""
                      />
                    ) : (
                      <img
                        style={frontImageStyle}
                        src={URL.createObjectURL(modalQuestionImage)}
                        alt=""
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="p1-question-box-container">
                <div className="p1-question-box">
                  <img
                    src={questionBar}
                    alt="Question box"
                    className="full-image"
                  />
                  <span className="p1-question-text-style">{questionText}</span>
                </div>
              </div>
              <div className="p1-bottom-board-container">
                <div className="p1-bottom-board">
                  <img
                    src={bottomBg}
                    alt="Bottom-Board"
                    className="full-image"
                  />
                </div>
                <div className="p1-grass">
                  <img src={grass} alt="Grass" className="full-image" />
                </div>
                <div className="p1-button-container-style">
                  <div className="p1-button-style">{choiceA}</div>
                  <div className="p1-button-style">{choiceB}</div>
                  <div className="p1-button-style">{choiceC}</div>
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
