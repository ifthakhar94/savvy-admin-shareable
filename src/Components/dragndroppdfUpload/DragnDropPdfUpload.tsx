import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiPlusSquare } from "react-icons/fi";
import { BiImage } from "react-icons/bi";
import {
  allImageSize,
  allImageSizeText,
  acceptedPdfFileType
} from "../../assets/static/static";

type getDragDropType = {
  setImageFile: (file: any, type?: string) => void;
  noTitle?: boolean;
  title?: string;
  link?: string;
  fileName?: string;
  radioBtn?: boolean;
  error?: boolean;
};
export default function DragnDropPdfUpload({
  setImageFile,
  title,
  link,
  fileName,
  radioBtn,
  error
}: getDragDropType) {
  const [pdf, setPdf] = useState<any>();
  const onDrop = useCallback((acceptedFiles: any) => {
    var reader = new FileReader();
    reader.onload = function () {
      var dataURL = reader.result;
      setImageFile(acceptedFiles[0], acceptedFiles[0].type);
    };
    reader.readAsArrayBuffer(acceptedFiles[0]);
    setPdf(
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0])
      })
    );
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const checkFileTypeValidation = () => {
    if (pdf)
      return acceptedPdfFileType.includes(
        pdf?.type.slice(pdf?.type.lastIndexOf("/") + 1, pdf?.type.length)
      );
    return true;
  };
  return (
    <div>
      {title && (
        <div className="image-label-container mb-1">
          <div className="image-label-container-title d-flex flex-row justify-between align-items-center">
            <div className="image-label-title-left">
              <span className="fs-12 color-dark">{title}</span>
              <span className="asterisk">&#42;</span>
            </div>

            <span
              className={`fs-10 ${
                checkFileTypeValidation() ? "color-light-dark" : "color-red"
              }`}
            >
              ※PDF
            </span>
          </div>
          <span
            className={`fs-10 ml-10 ${
              pdf !== null && pdf?.size > allImageSize
                ? "color-red"
                : "color-light-dark"
            }`}
          >
            10MB or less
          </span>
        </div>
      )}
      <div className="d-flex flex-row drag-drop-image-container">
        {radioBtn && (
          <div>
            <label className="drag-drop-radio-btn-container">
              <input type="radio" name="radio" />
              <span className="checkmark"></span>
            </label>
          </div>
        )}
        <div className="drag-drop-image-wrapper">
          <div
            className="d-flex flex-column justify-content-flex-start"
            {...getRootProps()}
          >
            <input {...getInputProps()} accept=".pdf" />
            <div className="d-flex flex-row mb-2 color-blue h-45">
              <p
                className={`d-flex justify-content-center align-items-center min-width-200 h-45 fw-500 ${
                  error && !pdf && !link
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
              <span className="fs-12 color-dark width-200 ml-20 mt-10">
                {typeof fileName === "string" &&
                fileName !== "null" &&
                fileName !== "undefined"
                  ? fileName
                  : pdf
                  ? pdf.name
                  : " "}
              </span>
            </div>
          </div>
          {/* <div className="mb-4 h-133">
            <div className="min-h-133 color-white position-relative width-200 bg-mid-gray h-100-pt z-index-0 fs-60">
              <span className="image-preview-area-inside-icon">
                <BiImage />
              </span>
              {(pdf != null && (
                <img
                  className="image-preview"
                  src={URL.createObjectURL(pdf)}
                  alt={pdf.name}
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
          </div> */}
        </div>
      </div>
    </div>
  );
}
