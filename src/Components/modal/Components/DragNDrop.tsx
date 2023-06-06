import { useCallback, useState } from "react";
import Dropzone from "./Dropzone";
type getDragDropProps = {
  title: string;
  required?: boolean;
};
function DragNDropImage({ title, required }: getDragDropProps) {
  const [images, setImages] = useState([]);
  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.map((file: any) => {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        setImages(e.target.result);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);
  return (
    <div>
      <div className="image-label-container">
        <div className="image-label-container-title d-flex flex-row justify-between align-items-center">
          <div className="image-label-title-left">
            {" "}
            {`${title}`}
            <span className="asterisk">&#42;</span>
          </div>
        </div>
      </div>
      <Dropzone onDrop={onDrop} accept={"image/*"}/>
    </div>
  );
}

export default DragNDropImage;
