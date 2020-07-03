import moment from "moment";

export const getFormattedDate = (time) => {
    let date = moment(time, );
    return date.format("LL")
}