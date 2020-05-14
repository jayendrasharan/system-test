export default () => {
  var dt = new Date();
  var h = dt.getHours(),
    m = dt.getMinutes();

  var time;
  if (h == 12) {
    time = h + ":" + m < 10 ? "0" + m : m + " PM";
  } else {
    time =
      h > 12
        ? (h - 12 < 10 ? "0" + (h - 12) : h - 12) +
          ":" +
          (m < 10 ? "0" + m : m) +
          " PM"
        : (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + " AM";
  }
  //var time = h > 12 ? h - 12 + ":" + m + " PM" : h + ":" + m + " AM";

  //  console.log(`CURRENT TIME IS ${time}`);
  //var time = `${hours}:${date.getMinutes()} ${mid}`;
  return time;
};
