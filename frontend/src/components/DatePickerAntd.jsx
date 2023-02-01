import { DatePicker, Space } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import * as moment from 'moment';
import { useEffect, useState } from "react";
dayjs.extend(customParseFormat);
function DatePickerAntd({ post, setPost }) {
  const [dates, setDates] = useState([
    ["2023-02-13", "2023-02-15"],
    ["2023-02-08", "2023-02-10"],
  ]);
  const { RangePicker } = DatePicker;

  const onChange = (date, dateString) => {
    console.log(dateString);
    var getDaysArray = function (s, e) {
      for (
        var a = [], d = new Date(s);
        d <= new Date(e);
        d.setDate(d.getDate() + 1)
      ) {
        a.push(new Date(d));
      }
      return a;
    };
    const array = getDaysArray(dateString[0], dateString[1]);

    setDates(array);
  };

  const disabledDate = (current) => {
    let start = "2023-02-13";
    // let end = dates[i][1];

    // if (current.date() === moment(start)) {
    //   return true;
    // } else {
      return  current < dayjs().add(-1, "day")|| current.date() > moment(start);
    // }

    // Can not select days before today and today
  };
  // const disabledDate = (current) => {
  //   // Can not select days before today and today
  //   return current && current < dayjs().add(-1, "day");
  // };
  // function disabledDate(current) {
  //   if (dates) {
  //     console.log(dates);
  //     for (let i = 0; i < dates.length; i++) {
  //       if (
  //         current.date() === dayjs(dates[i]).date() &&
  //         current.month() === dayjs(dates[i]).month()
  //       ) {
  //         return false;
  //       }
  //     }
  //   }
  //   return current < dayjs().add(-1, "day");
  // }

  return <RangePicker onChange={onChange} disabledDate={disabledDate} />;
}

export default DatePickerAntd;
