import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import savvybird from "../../../assets/image/savvybird.png";
import listenToTheSound from "../../../assets/image/listenToTheSound.png";
import chooseAPhoto from "../../../assets/image/chooseAPhoto.png";
import p2BottomBoard from "../../../assets/image/p2BottomBoard.png";
import topBarBackButton from "../../../assets/image/topBarBackButton.png";
import p2PreviewBackground from "../../../assets/image/p2ee.png";

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
function P8PreviewModal({
  show,
  handleClose,
  modalHeader,
  choiceA,
  choiceB,
  choiceC,
  stageBackground
}: getModalTypes) {
  console.log(choiceA, choiceB, choiceC)
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
                <img src={chooseAPhoto} alt="background" />
              </div>
              <div className="p2-bottom-board">
                <img src={p2BottomBoard} alt="background" />
              </div>
              <div className="p2-savvy-bird">
                <img src={savvybird} alt="background" />
              </div>
              <div className="p2-preview-image-container">
                <div className="p2-preview-image-container-1">
                  {choiceA && (
                    <div>
                      {typeof choiceA === "string" ? (
                        <img src={choiceA} alt="" />
                      ) : (
                        <img src={URL.createObjectURL(choiceA)} alt="" />
                      )}
                    </div>
                  )}
                </div>
                <div className="p2-preview-image-container-2">
                  {choiceB && (
                    <div>
                      {typeof choiceB === "string" ? (
                        <img src={choiceB} alt="" />
                      ) : (
                        <img src={URL.createObjectURL(choiceB)} alt="" />
                      )}
                    </div>
                  )}
                </div>
                <div className="p2-preview-image-container-3">
                  {choiceC && (
                    <div>
                      {typeof choiceC === "string" ? (
                        <img src={choiceC} alt="" />
                      ) : (
                        <img src={URL.createObjectURL(choiceC)} alt="" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="p2-preview-background">
              {/* <img src={stageBackground} alt="background" /> */}
              {/* <img src={p2PreviewBackground} alt="background" />*/}
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

export default P8PreviewModal;
