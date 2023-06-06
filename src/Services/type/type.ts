export type getEnglishQuestionType = {
  SK: string;
  createdAt: string;
  createdBy: string;
  questionFormat: string;
  questionStatus: string;
  stageTitle: string;
  title: string;
  updatedAt: string | null;
};
export type getQuestionType = {
  PK: string;
  SK: string;
  type: string;
  status: boolean;
  createdAt: string;
  createdBy: string;
  questionFormat: string;
  questionStatus: string;
  imageData: string;
  stageTitle: string;
  title: string;
  choiceA: string;
  choiceB: string;
  choiceC: string;
  answer: "choiceA" | "choiceB" | "choiceC";
  updatedAt: string | null;
};
export type getStageListType = {
  SK: string;
  imageData: string;
  title: string;
};
export type getFormatListType = {
  uiComponentName: string;
  title: string;
};
export type getUserType = {
  currentPageNumber: number;
  filterText: string;
  contract: any;
  status: any;
  startPoint: number | null;
  endPoint: number | null;
  startStage: number | null;
  endStage: number | null;
};
export type getQuestionPropTypes = {
  stageList: any;
  sendData: string;
  closeCallApi: () => void;
  handleCloseApiCallDone: () => void;
  title: string;
  stage: string;
  format: string;
  error: boolean;
  handleError: (value: boolean) => void;
  preview: boolean;
  handlePreviewClose: () => void;
  setShowDialog: (value: boolean) => void;
  fetchedData?: any;
  edit?: boolean;
};
export type categoryType = {
  title: string;
  categorySortKey: string;
};
export type getDragDropType = {
  setImageFile: (file: any, type?: string) => void;
  handleChangeRadionButton: (file: any, type?: string) => void;
  noTitle?: boolean;
  title?: string;
  link?: string;
  fileName?: string;
  radioBtn?: boolean;
  radioValue?: string;
  answer?: string;
  error?: boolean;
};
export type getItemListType = {
  SK: string;
  title: string;
  categoryTitle: string;
  price: string;
  updatedAt: string;
  createdAt: string;
  createdBy: string;
};
export type itemPositionType = {
  isUsed: boolean;
  position: 6 | 7 | 8 | 9 | 10 | 11;
};
export type prefectureListType = {
  id: string;
  en: string;
  jp: string;
};
export type cityListType = {
  title: string;
};
export type countryOptionListType = {
  SK: string;
  name: string;
  cities: cityListType[];
};
export type CategoryPositionListType = {
  isUsed: boolean;
  position: number;
}
export type getLoginBonusListType = {
  SK: string;
  countryName: string;
  countryCode: string;
  cityName: string;
  bonusCoin: number;
  title: string;
  loginBonusItemStatus: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
};
