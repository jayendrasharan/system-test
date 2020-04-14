export default function () {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1 + "";
  if (month.length < 2) {
    month = "0" + month;
  }
  var year = new Date().getFullYear();
  return `${year}-${month}-${date}`;
}
