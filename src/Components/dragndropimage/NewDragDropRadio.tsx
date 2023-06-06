import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiPlusSquare } from "react-icons/fi";
import { BiImage } from "react-icons/bi";
import { allImageSize, allImageSizeText } from "../../assets/static/static";
import { getDragDropType } from "../../../src/Services/type/type";
export default function NewDragDrop({
  setImageFile,
  handleChangeRadionButton,
  title,
  link,
  fileName,
  radioBtn,
  radioValue,
  answer,
  error
}: getDragDropType) {
  const [images, setImages] = useState<any>();
  const onDrop = useCallback((acceptedFiles: any) => {
    var reader = new FileReader();
    reader.onload = function () {
      var dataURL = reader.result;
      setImageFile(acceptedFiles[0], acceptedFiles[0].type);
    };
    reader.readAsArrayBuffer(acceptedFiles[0]);
    setImages(
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0])
      })
    );
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      {title && (
        <div className="image-label-container mb-1">
          <div className="image-label-container-title d-flex flex-row justify-between align-items-center">
            <div className="image-label-title-left">
              <span className="fs-12 color-dark">{title}</span>
              <span className="asterisk">&#42;</span>
            </div>

            <span className="color-light-dark fs-10">※PNG,JPEG</span>
          </div>
          <span
            className={`fs-10 ml-10 ${
              (images !== null && images?.size) > allImageSize
                ? `color-red`
                : `color-light-dark`
            }`}
          >
            {allImageSizeText} or less
          </span>
        </div>
      )}
      <div className="d-flex flex-row drag-drop-image-container">
        {radioBtn && (
          <div>
            <label className="drag-drop-radio-btn-container">
              <input
                type="radio"
                id={radioValue}
                name="radio"
                onChange={handleChangeRadionButton}
                value={radioValue}
                checked={radioValue === answer}
              />
              <span className="checkmark"></span>
            </label>

            {/* <input type="radio" id="image" name="image" value="selected" /> */}
          </div>
        )}
        <div className="drag-drop-image-wrapper">
          <div
            className="d-flex flex-column justify-content-flex-start"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <div className="d-flex flex-row mb-2">
              <p
                className={`fw-500 min-width-200 h-45 color-blue d-flex justify-content-center align-items-center ${
                  error && !images && !link
                    ? "border-1px-dashed-red"
                    : `border-1px-dashed-mid-gray`
                }`}
              >
                <FiPlusSquare />
                <span className="fs-14 ml-10">Drag the data</span>
              </p>
              <button
                type="button"
                className="btn fs-12 bg-blue color-white ml-10 min-width-100 pt-5 pb-5 plr-15"
              >
                Select files
              </button>
              <span className="fs-12 color-dark ml-20 mt-10 width-200">
                {typeof fileName === "string" &&
                fileName !== "null" &&
                fileName !== "undefined"
                  ? fileName
                  : images
                  ? images.name
                  : " "}
              </span>
            </div>
          </div>
          <div className="mb-4 h-133">
            <div className="min-h-133 color-white position-relative width-200 bg-mid-gray h-100-pt z-index-0 fs-60">
              <span className="image-preview-area-inside-icon">
                <BiImage />
              </span>
              {(images != null && (
                <img
                  className="image-preview"
                  src={URL.createObjectURL(images)}
                  alt={images.name}
                />
              )) ||
                (link && (
                  <img
                    className="image-preview"
                    src={`${link}`}
                    alt={fileName}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
