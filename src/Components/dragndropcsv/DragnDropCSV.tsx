import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { midGray, blue } from "../../assets/style/color";
import { FiPlusSquare } from "react-icons/fi";

type getDragDropType = {
  setFile: (file: any, type?: string) => void;
};
export default function DragnDropCSV({ setFile }: getDragDropType) {
  const [images, setImages] = useState<any>();
  const onDrop = useCallback((acceptedFiles: any) => {
    var reader = new FileReader();
    reader.onload = function () {
      var dataURL = reader.result;
      setFile(acceptedFiles[0]);
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
    <div className="width-310">
      <div className="mb-1">
        <div className="d-flex flex-row justify-between align-items-center">
          <div className="">
            <span className="fs-12 color-dark">CSV data</span>
            <span className="asterisk">&#42;</span>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column justify-between" {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="d-flex flex-row mb-2 justify-between align-items-center color-blue">
          <p className="border-1px-dashed-mid-gray h-45 d-flex justify-content-center align-items-center width-200">
            <FiPlusSquare />
            <span className="fs-14 ml-10">Dragging Data</span>
          </p>
          <div>
            <button
              type="button"
              className="btn fs-12 ml-10 color-white width-100 bg-blue pt-10 pb-10 plr-15"
            >
              Select File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
