var p = process.env.REACT_APP_DB === "dev" ? "p" : "";
var capitalP = p.toUpperCase();
export const p1WordSelection = "p1WordSelection";
export const p2ImageSelection = "p2ImageSelection";
export const p3WordSorting = `p3WordSorting`;
export const p4Newspaper = `p4Newspaper`;
export const p5Conversation = `p5Conversation`;
export const p6TextCreation = "p6TextCreation";
export const p7WordListening = `p7WordListening`;
export const p8ImageListening = `p8ImageListening`;

export const p1WordSelectionFormat = "P1_Word selection";
export const p2ImageSelectionFormat = "P2_Image selection";
export const p3WordSortingFormat = `${capitalP}3_Word sorting`;
export const p4NewspaperFormat = `${capitalP}4_Newspaper`; //E10
export const p5ConversationFormat = `${capitalP}5_Conversation`; //E11
export const p6TextCreationFormat = "P6_Text creation"; // E12
export const p7WordListeningFormat = `${capitalP}7_Word listening`; //E13
export const p8ImageListeningFormat = `${capitalP}8_Image listening`; //E14

export const clearAllLocalStorage = () => {
  console.log("clear local storage");
  window.localStorage.clear();
};
export const allImageSize = 500000;
export const allImageSizeText = "500Kb";
export const allAudioSize = 10000000;
export const allAudioSizeText = "10MB";

export const acceptedImageFileType = [
  "png",
  "jpg",
  "jpeg",
  "PNG",
  "JPG",
  "JPEG"
];
export const acceptedPdfFileType = ["pdf", "PDF"];
export const acceptedAudioFileType = ["mp3", "MP3", "mpeg", "MPEG"];
export const defaultPrefecture = "Tokyo";
export const defaultPrefectureJapan = "東京都";
