import { useDropzone } from "react-dropzone";
import { blue, white } from "../../../assets/style/color";

function Dropzone({ onDrop, accept, open }: any) {
  const { getRootProps, getInputProps } = useDropzone({
    accept,
    onDrop
  });

  return (
    <div>
      <div {...getRootProps({ className: "dropzone" })}>
        <input className="input-zone" {...getInputProps()} />
        <div className="dragzone-container">
          <p className="dropzone-content">Dragging Data</p>
          <button
            type="button"
            onClick={open}
            className="btn bg-blue color-white pt-10 pb-10 plr-25"
          >
            Select file
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dropzone;
