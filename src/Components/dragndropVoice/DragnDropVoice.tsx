import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiPlusSquare } from "react-icons/fi";
import {
  allAudioSize,
  allAudioSizeText,
  acceptedAudioFileType
} from "../../assets/static/static";
type getDragDropType = {
  setVoiceFile: (file: any, type?: string) => void;
  //   title: string;
  link?: string;
  fileName?: string;
  radioBtn?: boolean;
  error?: boolean;
};
export default function DragnDropVoice({
  setVoiceFile,
  //   title,
  link,
  fileName,
  radioBtn,
  error
}: getDragDropType) {
  const [images, setImages] = useState<any>();
  const onDrop = useCallback((acceptedFiles: any) => {
    var reader = new FileReader();
    reader.onload = function () {
      var dataURL = reader.result;
      setVoiceFile(acceptedFiles[0], acceptedFiles[0].type);
    };
    reader.readAsArrayBuffer(acceptedFiles[0]);
    setImages(
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0])
      })
    );
  }, []);
  const checkFileTypeValidation = () => {
    if (images)
      return acceptedAudioFileType.includes(
        images?.type.slice(
          images?.type.lastIndexOf("/") + 1,
          images?.type.length
        )
      );
    return true;
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div>
      <div className="d-flex flex-row drag-drop-image-container">
        {radioBtn && (
          <div>
            <label className="drag-drop-radio-btn-container">
              <input type="radio" name="radio" />
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
            <div className="d-flex flex-row">
              <p
                className={`${
                  error && !images && !link
                    ? "border-1px-dashed-red"
                    : `border-1px-dashed-mid-gray`
                } d-flex justify-content-center align-items-center h-45 color-blue fw-500 min-width-200`}
              >
                <FiPlusSquare />
                <span className="fs-14 ml-10">Dragging data</span>
              </p>
              <button
                type="button"
                className="btn fs-12 min-width-100 ml-10 color-white bg-blue pt-10 pb-10 plr-15"
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
        </div>
      </div>
    </div>
  );
}
