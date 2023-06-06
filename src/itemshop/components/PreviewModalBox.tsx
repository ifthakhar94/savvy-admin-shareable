import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import themebg from "../../assets/image/item-shop/itemShopPreview.png";
import CSS from "csstype";

type getModalTypes = {
  show?: boolean;
  handleClose: () => void;
  modalHeader?: string;
  image?: string | any | null;
  productName?: string;
  prefecture?: string;
};
const themeBgStyle: CSS.Properties = {
  position: "absolute",
  width: "100%",
  left: 0,
  top: 0
};
function PreviewModalBox({
  show,
  handleClose,
  modalHeader,
  image,
  productName,
  prefecture
}: getModalTypes) {
  return (
    <Modal show={show} onHide={handleClose}>
      <div className="preview-modal">
        <Modal.Header closeButton>
          <Modal.Title>{modalHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="preview-container d-flex flex-column ">
            <div className="theme-body">
              <img
                src={themebg}
                className="item-shop-preview-background"
                alt="Item shop preview"
              />
              <div className="item-shop-image-card-holder">
                {typeof image !== "string" ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Item Shop Image"
                    className="item-shop-image"
                  />
                ) : (
                  <img
                    src={image}
                    alt="Item Shop Image"
                    className="item-shop-image"
                  />
                )}
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
