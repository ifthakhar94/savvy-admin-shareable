import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import topClockCounter from "../../../assets/image/topBarBackButton.png";
import savvybird from "../../../assets/image/savvybird.png";
import board from "../../../assets/image/p5Board.png";
import { previewLightGreen, midGray } from "../../../assets/style/color";
import CSS from "csstype";
import grass from "../../../assets/image/grass.png";
type getConversationRowType = {
  talker: string;
  talk_1: string;
  talk_2: string;
  talk_3: string;
  talk_4: string;
};
type getModalTypes = {
  show: boolean;
  handleClose: () => void;
  modalHeader: string;
  modalBackgroundImage?: string;
  symbolImageFileName?: string | any;
  newsSource?: string;
  newspaperTitle?: string;
  questionText?: string;
  choiceA?: string;
  choiceB?: string;
  choiceC?: string;
  choiceD?: string;
  firstRow?: getConversationRowType;
  secondRow?: getConversationRowType;
  thirdRow?: getConversationRowType;
  fourthRow?: getConversationRowType;
  fifthRow?: getConversationRowType;
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
  left: "20px"
};
function P5ConversationModal({
  show,
  handleClose,
  modalHeader,
  modalBackgroundImage,
  choiceA,
  choiceB,
  choiceC,
  choiceD,
  firstRow,
  secondRow,
  thirdRow,
  fourthRow,
  fifthRow
}: getModalTypes) {
  return (
    <Modal show={show} onHide={handleClose}>
      <div className="preview-modal">
        <Modal.Header closeButton>
          <Modal.Title>{modalHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="preview-container bird-back p5-preview-container d-flex flex-column position-relative">
            <div className="top-header top-header-p1 d-flex flex-Row? align-items-center justify-content-center position-relative">
              <img src={topClockCounter} alt="" className="full-image" />
            </div>
            <div className="theme-body">
              <div style={themeBgStyle} className="modal-preview-body">
                <img
                  src={modalBackgroundImage}
                  style={themeBgStyleImage}
                  alt=""
                  className="full-image-cover"
                />
                <div className="news-board p5-news-board" style={boardStyle}>
                  <img src={board} alt="" className="full-image" />
                </div>
                <div className="news-preview-container p5-con-preview-container">
                  <div className="news-preview">
                    <div className="p5-conversations">
                      {/* Single Conversation    */}
                      <div className="single-conversation">
                        <h3>{firstRow?.talker ? firstRow?.talker : ""} </h3>
                        <p>
                          <span
                            className={
                              firstRow?.talk_1 === "?" ? "has-question" : ""
                            }
                          >
                            {" "}
                            {firstRow?.talk_1 ? firstRow?.talk_1 : ""}{" "}
                          </span>{" "}
                          ​
                          <span
                            className={
                              firstRow?.talk_2 === "?" ? "has-question" : ""
                            }
                          >
                            {" "}
                            {firstRow?.talk_2 ? firstRow?.talk_2 : ""}
                          </span>{" "}
                          ​
                          <span
                            className={
                              firstRow?.talk_3 === "?" ? "has-question" : ""
                            }
                          >
                            {" "}
                            {firstRow?.talk_3 ? firstRow?.talk_3 : ""}{" "}
                          </span>{" "}
                          ​
                          <span
                            className={
                              firstRow?.talk_4 === "?" ? "has-question" : ""
                            }
                          >
                            {" "}
                            {firstRow?.talk_4 ? firstRow?.talk_4 : ""}{" "}
                          </span>{" "}
                          ​
                        </p>
                      </div>

                      {/* Single Conversation    */}
                      <div className="single-conversation">
                        <h3 className="conversation-odd-title">
                          {secondRow?.talker ? secondRow?.talker : ""}{" "}
                        </h3>
                        <p>
                          <span
                            className={
                              secondRow?.talk_1 === "?" ? "has-question" : ""
                            }
                          >
                            {" "}
                            {secondRow?.talk_1 ? secondRow?.talk_1 : ""}{" "}
                          </span>
                          <span
                            className={
                              secondRow?.talk_2 === "?" ? "has-question" : ""
                            }
                          >
                            {" "}
                            {secondRow?.talk_2 ? secondRow?.talk_2 : ""}{" "}
                          </span>{" "}
                          ​
                          <span
                            className={
                              secondRow?.talk_3 === "?" ? "has-question" : ""
                            }
                          >
                            {" "}
                            {secondRow?.talk_3 ? secondRow?.talk_3 : ""}
                          </span>{" "}
                          ​
                          <span
                            className={
                              secondRow?.talk_4 === "?" ? "has-question" : ""
                            }
                          >
                            {" "}
                            {secondRow?.talk_4 ? secondRow?.talk_4 : ""}{" "}
                          </span>{" "}
                          ​ ​
                        </p>
                      </div>

                      {/* Single Conversation    */}
                      <div className="single-conversation">
                        <h3>{thirdRow?.talker ? thirdRow?.talker : ""} </h3>
                        <p>
                          <span
                            className={
                              thirdRow?.talk_1 === "?" ? "has-question" : ""
                            }
                          >
                            {" "}
                            {thirdRow?.talk_1 ? thirdRow?.talk_1 : ""}{" "}
                          </span>{" "}
                          ​
                          <span
                            className={
                              thirdRow?.talk_2 === "?" ? "has-question" : ""
                            }
                          >
                            {" "}
                            {thirdRow?.talk_2 ? thirdRow?.talk_2 : ""}
                          </span>{" "}
                          ​
                          <span
                            className={
                              thirdRow?.talk_3 === "?" ? "has-question" : ""
                            }
                          >
                            {" "}
                            {thirdRow?.talk_3 ? thirdRow?.talk_3 : ""}{" "}
                          </span>{" "}
                          ​
                          <span
                            className={
                              thirdRow?.talk_4 === "?" ? "has-question" : ""
                            }
                          >
                            {" "}
                            {thirdRow?.talk_4 ? thirdRow?.talk_4 : ""}{" "}
                          </span>{" "}
                          ​
                        </p>
                      </div>

                      {/* Single Conversation    */}
                      <div className="single-conversation">
                        <h3 className="conversation-odd-title">
                          {fourthRow?.talker ? fourthRow?.talker : ""}{" "}
                        </h3>
                        <p>
                          <span
                            className={
                              fourthRow?.talk_1 === "?" ? "has-question" : ""
                            }
                          >
                            {" "}
                            {fourthRow?.talk_1 ? fourthRow?.talk_1 : ""}{" "}
                          </span>{" "}
                          ​
                          <span
                            className={
                              fourthRow?.talk_2 === "?" ? "has-question" : ""
                            }
                          >
                            {" "}
                            {fourthRow?.talk_2 ? fourthRow?.talk_2 : ""}
                          </span>{" "}
                          ​
                          <span
                            className={
                              fourthRow?.talk_3 === "?" ? "has-question" : ""
                            }
                          >
                            {" "}
                            {fourthRow?.talk_3 ? fourthRow?.talk_3 : ""}{" "}
                          </span>{" "}
                          ​
                          <span
                            className={
                              fourthRow?.talk_4 === "?" ? "has-question" : ""
                            }
                          >
                            {" "}
                            {fourthRow?.talk_4 ? fourthRow?.talk_4 : ""}{" "}
                          </span>{" "}
                          ​
                        </p>
                      </div>

                      {/* Single Conversation    */}
                      <div className="single-conversation">
                        <h3>{fifthRow?.talker ? fifthRow?.talker : ""} </h3>
                        <p>
                          <span
                            className={
                              fifthRow?.talk_1 === "?" ? "has-question" : ""
                            }
                          >
                            {" "}
                            {fifthRow?.talk_1 ? fifthRow?.talk_1 : ""}{" "}
                          </span>{" "}
                          ​
                          <span
                            className={
                              fifthRow?.talk_2 === "?" ? "has-question" : ""
                            }
                          >
                            {" "}
                            {fifthRow?.talk_2 ? fifthRow?.talk_2 : ""}
                          </span>{" "}
                          ​
                          <span
                            className={
                              fifthRow?.talk_3 === "?" ? "has-question" : ""
                            }
                          >
                            {" "}
                            {fifthRow?.talk_3 ? fifthRow?.talk_3 : ""}{" "}
                          </span>{" "}
                          ​
                          <span
                            className={
                              fifthRow?.talk_4 === "?" ? "has-question" : ""
                            }
                          >
                            {" "}
                            {fifthRow?.talk_4 ? fifthRow?.talk_4 : ""}{" "}
                          </span>{" "}
                          ​
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p1-savvy-bird p5-bird">
                <img src={savvybird} alt="background" className="full-image" />
              </div>

              <div className="p5-preview-modal">
                <div className="p5-preview-modal-options">
                  <div style={buttonStyle}>{choiceA}</div>
                  <div style={buttonStyle}>{choiceB}</div>
                  <div style={buttonStyle}>{choiceC}</div>
                  <div style={buttonStyle}>{choiceD}</div>
                </div>
              </div>
              <div className="p5-grassWrapper">
                <img
                  src={grass}
                  alt="background"
                  className="grassImg full-image"
                />
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

export default P5ConversationModal;
