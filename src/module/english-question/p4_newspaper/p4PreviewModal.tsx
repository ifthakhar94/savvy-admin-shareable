import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import savvybird from "../../../assets/image/savvybird.png";
import board from "../../../assets/image/newspaperPreview.png";
import bottomBoard from "../../../assets/image/btmboard.png";
import grass from "../../../assets/image/grass.png";
import QuestionSign from "./../../../assets/image/Q.png";
import topBarBackButton from "../../../assets/image/topBarBackButton.png";
type getModalTypes = {
  show: boolean;
  handleClose: () => void;
  modalHeader: string;
  modalBackgroundImage?: string;
  modalQuestionImage?: string | any;
  newsSource?: string;
  newspaperTitle?: string;
  newspaperDesc?: string;
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
function P4PreviewModal({
  show,
  handleClose,
  modalHeader,
  modalBackgroundImage,
  modalQuestionImage,
  newspaperTitle,
  newspaperDesc,
  newsSource,
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
          <div className="preview-container bird-back p2-preview-container d-flex flex-column position-relative">
            <div className="top-header top-header-p1 d-flex flex-row align-items-center justify-content-center position-relative">
              <div className="p2-preview-top position-relative">
                <img src={topBarBackButton} alt="background" />
              </div>
            </div>
            <div className="theme-body">
              <div className="p4-theme-bg-style modal-preview-body">
                <img
                  src={modalBackgroundImage}
                  className="p4-theme-bg-style-image"
                  alt=""
                />
                <div className="news-board p4-board-style">
                  <img src={board} alt="" />
                </div>
                <div className="news-preview-container">
                  <div className="news-preview">
                    <div className="news-content">
                      <div className="news-content-img">
                        {typeof modalQuestionImage === "string" &&
                        modalQuestionImage ? (
                          <img src={modalQuestionImage} alt="News-Thumbnail" />
                        ) : typeof modalQuestionImage !== "string" &&
                          modalQuestionImage ? (
                          <img
                            src={URL.createObjectURL(modalQuestionImage)}
                            alt="News-Thumbnail"
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="news-excerpt">
                        <h6 className="news-title fs-12"> {newspaperTitle} </h6>
                        <p>{newspaperDesc}</p>
                      </div>
                    </div>
                    <p className="news-source"> 出典：{newsSource} </p>
                  </div>
                </div>
              </div>
              <div className="p1-savvy-bird">
                <img src={savvybird} alt="background" />
              </div>

              <div className="p4-preview-question">
                <div className="question-content">
                  <img src={QuestionSign} alt="question sign" />
                  <h2>{questionText}</h2>
                </div>
              </div>

              <div className="p4-preview-modal-bg-container">
                <div className="p4-preview-modal-bg">
                  <img src={bottomBoard} alt="p4_Newspaper_bottom_board" />
                  <div className="p4-button-style-container">
                    <div className="p4-button-style">{choiceA}</div>
                    <div className="p4-button-style">{choiceB}</div>
                    <div className="p4-button-style">{choiceC}</div>
                  </div>
                </div>
              </div>
              <div className="p5-grassWrapper">
                <img src={grass} alt="background" className="grassImg" />
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

export default P4PreviewModal;
