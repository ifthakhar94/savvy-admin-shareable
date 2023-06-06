import React, { useState, useEffect } from "react";
import Layout from "../../../Layout/Index";
import { useCallbackPrompt } from "../../../hooks/useCallbackPrompt";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Components/loader/Loader";
import ModalBox from "../../../Components/modal/ModalBox";
import {
  completeContents,
  publicContents,
  publishedContents
} from "../../../Components/modal/modalContents";
import DialogBox from "../../../Components/modal/DialogBox";
import P2ImageSelection from "../p2_image_selection/P2ImageSelection";
import P1WordSelection from "../p1_word_selection/P1WordSelection";
import P3WordSorting from "../P3_word_sorting/P3WordSorting";
import P6TextCreation from "../p6_text_creation/P6TextCreation";
import P4Newspaper from "../p4_newspaper/P4Newspaper";
import P5Conversation from "../p5_conversation/P5Conversation";
import { getStageMapList, getFormateMapList } from "../service/englishquestion";
import {
  p1WordSelection,
  p2ImageSelection,
  p3WordSorting,
  p4Newspaper,
  p5Conversation,
  p6TextCreation,
  p7WordListening,
  p8ImageListening
} from "../../../assets/static/static";
import P7WordListening from "../p7_word_listening/P7WordListening";
import P8ImageListening from "../p8_image_listening/P8ImageListening";
import {
  getFormatListType,
  getStageListType
} from "../../../Services/type/type";

function NewEnglishQuestion() {
  const navigate = useNavigate();

  const [stage, setStage] = useState("");
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [format, setFormat] = useState("");
  const [callApi, setCallApi] = useState("");
  const [showPublicModal, setShowPublicModal] = useState(false); //Modal codes
  const [preview, setPreview] = useState(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);
  const [dataLoaded, setDataLoaded] = useState(true);
  const [stageList, setStageList] = useState([] as getStageListType[]);
  const [formateList, setFormateList] = useState([] as getFormatListType[]);
  const [error, setError] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleSetApiCallDone = () => {
    if (callApi === "Published") handleShow();
    else handleShowCompletedModal();
  };
  const handleClosePublicModal = () => {
    setShowPublicModal(false);
  };
  const handleShowPublicModal = () => {
    setShowPublicModal(true);
  };
  const handleCloseCompletedModal = () => {
    setShowCompleteModal(false);
  };
  const handleShowCompletedModal = () => {
    setShowCompleteModal(true);
  };
  const handlePreviewClose = () => setPreview(false);
  const handlePreviewShow = () => setPreview(true);
  const closeCallApi = () => {
    setCallApi("");
  };
  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormat(e.target.value);
    if (error) setError(false);
  };
  const handleStageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStage(e.target.value);
  };
  async function getQuestionStageList() {
    setDataLoaded(false);
    let [stageList, formateList] = await Promise.all([
      getStageMapList(),
      getFormateMapList()
    ]);
    setStageList(stageList);
    setStage(stageList[0]?.title);
    setFormateList(formateList);
    setFormat(formateList[0]?.uiComponentName);
    setDataLoaded(true);
  }
  useEffect(() => {
    getQuestionStageList();
  }, []);

  return (
    <Layout>
      <React.Fragment>
        <DialogBox
          // @ts-ignore
          showDialog={showPrompt}
          confirmNavigation={confirmNavigation}
          cancelNavigation={cancelNavigation}
        />
        <div className="content-wrapper">
          <div className="back-btn">
            <span className="back-btn" onClick={() => navigate(-1)}>
              &lt; Back
            </span>
          </div>
          <div className="content-inner-wrapper">
            <div className="content-left">
              <div className="mb-4">
                <div className="english-question-selection-input">
                  <label className="mb-1">
                    <span className="fs-12 color-dark">Title</span>{" "}
                    <span className="asterisk">&#42;</span>
                    <span className="fs-10 color-light-dark ms-4">
                      ※This is not displayed in the application.{" "}
                      <span
                        className={`${
                          title?.length > 40 ? `color-red` : `color-light-dark`
                        } fs-10  ms-1 ml-10`}
                      >
                        ※Up to 40 characters.
                      </span>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter title"
                    name="title"
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setTitle(e.target.value);
                      setShowDialog(true);
                    }}
                    // style={{}}
                    className={`${
                      error &&
                      callApi !== "Deleted" &&
                      (title?.length === 0 || title?.length > 40) &&
                      "border-red "
                    } title-input`}
                  />
                  <div className="d-flex flex-row">
                    <div className="select-input me-4">
                      <div className="mb-1">
                        <span className="color-dark fs-12">Format</span>
                        <span className="asterisk">&#42;</span>
                      </div>
                      <select
                        className="custom-select fs-14 ps-2 color-dark h-35 width-200"
                        onChange={handleFormatChange}
                      >
                        {formateList?.map(
                          (item: getFormatListType, index: number) => (
                            <option key={index} value={item.uiComponentName}>
                              {item.title}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    <div className="select-input">
                      <div className="mb-1">
                        <span className="color-dark fs-12">Stage</span>
                        <span className="asterisk">&#42;</span>
                      </div>
                      <select
                        className="custom-select fs-14 ps-2 color-dark width-200 h-35"
                        value={stage}
                        onChange={handleStageChange}
                      >
                        {stageList?.map(
                          (item: getStageListType, index: number) => (
                            <option key={index} value={item.title}>
                              {item.title}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="english-question-selected-input-section">
                  {format === p1WordSelection && (
                    <P1WordSelection
                      stageList={stageList}
                      sendData={callApi}
                      closeCallApi={closeCallApi}
                      title={title}
                      stage={stage}
                      format={format}
                      handleCloseApiCallDone={handleSetApiCallDone}
                      error={error}
                      handleError={(value: boolean) => setError(value)}
                      handlePreviewClose={handlePreviewClose}
                      preview={preview}
                      setShowDialog={(value: boolean) => setShowDialog(value)}
                    />
                  )}
                  {format === p2ImageSelection && (
                    <P2ImageSelection
                      stageList={stageList}
                      sendData={callApi}
                      closeCallApi={closeCallApi}
                      title={title}
                      stage={stage}
                      format={format}
                      handleCloseApiCallDone={handleSetApiCallDone}
                      preview={preview}
                      handlePreviewClose={handlePreviewClose}
                      error={error}
                      handleError={(value: boolean) => setError(value)}
                      setShowDialog={(value: boolean) => setShowDialog(value)}
                    />
                  )}
                  {format === p3WordSorting && (
                    <P3WordSorting
                      stageList={stageList}
                      sendData={callApi}
                      closeCallApi={closeCallApi}
                      title={title}
                      stage={stage}
                      format={format}
                      handleCloseApiCallDone={handleSetApiCallDone}
                      error={error}
                      handleError={(value: boolean) => setError(value)}
                      handlePreviewClose={handlePreviewClose}
                      preview={preview}
                      setShowDialog={(value: boolean) => setShowDialog(value)}
                    />
                  )}
                  {format === p4Newspaper && (
                    <P4Newspaper
                      stageList={stageList}
                      sendData={callApi}
                      closeCallApi={closeCallApi}
                      title={title}
                      stage={stage}
                      format={format}
                      handleCloseApiCallDone={handleSetApiCallDone}
                      handlePreviewClose={handlePreviewClose}
                      error={error}
                      preview={preview}
                      handleError={(value: boolean) => setError(value)}
                      setShowDialog={(value: boolean) => setShowDialog(value)}
                    />
                  )}

                  {format === p5Conversation && (
                    <P5Conversation
                      stageList={stageList}
                      sendData={callApi}
                      closeCallApi={closeCallApi}
                      title={title}
                      stage={stage}
                      format={format}
                      handleCloseApiCallDone={handleSetApiCallDone}
                      handlePreviewClose={handlePreviewClose}
                      error={error}
                      preview={preview}
                      handleError={(value: boolean) => setError(value)}
                      setShowDialog={(value: boolean) => setShowDialog(value)}
                    />
                  )}

                  {format === p6TextCreation && (
                    <P6TextCreation
                      stageList={stageList}
                      sendData={callApi}
                      closeCallApi={closeCallApi}
                      title={title}
                      stage={stage}
                      format={format}
                      handleCloseApiCallDone={handleSetApiCallDone}
                      handlePreviewClose={handlePreviewClose}
                      error={error}
                      handleError={(value: boolean) => setError(value)}
                      preview={preview}
                      setShowDialog={(value: boolean) => setShowDialog(value)}
                    />
                  )}
                  {format === p7WordListening && (
                    <P7WordListening
                      stageList={stageList}
                      sendData={callApi}
                      closeCallApi={closeCallApi}
                      title={title}
                      stage={stage}
                      format={format}
                      handleCloseApiCallDone={handleSetApiCallDone}
                      handlePreviewClose={handlePreviewClose}
                      error={error}
                      handleError={(value: boolean) => setError(value)}
                      preview={preview}
                      setShowDialog={(value: boolean) => setShowDialog(value)}
                    />
                  )}
                  {format === p8ImageListening && (
                    <P8ImageListening
                      stageList={stageList}
                      sendData={callApi}
                      closeCallApi={closeCallApi}
                      title={title}
                      stage={stage}
                      format={format}
                      handleCloseApiCallDone={handleSetApiCallDone}
                      handlePreviewClose={handlePreviewClose}
                      error={error}
                      handleError={(value: boolean) => setError(value)}
                      preview={preview}
                      setShowDialog={(value: boolean) => setShowDialog(value)}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="content-right">
              <div className="status-display d-flex justify-between align-middle flex-row">
                <div className="fs-12">Status</div>
                <div className="status-value">New</div>
              </div>
              <div className="status-control-btn d-flex flex-column justify-between">
                <div className="d-flex flex-row justify-between mb-20">
                  <div
                    className="fs-12 draft-button"
                    onClick={() => {
                      setCallApi("Draft");
                    }}
                  >
                    Draft
                  </div>
                  <div
                    className="fs-12 publish-button"
                    onClick={() => {
                      handleShowPublicModal();
                    }}
                  >
                    Publish
                  </div>
                </div>
                <div className="d-flex flex-row justify-between">
                  {" "}
                  <div
                    className="preview-button fs-12"
                    onClick={handlePreviewShow}
                  >
                    Preview
                  </div>
                  <div className="bg-mid-gray cursor-default delete-button fs-12">
                    Delete
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showPublicModal && (
          <ModalBox
            show={showPublicModal}
            handleActionNClose={() => {
              setCallApi("Published");
              handleClosePublicModal();
            }}
            handleClose={() => {
              handleClosePublicModal();
            }}
            modalHeader={publicContents.modalHead}
            modalText={publicContents.modalText}
            firstBtnText={publicContents.firstBtnText}
            secondBtnText={publicContents.secondBtnText}
          />
        )}
        {show && (
          <ModalBox
            show={show}
            handleClose={() => {
              navigate("/english-question");
              handleClose();
            }}
            modalHeader={publishedContents.modalHead}
            modalText={publishedContents.modalText}
            secondBtnText={publishedContents.secondBtnText}
          />
        )}

        {showCompleteModal && (
          <ModalBox
            show={showCompleteModal}
            handleClose={() => {
              navigate("/english-question");
              handleCloseCompletedModal();
            }}
            modalHeader={completeContents.modalHead}
            modalText={completeContents.modalText}
            secondBtnText={completeContents.secondBtnText}
          />
        )}
        {!dataLoaded && <Loader />}
      </React.Fragment>
    </Layout>
  );
}

export default NewEnglishQuestion;
