import React from "react";
import EnglishQuestionList from "./EnglishQuestionList";
import { useState, useLayoutEffect } from "react";
import {
  getEnglishQuestionType,
  getStageListType,
  getFormatListType
} from "../../../Services/type/type";
import {
  getEnglishQuestionList,
  getStageMapList,
  getFormateMapList
} from "../service/englishquestion";
import Loader from "../../../Components/loader/Loader";
function EnglishQuestion() {
  const [fetchedData, setFetchedData] = useState(
    [] as getEnglishQuestionType[]
  );
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [filterText, setFilterText] = useState("");
  const [format, setFormat] = useState("");
  const [status, setStatus] = useState("");
  const [stage, setStage] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedThemeList, setSelectedThemeList] = useState(
    [] as getEnglishQuestionType[]
  );
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  const [stageList, setStageList] = useState([] as getStageListType[]);
  const [formatList, setFormatList] = useState([] as getFormatListType[]);
  async function getQuestionStageList() {
    setDataLoaded(false);
    let [stageList, formateList] = await Promise.all([
      getStageMapList(),
      getFormateMapList()
    ]);
    setStageList(stageList);
    setFormatList(formateList);
    setDataLoaded(true);
  }
  const fetchEnglishQuestion = async () => {
    setDataLoaded(false);
    const response = await getEnglishQuestionList(
      currentPageNumber,
      status,
      filterText,
      format,
      stage
    );
    setFetchedData(response?.items);
    setFrom(response?.from);
    setTo(response?.to);
    setTotalItem(response?.totalItem);
    setTotalPage(response?.totalPage);

    if (response?.totalItem === null) {
      setTo(0);
      setFrom(0);
      setTotalItem(0);
    }
    setDataLoaded(true);
    //resizeAdjust();
  };

  useLayoutEffect(() => {
    getQuestionStageList();
  }, []);
  useLayoutEffect(() => {
    fetchEnglishQuestion();
    setSelectedThemeList([]);
  }, [currentPageNumber, filterText, status, stage, format]);
  return (
    <div>
      <EnglishQuestionList
        fetchEnglishQuestion={fetchEnglishQuestion}
        fetchedData={fetchedData}
        currentPageNumber={currentPageNumber}
        setCurrentPageNumber={setCurrentPageNumber}
        filterText={filterText}
        setFilterText={setFilterText}
        status={status}
        setStatus={setStatus}
        stage={stage}
        setStage={setStage}
        to={to}
        from={from}
        format={format}
        setFormat={setFormat}
        totalPage={totalPage}
        setTotalPage
        totalItem={totalItem}
        setTotalItem
        selectedThemeList={selectedThemeList}
        setSelectedThemeList={setSelectedThemeList}
        stageList={stageList}
        formatList={formatList}
        dataLoaded={dataLoaded}
        setDataLoaded={setDataLoaded}
      />
      {!dataLoaded && <Loader/>}
    </div>
  );
}

export default EnglishQuestion;
