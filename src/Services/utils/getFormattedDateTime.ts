export const getFormattedDateTime = (dateTime: string | null) => {
  if (dateTime) {
    let date = new Date(dateTime).toLocaleString("ja-JP", {
      timeZone: "Asia/Tokyo"
    });
    //let date = new Date(dateTime).toLocaleTimeString();
    return date.slice(0, date.length - 3);
  }

  return "";
  /* if (dateTime == null) return null;
  let separator = dateTime.search("T");
  let date = dateTime.slice(0, separator).replaceAll("-", "/");
  let time = dateTime.slice(separator + 1, separator + 6);
  return date + " " + time;
  */
};
