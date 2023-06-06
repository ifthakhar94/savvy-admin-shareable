import React from "react";

type getModalType = {
  modalHead: string;
  modalText: string | React.ReactElement;
  firstBtnText?: string;
  secondBtnText: string;
};
export const logoutContents: getModalType = {
  modalHead: "Logout",
  modalText: (
    <div>
      Log out <br />
      Are you sure?
    </div>
  ),
  firstBtnText: "Logout",
  secondBtnText: "Cancel"
};
export const completeContents: getModalType = {
  modalHead: "Completed",
  modalText: (
    <div>
      Completed successfully. <br />
      Please Check.
    </div>
  ),
  secondBtnText: "Ok"
};
export const deleteContents: getModalType = {
  modalHead: "Deletion",
  modalText: (
    <div>
      Deletes the selected item. <br />
      Are you sure?
    </div>
  ),
  firstBtnText: "Delete",
  secondBtnText: "Close"
};
export const publicContents: getModalType = {
  modalHead: "Public",
  modalText: (
    <div>
      The entered question will be published. <br />
      Are you sure?
    </div>
  ),
  firstBtnText: "Public",
  secondBtnText: "Cancel"
};
export const unsuccessfullUploadContents: getModalType = {
  modalHead: "Error",
  modalText: <div>PDF has not been uploaded. Please try again.</div>,
  secondBtnText: "Ok"
};
export const pdfUploadContents: getModalType = {
  modalHead: "Upload",
  modalText: <div>We have successfully uploaded the PDF file</div>,
  secondBtnText: "Ok"
};
export const publishedContents: getModalType = {
  modalHead: "Published",
  modalText: (
    <div>
      We have successfully completed the release of the application. <br />
      Please check it on the application.
    </div>
  ),
  secondBtnText: "Ok"
};
export const errorContents: getModalType = {
  modalHead: "Error",
  modalText: (
    <div>Opps, something went worng error. Please try again later.</div>
  ),
  secondBtnText: "Ok"
};
