import React from "react";
import Layout from "../../../Layout/Index";
import { useCallbackPrompt } from "../../../hooks/useCallbackPrompt";
import { useState, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../Components/loader/Loader";
import ModalBox from "../../../Components/modal/ModalBox";
import {
  completeContents,
  deleteContents,
  publicContents,
  publishedContents
} from "../../../Components/modal/modalContents";
import DialogBox from "../../../Components/modal/DialogBox";
import { getSingleEnglishQuestionInfo } from "../service/englishquestion";
import P1WordSelection from "../p1_word_selection/P1WordSelection";
import P2ImageSelectionEdit from "../p2_image_selection/P2ImageSelectionEdit";
import P3WordSorting from "../P3_word_sorting/P3WordSorting";
import P4Newspaper from "../p4_newspaper/P4Newspaper";
import P5Conversation from "../p5_conversation/P5Conversation";
import P6TextCreation from "../p6_text_creation/P6TextCreation";
import P7WordListening from "../p7_word_listening/P7WordListening";
import P8ImageListening from "../p8_image_listening/P8ImageListening";
import { getStageMapList } from "../service/englishquestion";
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
import { getStageListType } from "../../../Services/type/type";

function EditEnglishQuestion() {
  const navigate = useNavigate();
  let { questionFormat, id }: any = useParams();
  const [show, setShow] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [format, setFormat] = useState("");

  const [dataLoaded, setDataLoaded] = useState(true);
  const [showPublicModal, setShowPublicModal] = useState(false); //Modal codes
  const [preview, setPreview] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [stage, setStage] = useState("");
  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");
  const [callApi, setCallApi] = useState("");
  const [fetchedData, setFetchedData] = useState<any>();
  const [stageList, setStageList] = useState([] as getStageListType[]);

  const getQuestionFormatUiComponentName = (str: string) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace("_", "")
      .replace(/\s+/g, "");
  };
  const fetchSingleEnglishQuestionInfo = async (
    SK: string,
    questionFormat: string
  ) => {
    try {
      setDataLoaded(false);
      const response = await getSingleEnglishQuestionInfo(SK, questionFormat);

      setStage(response?.stageTitle);
      setFetchedData(response);
      setTitle(response?.title);
      // await handleApiError(response?.data);

      setDataLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };
  // api request format & satge list
  async function fetchStageList() {
    setDataLoaded(false);
    let [stageList] = await Promise.all([getStageMapList()]);
    // handleApiError(formateResponse?.data);
    // var resubmit = await handleApiError(response?.data);
    // resubmit = await handleApiError(formateResponse?.data);
    // if (resubmit) getQuestionStageList();
    setStageList(stageList);

    setDataLoaded(true);
  }
  useLayoutEffect(() => {
    fetchStageList(); //Fetching Stagelist to get Background image of stage in preview
    let concatData = decodeURIComponent(id);
    fetchSingleEnglishQuestionInfo(
      concatData,
      getQuestionFormatUiComponentName(questionFormat)
    );
  }, []);

  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const closeCallApi = () => {
    setCallApi("");
  };
  const handleSetApiCallDone = () => {
    if (callApi === "Published") handleShow();
    else handleShowCompletedModal();
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
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
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const handlePreviewClose = () => setPreview(false);
  const handlePreviewShow = () => setPreview(true);

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormat(e.target.value);
  };
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowDialog(true);
    setTitle(e.target.value);
  };

  const handleStageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStage(e.target.value);
  };

  return (
    <Layout>
      <React.Fragment>
        <DialogBox
          // @ts-ignore
          showDialog={showPrompt}
          confirmNavigation={confirmNavigation}
          cancelNavigation={cancelNavigation}
        />{" "}
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
                      ※This is not displayed in the application
                    </span>
                    <span
                      className={`fs-10 ms-1 ml-10 ${
                        title?.length > 40 ? "color-red" : "color-light-dark"
                      }`}
                    >
                      ※Up to 40 characters.
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter title"
                    name="title"
                    value={title}
                    className="title-input"
                    style={{
                      border:
                        (error &&
                          callApi !== "Deleted" &&
                          title?.length === 0) ||
                        (error && callApi !== "Deleted" && title?.length > 40)
                          ? `1px solid red`
                          : ""
                    }}
                    onChange={handleChangeTitle}
                  />
                  <div className="d-flex flex-row flex-wrap-wrap">
                    <div className="select-input me-4">
                      <div className="mb-1">
                        <span className="color-dark fs-12">Format</span>
                        <span className="asterisk">&#42;</span>
                      </div>
                      <select
                        className="custom-select fs-14 ps-2 color-dark width-200 h-35 bg-white"
                        value={format}
                        onChange={handleFormatChange}
                        disabled
                      >
                        <option value="p1_word_selection">
                          {questionFormat}
                        </option>
                      </select>
                    </div>
                    <div className="select-input">
                      <div className="mb-1">
                        <span className="color-dark fs-12">Stage</span>
                        <span className="asterisk">&#42;</span>
                      </div>
                      <select
                        className="custom-select fs-14 ps-2 color-dark width-200 h-35 bg-white"
                        onChange={handleStageChange}
                        value={stage}
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

                {fetchedData && (
                  <div className="english-question-selected-input-section">
                    {getQuestionFormatUiComponentName(questionFormat) ===
                      p1WordSelection && (
                      <P1WordSelection
                        stageList={stageList}
                        sendData={callApi}
                        closeCallApi={closeCallApi}
                        edit={true}
                        title={title}
                        stage={stage}
                        format={format}
                        handleCloseApiCallDone={handleSetApiCallDone}
                        fetchedData={fetchedData}
                        error={error}
                        handleError={(value: boolean) => setError(value)}
                        handlePreviewClose={handlePreviewClose}
                        preview={preview}
                        setShowDialog={(value: boolean) => setShowDialog(value)}
                      />
                    )}
                    {getQuestionFormatUiComponentName(questionFormat) ===
                      p2ImageSelection && (
                      <P2ImageSelectionEdit
                        stageList={stageList}
                        sendData={callApi}
                        closeCallApi={closeCallApi}
                        title={title}
                        stage={stage}
                        format={format}
                        fetchedData={fetchedData}
                        handleCloseApiCallDone={handleSetApiCallDone}
                        preview={preview}
                        handlePreviewClose={handlePreviewClose}
                        error={error}
                        handleError={(value: boolean) => setError(value)}
                        setShowDialog={(value: boolean) => setShowDialog(value)}
                      />
                    )}
                    {getQuestionFormatUiComponentName(questionFormat) ===
                      p3WordSorting && (
                      <P3WordSorting
                        stageList={stageList}
                        sendData={callApi}
                        closeCallApi={closeCallApi}
                        edit={true}
                        title={title}
                        stage={stage}
                        format={format}
                        handleCloseApiCallDone={handleSetApiCallDone}
                        fetchedData={fetchedData}
                        error={error}
                        handleError={(value: boolean) => setError(value)}
                        handlePreviewClose={handlePreviewClose}
                        preview={preview}
                        setShowDialog={(value: boolean) => setShowDialog(value)}
                      />
                    )}
                    {getQuestionFormatUiComponentName(questionFormat) ===
                      p4Newspaper && (
                      <P4Newspaper
                        stageList={stageList}
                        sendData={callApi}
                        closeCallApi={closeCallApi}
                        edit={true}
                        title={title}
                        stage={stage}
                        format={format}
                        handleCloseApiCallDone={handleSetApiCallDone}
                        fetchedData={fetchedData}
                        error={error}
                        handleError={(value: boolean) => setError(value)}
                        handlePreviewClose={handlePreviewClose}
                        preview={preview}
                        setShowDialog={(value: boolean) => setShowDialog(value)}
                      />
                    )}
                    {getQuestionFormatUiComponentName(questionFormat) ===
                      p5Conversation && (
                      <P5Conversation
                        stageList={stageList}
                        sendData={callApi}
                        closeCallApi={closeCallApi}
                        edit={true}
                        title={title}
                        stage={stage}
                        format={format}
                        handleCloseApiCallDone={handleSetApiCallDone}
                        fetchedData={fetchedData}
                        error={error}
                        handleError={(value: boolean) => setError(value)}
                        handlePreviewClose={handlePreviewClose}
                        preview={preview}
                        setShowDialog={(value: boolean) => setShowDialog(value)}
                      />
                    )}
                    {getQuestionFormatUiComponentName(questionFormat) ===
                      p6TextCreation && (
                      <P6TextCreation
                        stageList={stageList}
                        sendData={callApi}
                        closeCallApi={closeCallApi}
                        edit={true}
                        title={title}
                        stage={stage}
                        format={format}
                        handleCloseApiCallDone={handleSetApiCallDone}
                        fetchedData={fetchedData}
                        error={error}
                        handleError={(value: boolean) => setError(value)}
                        handlePreviewClose={handlePreviewClose}
                        preview={preview}
                        setShowDialog={(value: boolean) => setShowDialog(value)}
                      />
                    )}
                    {getQuestionFormatUiComponentName(questionFormat) ===
                      p7WordListening && (
                      <P7WordListening
                        stageList={stageList}
                        sendData={callApi}
                        closeCallApi={closeCallApi}
                        edit={true}
                        title={title}
                        stage={stage}
                        format={format}
                        handleCloseApiCallDone={handleSetApiCallDone}
                        fetchedData={fetchedData}
                        error={error}
                        handleError={(value: boolean) => setError(value)}
                        handlePreviewClose={handlePreviewClose}
                        preview={preview}
                        setShowDialog={(value: boolean) => setShowDialog(value)}
                      />
                    )}
                    {getQuestionFormatUiComponentName(questionFormat) ===
                      p8ImageListening && (
                      <P8ImageListening
                        stageList={stageList}
                        sendData={callApi}
                        closeCallApi={closeCallApi}
                        edit={true}
                        title={title}
                        stage={stage}
                        format={format}
                        handleCloseApiCallDone={handleSetApiCallDone}
                        fetchedData={fetchedData}
                        error={error}
                        handleError={(value: boolean) => setError(value)}
                        handlePreviewClose={handlePreviewClose}
                        preview={preview}
                        setShowDialog={(value: boolean) => setShowDialog(value)}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="content-right">
              <div className="status-display d-flex justify-between align-middle flex-row">
                <div className="fs-12">Status</div>
                <div
                  className={`status-value ${
                    fetchedData?.questionStatus === "Published"
                      ? `bg-blue color-white border-solid-blue`
                      : fetchedData?.questionStatus === "Draft"
                      ? `bg-yellow color-black border-solid-yellow`
                      : "border-solid-dark-gray"
                  }`}
                >
                  {fetchedData?.questionStatus}
                </div>
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
                <div className="d-flex flex-row justify-between ">
                  {" "}
                  <div
                    className="fs-12 preview-button"
                    onClick={handlePreviewShow}
                  >
                    Preview
                  </div>
                  <div
                    className="fs-12 fs-12 delete-button bg-red cursor-pointer"
                    onClick={() => {
                      handleShowDeleteModal();
                    }}
                  >
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
        {showDeleteModal && (
          <ModalBox
            show={showDeleteModal}
            handleActionNClose={() => {
              setCallApi("Deleted");
              handleCloseDeleteModal();
            }}
            handleClose={handleCloseDeleteModal}
            modalHeader={deleteContents.modalHead}
            modalText={deleteContents.modalText}
            firstBtnText={deleteContents.firstBtnText}
            secondBtnText={deleteContents.secondBtnText}
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

export default EditEnglishQuestion;
