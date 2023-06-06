import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import p6TopBar from "../../../assets/image/p6TopBar.png";
import savvybird from "../../../assets/image/savvybird.png";
import board from "../../../assets/image/p6Board.png";
import { previewLightGreen, midGray } from "../../../assets/style/color";
import CSS from "csstype";
import p2MiddleBoard from "../../../assets/image/p2MiddleBoard.png";
import p6middle from "../../../assets/image/p6middle.png";
import answer from "../../../assets/image/answer.png";
import refresh from "../../../assets/image/refresh.png";
import btmboard from "../../../assets/image/btmboard.png";
import grass from "../../../assets/image/grass.png";

type getModalTypes = {
  show: boolean;
  handleClose: () => void;
  modalHeader: string;
  modalBackgroundImage?: string;
  questionText?: string;
  choiceA?: string;
  choiceB?: string;
  choiceC?: string;
  choiceD?: string;
  choiceE?: string;
  choiceF?: string;
  choiceG?: string;
  choiceH?: string;
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
  width: "100%",
  height: "100%"
};
const buttonStyle: CSS.Properties = {
  backgroundColor: `${previewLightGreen}`,
  padding: "5px 0",
  minHeight: "35px",
  borderRadius: "8px",
  minWidth: "95px",
  margin: "0 5px",
  borderBottom: "2px solid #2B9306"
};
const boardStyle: CSS.Properties = {
  position: "absolute",
  top: "60px",
  left: "6px",
  width: "107px"
};
function P6PreviewModal({
  show,
  handleClose,
  modalHeader,
  modalBackgroundImage,
  questionText,
  choiceA,
  choiceB,
  choiceC,
  choiceD,
  choiceE,
  choiceF,
  choiceG,
  choiceH
}: getModalTypes) {
  const [word, setWord] = useState([
    choiceA,
    choiceB,
    choiceC,
    choiceD,
    choiceE,
    choiceF,
    choiceG,
    choiceH
  ]);
  const [shuffleWord, setShuffleWord] = useState([]);
  function shuffle(array: any) {
    return array.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    const shufflew = shuffle(word);
    setShuffleWord(shufflew);
  });
  return (
    <Modal show={show} onHide={handleClose}>
      <div className="preview-modal">
        <Modal.Header closeButton>
          <Modal.Title>{modalHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="preview-container p2-preview-container d-flex flex-column position-relative">
            <div className="top-header top-header-p1 d-flex flex-row align-items-center justify-content-center position-relative">
              <img src={p6TopBar} alt="" />
            </div>
            <div className="theme-body">
              <div style={themeBgStyle} className="modal-preview-body">
                {modalBackgroundImage && (
                  <div>
                    {typeof modalBackgroundImage === "string" ? (
                      <img
                        style={themeBgStyleImage}
                        src={modalBackgroundImage}
                        alt=""
                      />
                    ) : (
                      <img
                        style={themeBgStyleImage}
                        src={URL.createObjectURL(modalBackgroundImage)}
                        alt=""
                      />
                    )}
                  </div>
                )}
                <div className="board" style={boardStyle}>
                  <img src={board} alt="" />
                  {/* removed class board image to fit the image as per width from xd */}
                </div>
                <div className="p6-middle-board-container">
                  <div className="p6-middle-board">
                    <img src={p2MiddleBoard} alt="background" />{" "}
                    <div className="p6-preview-text whitespace-nowrap">
                      {questionText}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p1-savvy-bird">
                <img src={savvybird} alt="background" />
              </div>
              <div className="p6-refresh">
                <img src={refresh} alt="background" />
              </div>
              <div className="p6-answer">
                <img src={answer} alt="background" />
              </div>
              <div className="p6-bottom-board-container">
                <div className="p6boardStyle">
                  <img src={p6middle} alt="background" />
                </div>
              </div>
              <div className="bottom-style-container">
                <div>
                  <img src={btmboard} alt="" />
                  <div className="button-wrapper-style">
                    {shuffleWord[0] ? (
                      <div style={buttonStyle}>{shuffleWord[0]}</div>
                    ) : (
                      ""
                    )}
                    {shuffleWord[1] ? (
                      <div style={buttonStyle}>{shuffleWord[1]}</div>
                    ) : (
                      ""
                    )}
                    {shuffleWord[2] ? (
                      <div style={buttonStyle}>{shuffleWord[2]}</div>
                    ) : (
                      ""
                    )}
                    {shuffleWord[3] ? (
                      <div style={buttonStyle}>{shuffleWord[3]}</div>
                    ) : (
                      ""
                    )}
                    {shuffleWord[4] ? (
                      <div style={buttonStyle}>{shuffleWord[4]}</div>
                    ) : (
                      ""
                    )}
                    {shuffleWord[5] ? (
                      <div style={buttonStyle}>{shuffleWord[5]}</div>
                    ) : (
                      ""
                    )}
                    {shuffleWord[6] ? (
                      <div style={buttonStyle}>{shuffleWord[6]}</div>
                    ) : (
                      ""
                    )}
                    {shuffleWord[7] ? (
                      <div style={buttonStyle}>{shuffleWord[7]}</div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <div className="grassWrapper">
                <img src={grass} alt="background" />
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

export default P6PreviewModal;
