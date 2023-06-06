import "../../assets/style/modal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DragnDropCSV from "../dragndropcsv/DragnDropCSV";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useEffect, useState } from "react";
import { axiosCall } from "../../Services/api/axiosCall";
import {
  fetchThemeList,
  fetchExportThemeUrl
} from "../../module/time-trial/service/timeTrialCSV";
import Loader from "../loader/Loader";
type getModalTypes = {
  show: boolean;
  themeSK: string;
  handleClose: () => void;
};
type getThemeListType = {
  SK: string;
  title: string;
  currentStatus: string;
};

function ModalCSV({ show, themeSK, handleClose }: getModalTypes) {
  const [file, setFile] = useState<any>("");
  const [percent, setPercent] = useState(-1);
  const [validationError, setValidationError] = useState(false);
  const [id, setId] = useState<any>();
  const [exportTheme, setExportTheme] = useState("");
  const [error, setError] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(true);
  const [themeList, setThemeList] = useState(
    [] as getThemeListType[] | undefined
  );
  const fileReader = new FileReader();

  const csvFileToArray = (string: any) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const csvArrayData = csvRows.map((i: string) => {
      const values = i.split(",");
      const obj = csvHeader.reduce(
        (object: { [x: string]: any }, header: string , index: any) => {
          object[header.trim()] = values[index];
          return object;
        },
        {}
      );
      return obj;
    });

    return csvArrayData;
    // setArray(csvArrayData);
  };

  const handleOnSubmit = async () => {
    try {
      if (!file) {
        return;
      }
      setPercent(0);
      if (file) {
        fileReader.readAsText(file);
        fileReader.onload = async function (event: any) {
          const text = event.target.result;
          let csvdata = csvFileToArray(text);
          console.log(csvdata)
          // setArray(csvdata)

          const config: any = await csvFileUploadThemeQuestion(
            csvdata,
            themeSK
          );
          const { isAnswer, id } = config;

          if (!isAnswer) {
            setId(id);
            setValidationError(true);
          }

          //fetchQuestionList();
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRetrySubmit = () => {
    setPercent(-1);
    setFile("");
    setValidationError(false);
  };

  useEffect(() => {
    fetchThemeList().then((res) => {
      setThemeList(res);
    });
  }, []);
  const handleChangeExportTheme = (e: any) => {
    if (error) setError(false);
    setExportTheme(e.target.value);
  };
  const handleExportNClose = () => {
    if (!exportTheme) {
      setError(true);
      return;
    }
    setDataLoaded(false);
    fetchExportThemeUrl(exportTheme).then((url) => {
      setDataLoaded(true);
      window.open(url, "_blank");
    });
    handleClose();
  };

  const csvFileUploadThemeQuestion = async (array: any, themeSK: string) => {
    let isSuccess = true;
    let isAnswer = true;
    let id;
    let request_parameters: any;

    for (let index = 0; index < array.length; index++) {
      if (
        !array[index].answer ||
        !array[index].title ||
        !array[index].questionText ||
        !array[index].choiceA ||
        !array[index].choiceB ||
        !array[index].choiceC
      ) {
        isAnswer = false;
        //isSuccess = true;
        id = index + 1;
        return { id, isAnswer };
      }
      if (!array[index].questionSortKey) {
        request_parameters = JSON.stringify({
          query: `mutation CREATE_MONTHLY_TIME_TRIAL_QUESTION{
              createMonthlyTimerTrialQuestion(input:{
                categoryThemeSortKey:"${themeSK}"
                title:"${array[index].title}",
                questionText:"${array[index].questionText}"
                imageData:"${process.env.REACT_APP_SPECIAL_IMAGE_DATA}"
                imageDataFileName:"${process.env.REACT_APP_SPECIAL_IMAGE_DATA_FILE_NAME}"
                choiceA:"${array[index].choiceA}"
                choiceB:"${array[index].choiceB}"
                choiceC:"${array[index].choiceC}"
                answer:${array[index].answer}
                questionStatus: Draft
            }){
                message
            }
                }`,
          variables: {}
        });
      } else {
        request_parameters = JSON.stringify({
          query: `mutation UPDATE_MONTHLY_TIME_TRIAL_QUESTION{
                updateMonthlyTimerTrialQuestion(input:{
                  questionSortKey:"${array[index].questionSortKey}"
                  title:"${array[index].title}",
                  questionText:"${array[index].questionText}"
                  choiceA:"${array[index].choiceA}"
                  choiceB:"${array[index].choiceB}"
                  choiceC:"${array[index].choiceC}"
                  answer:${array[index].answer}
                  questionStatus: Draft
                }){
                message
                      }
                    }`,
          variables: {}
        });
      }
      let result = await axiosCall(request_parameters);
      if (result) {
        setPercent(Math.floor(((index + 1) * 100) / (array.length)));
      } else {
        id = index + 1;
        isAnswer = false;
        return { id, isAnswer };
      }
      id = index + 1;
    }

    return { isSuccess, isAnswer, id };
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
            <Modal.Body className="modalWrapp">
              <div>
                {percent === -1 ? (
                  <DragnDropCSV
                    setFile={(file: any) => {
                      setFile(file);
                      setId(null);
                      setValidationError(false);
                    }}
                  />
                ) : (
                  <div className="modal-csv-progress-bar-container">
                    <h3 className="text-align-left mb-2 color-dark fs-12">
                      {!id ? (
                        <>Upload Now {percent}%</>
                      ) : (
                        <h3 className="text-align-left mb-2 color-dark fs-12">
                          <span className="color-red fs-14 pt-4">
                            Error during import.
                          </span>
                        </h3>
                      )}
                    </h3>
                    <ProgressBar
                      now={percent}
                      label={`${percent}%`}
                      visuallyHidden
                    />
                    {validationError && (
                      <h3 className="text-align-left mb-2 color-dark fs-12">
                        <span className="color-red fs-14 pt-4">
                          Line Number - {id}
                        </span>
                      </h3>
                    )}
                  </div>
                )}
              </div>
            </Modal.Body>

            <Modal.Footer>
              {!validationError && percent === -1 && (
                <Button variant="primary" onClick={handleOnSubmit}>
                  Import
                </Button>
              )}

              {validationError && (
                <Button
                  variant="primary"
                  onClick={(e) => {
                    handleRetrySubmit();
                  }}
                >
                  RETRY
                </Button>
              )}

              {!validationError && percent === -1 && (
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
              )}

              {!validationError && percent === 100 && (
                <Button variant="secondary" onClick={handleClose}>
                  Ok
                </Button>
              )}
            </Modal.Footer>
          </Tab>
          <Tab eventKey="profile" title="EXPORT">
            <div className="d-flex flex-column justify-center align-items-center">
              <Modal.Body className="modalWrapp">
                <div className="w-100 text-align-left">
                  <label className="fs-12 color-dark mb-2 ">Select</label>
                </div>
                <div className="position-relative">
                  <select
                    onChange={handleChangeExportTheme}
                    className={`py-2 ps-3 mb-4 custom-select ${
                      error && "border-red"
                    }`}
                    style={{
                      color: exportTheme ? "inherit" : `transparent`
                    }}
                  >
                    {themeList?.map((i) => (
                      <option
                        className="color-black"
                        value={i.SK}
                        key={JSON.stringify(i)}
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
      {!dataLoaded && <Loader />}
    </Modal>
  );
}

export default ModalCSV;
