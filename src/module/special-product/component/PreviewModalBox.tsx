import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import topClockCounter from "../../../assets/image/topClockCounter.png";
import themebg from "../../../assets/image//special-product/specialProductBackground.png";
import board from "../../../assets/image/special-product/specialProductBoard.png";
import { previewGreen } from "../../../assets/style/color";
import CSS from "csstype";

type getModalTypes = {
  show: boolean;
  handleClose: () => void;
  modalHeader: string;
  image: string | any | null;
  productName?: string;
  prefecture?: string;
};
const themeBgStyle: CSS.Properties = {
  position: "absolute",
  width: "100%",
  left: 0,
  top: 0
};
const boardStyle: CSS.Properties = {
  position: "absolute",
  top: "55px",
  left: "20px"
};
const customBox: CSS.Properties = {
  width: "164px",
  position: "absolute",
  left: "30px",
  bottom: "22px",
  borderRadius: "5px"
};
const customText: CSS.Properties = {
  backgroundColor: `${previewGreen}`,
  width: "100%",
  padding: "2px",
  fontSize: "10px",
  color: "#fff",
  borderRadius: "0 0 5px 5px"
};
function PreviewModalBox({
  show,
  handleClose,
  modalHeader,
  image,
  productName,
  prefecture
}: getModalTypes) {
  // console.log(image);
  return (
    <Modal show={show} onHide={handleClose}>
      <div className="preview-modal">
        <Modal.Header closeButton>
          <Modal.Title>{modalHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="preview-container d-flex flex-column ">
            <div className="top-header d-flex flex-row align-items-center justify-content-center">
              <img src={topClockCounter} alt="" />
            </div>
            <div className="theme-body">
              <div style={themeBgStyle}>
                <img src={themebg} alt="" />
                <div className="board" style={boardStyle}>
                  <img src={board} alt="" />
                  <div style={customBox}>
                    <div className="special-product-preview-img-container">
                      {typeof image === "string" ? (
                        <img src={image} alt="" />
                      ) : typeof image === "object" ? (
                        <img src={URL.createObjectURL(image)} alt="" />
                      ) : (
                        <></>
                      )}
                    </div>
                    <div style={customText}>
                      <p>{productName}</p>
                      <p>{prefecture}</p>
                    </div>
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
