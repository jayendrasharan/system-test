/**
 * Created by Rakesh Peela
 * Date: 17-Apr-2020
 * Time: 1:11 AM
 */
import moment from "moment";

export const getFormattedDate = (time) => {
    let date = moment(time, "DD-MM-YYYY");
    return date.format("LL")
}