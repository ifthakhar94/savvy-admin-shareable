import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import topClockCounter from "../../../assets/image/topBarBackButton.png";
import savvybird from "../../../assets/image/savvybird.png";
import board from "../../../assets/image/p3ModalBoard.png";
import p3bottomBg from "../../../assets/image/bottom-bg.png";
import refresh from "../../../assets/image/refresh.png";
import { midGray } from "../../../assets/style/color";
import CSS from "csstype";
import { useState } from "react";

type getModalTypes = {
  show: boolean;
  handleClose: () => void;
  modalHeader: string;
  backgroundImage?: any;
  image?: any;
  wordA?: string;
  wordB?: string;
  wordC?: string;
  wordD?: string;
  wordE?: string;
  wordF?: string;
  wordG?: string;
  wordH?: string;
  choiceWordOne?: string;
  choiceWordTwo?: string;
  choiceWordThree?: string;
};

function P3PreviewModal({
  show,
  handleClose,
  modalHeader,
  backgroundImage,
  image,
  wordA,
  wordB,
  wordC,
  wordD,
  wordE,
  wordF,
  wordG,
  wordH,
  choiceWordOne,
  choiceWordTwo,
  choiceWordThree
}: getModalTypes) {
  const [choiceWord, setChoiceWord] = useState([
    choiceWordOne,
    choiceWordTwo,
    choiceWordThree
  ]);
  return (
    <Modal show={show} onHide={handleClose}>
      <div className="preview-modal">
        <Modal.Header closeButton>
          <Modal.Title>{modalHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="preview-container bird-back d-flex flex-column position-relative">
            <div className="top-header top-header-p1 d-flex flex-row align-items-center justify-content-center position-relative">
              <img src={topClockCounter} className="full-image" alt="" />
            </div>
            <div className="theme-body">
              <div className="p3-theme-bg-style modal-preview-body">
                <img
                  src={backgroundImage}
                  className="full-image-cover"
                  alt=""
                />
                <div className="board p3-board-style">
                  <img src={board} className="full-image" alt="" />
                </div>
              </div>
              <div className="p1-savvy-bird">
                <img src={savvybird} className="full-image" alt="background" />
              </div>

              <div className="p3-modal-art-container">
                <div className="p3-modal-art">
                  {image && typeof image === "string" ? (
                    <img src={image} alt="" className="full-image" />
                  ) : (
                    image && (
                      <img
                        src={URL.createObjectURL(image)}
                        alt=""
                        className="full-image"
                      />
                    )
                  )}
                  {/* <img src={URL.createObjectURL(image)} alt="modal art" /> */}
                </div>
              </div>

              <div className="word-sorting-questions">
                <div className="sorting-words">
                  {wordA ? (
                    <div>
                      {!isNaN(parseInt(wordA as string)) ? (
                        <div className="sw-common"></div>
                      ) : (
                        <div className="sorting-word-1 fs-18">{wordA}</div>
                      )}{" "}
                    </div>
                  ) : (
                    ""
                  )}

                  {wordB ? (
                    <div>
                      {!isNaN(parseInt(wordB as string)) ? (
                        <div className="sw-common"></div>
                      ) : (
                        <span className="sorting-word-1 fs-18">{wordB}</span>
                      )}{" "}
                    </div>
                  ) : (
                    ""
                  )}

                  {wordC ? (
                    <div>
                      {!isNaN(parseInt(wordC as string)) ? (
                        <div className="sw-common"></div>
                      ) : (
                        <div className="sorting-word-1 fs-18">{wordC}</div>
                      )}{" "}
                    </div>
                  ) : (
                    ""
                  )}

                  {wordD ? (
                    <div>
                      {!isNaN(parseInt(wordD as string)) ? (
                        <div className="sw-common"></div>
                      ) : (
                        <div className="sorting-word-1 fs-18">{wordD}</div>
                      )}{" "}
                    </div>
                  ) : (
                    ""
                  )}

                  {wordE ? (
                    <div>
                      {!isNaN(parseInt(wordE as string)) ? (
                        <div className="sw-common"></div>
                      ) : (
                        <div className="sorting-word-1 fs-18">{wordE}</div>
                      )}{" "}
                    </div>
                  ) : (
                    ""
                  )}

                  {wordF ? (
                    <div>
                      {!isNaN(parseInt(wordF as string)) ? (
                        <div className="sw-common"></div>
                      ) : (
                        <div className="sorting-word-1 fs-18">{wordF}</div>
                      )}{" "}
                    </div>
                  ) : (
                    ""
                  )}

                  {wordG ? (
                    <div>
                      {!isNaN(parseInt(wordG as string)) ? (
                        <div className="sw-common"></div>
                      ) : (
                        <div className="sorting-word-1 fs-18">{wordG}</div>
                      )}{" "}
                    </div>
                  ) : (
                    ""
                  )}

                  {wordH ? (
                    <div>
                      {!isNaN(parseInt(wordH as string)) ? (
                        <div className="sw-common"></div>
                      ) : (
                        <div className="sorting-word-1 fs-18">{wordH}</div>
                      )}{" "}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="sorting-words-reload-btn">
                  <img src={refresh} alt="" className="full-image" />
                </div>
              </div>

              <div className="p3-theme-bottom-style">
                <img src={p3bottomBg} alt="" className="full-image" />
                <div className="choice-bg p3-button-container-style">
                  <div className="preview-rectangle-button-style">
                    {choiceWord[0]}
                  </div>
                  <div className="preview-rectangle-button-style">
                    {choiceWord[1]}
                  </div>
                 {choiceWord[2] &&  <div className="preview-rectangle-button-style">
                    {choiceWord[2]}
                  </div>}
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

export default P3PreviewModal;
