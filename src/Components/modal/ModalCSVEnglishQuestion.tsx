import "../../assets/style/modal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DragnDropCSV from "../dragndropcsv/DragnDropCSV";
import { useState } from "react";
import { fetchExportEnglishQuestionUrl } from "../../module/english-question/service/englishQuestionCSV";
import ProgressBar from "react-bootstrap/ProgressBar";
import { csvFileUploadEnglishQuestion } from "../../module/english-question/service/englishQuestionCSV";
import { getFormatListType, getStageListType } from "../../Services/type/type";
type getModalTypes = {
  show: boolean;
  handleClose: () => void;
  stageList: getStageListType[];
  formatList: getFormatListType[];
  fetchEnglishQuestion: () => void;
};
function ModalCSVEnglishQuestion({
  show,
  handleClose,
  stageList,
  formatList,
  fetchEnglishQuestion
}: getModalTypes) {
  const [exportStageSK, setExportStageSK] = useState("");
  const [file, setFile] = useState<any>();
  const [isSubmit, setIsSubmit] = useState(-1);
  const [errorLine, setErrorLine] = useState(0);
  const [error, setError] = useState(false);
  const [exportSubmitError, setExportSubmitError] = useState(false);
  const fileReader = new FileReader();

  const handleChangeExport = (e: any) => {
    if (exportStageSK == "") {
      setExportStageSK("2");
    }
    setExportStageSK(e.target.value);
    setError(false);
    if (exportSubmitError) setExportSubmitError(false);
  };
  const handleExportNClose = () => {
    if (!exportStageSK) {
      setExportSubmitError(true);
      return;
    }
    fetchExportEnglishQuestionUrl(exportStageSK).then((url) => {
      window.open(url, "_blank");
    });
    handleClose();
  };
  const csvFileToArray = (string: any) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const csvArrayData = csvRows.map((i: string) => {
      const values = i.split(",");
      const obj = csvHeader.reduce(
        (object: { [x: string]: any }, header: string, index: any) => {
          object[header.trim()] = values[index];
          return object;
        },
        {}
      );
      // console.log(Object.keys(obj).length);
      console.log(obj.conversation_4_talk_4, obj.conversation_4_talker);
      return obj;
    });

    return csvArrayData;
    // setArray(csvArrayData);
  };
  const csvFileUploadEnglishQuestionAll = async (
    array: any,
    stageSK: string
  ) => {
    for (let index = 0; index < array.length; index++) {
      let result = await csvFileUploadEnglishQuestion(array[index], stageSK);
      if (result) {
        setIsSubmit(Math.floor(((index + 1) * 100) / array.length));
        if (index === array.length - 1) {
           setIsSubmit(100);
        }
      } else {
        setErrorLine(index + 1);
        break;
      }
    }
  };
  const handleOnSubmit = async () => {
    if (!exportStageSK) {
      setError(true);
      return;
    }
    if (file) {
      fileReader.readAsText(file);
      fileReader.onload = async (event: any) => {
        const text = event.target.result;
        let csvdata = csvFileToArray(text);
        console.log(
          csvdata,
          csvdata[0].conversation_4_talk_1,
          csvdata[0].conversation_4_talk_4
        );
        setIsSubmit(0);
        await csvFileUploadEnglishQuestionAll(csvdata, exportStageSK);
      };
    }
  };
  const handleClearAllFields = () => {
    setIsSubmit(-1);
    setErrorLine(0);
    setExportStageSK("");
    setError(false);
    setFile("");
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <div className="modal-csv">
        <Modal.Header closeButton className="modalHeader">
          <Modal.Title>CSV</Modal.Title>
        </Modal.Header>
        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="home" title="IMPORT">
            <Modal.Body className="text-align-left mb-10">
              <div>
                {isSubmit !== -1 ? (
                  <div className="modal-csv-progress-bar-container text-align-left">
                    <h3 className="mb-2 color-dark fs-12">
                      {errorLine === 0 ? (
                        <>Upload Now {isSubmit}%</>
                      ) : (
                        <span className="color-red fs-14">
                          {/* Error on line {errorLine} */}
                          Error during import.
                        </span>
                      )}
                    </h3>
                    <ProgressBar
                      now={isSubmit}
                      label={`${isSubmit}%`}
                      visuallyHidden
                    />
                    <h3 className="mb-2 color-dark fs-12 text-align-left">
                      {errorLine !== 0 && (
                        <span className="text-align-left color-red fs-14 pt-4">
                          Line Number - {errorLine}
                        </span>
                      )}
                    </h3>
                  </div>
                ) : (
                  <div className="modal-select-box text-align-left">
                    <label className="fs-12 color-dark mb-2">Format</label>
                    <div className="position-relative">
                      <select
                        onChange={() => {}}
                        className="py-2 ps-3 mb-4 custom-select width-310 bg-white"
                      >
                        {formatList?.map((i) => (
                          <option
                            value={i.uiComponentName}
                            key={JSON.stringify(i)}
                          >
                            {i.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-100 text-align-left">
                      <label className="fs-12 color-dark mb-2 ">Select</label>
                    </div>
                    <div className="position-relative">
                      <select
                        onChange={handleChangeExport}
                        className={`py-2 ps-3 mb-4 custom-select width-310 bg-white ${
                          error && "border-red"
                        }`}
                        style={{
                          color: exportStageSK ? "inherit" : `gray`
                        }}
                      >
                        {stageList?.map((i) => (
                          <option
                            value={i.SK}
                            key={JSON.stringify(i)}
                            className="color-black"
                          >
                            {i.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <DragnDropCSV
                      setFile={(file: any) => {
                        setFile(file);
                      }}
                    />
                  </div>
                )}
              </div>
            </Modal.Body>

            <Modal.Footer>
              {errorLine !== 0 && (
                <Button variant="primary" onClick={handleClearAllFields}>
                  RETRY
                </Button>
              )}
              {isSubmit === -1 ? (
                <>
                  <Button variant="primary" onClick={handleOnSubmit}>
                    Import
                  </Button>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                </>
              ) : isSubmit === 100 ? (
                <Button
                  variant="secondary"
                  onClick={() => {
                    handleClose();
                    fetchEnglishQuestion();
                  }}
                >
                  Ok
                </Button>
              ) : (
                <></>
              )}
            </Modal.Footer>
          </Tab>
          <Tab eventKey="profile" title="EXPORT">
            <div className="d-flex flex-column justify-center align-items-center">
              <Modal.Body className="modalWrapp">
                <div className="w-100 text-align-left">
                  <label className="fs-12 color-dark mb-2 ">Stage</label>
                </div>
                <div className="position-relative">
                  <select
                    onChange={handleChangeExport}
                    className={`py-2 ps-3 mb-4 custom-select ${
                      exportSubmitError && "border-red"
                    }`}
                    style={{
                      color: exportStageSK ? "inherit" : `transparent`
                    }}
                  >
                    {stageList?.map((i) => (
                      <option
                        value={i.SK}
                        key={JSON.stringify(i)}
                        className="color-black"
                      >
                        {i.title}
                      </option>
                    ))}
                  </select>
                </div>
              </Modal.Body>
            </div>

            <Modal.Footer className="pt-0">
              <Button variant="primary" onClick={handleExportNClose}>
                Export
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </Tab>
        </Tabs>
      </div>
    </Modal>
  );
}

export default ModalCSVEnglishQuestion;
