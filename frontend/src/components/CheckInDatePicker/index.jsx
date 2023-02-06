import "./style.scss";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useState } from "react";
import dayjs from "dayjs";

function CheckInDatePicker({
  post,
  isExpended,
  setIsExpended,
  selectionRange,
  setSelectionRange,
}) {
  const today = new Date();

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    const { disabledDates } = post;
    console.log(
      "dayjs(startDate).format(`MMM D, YYYY`)",
      dayjs(startDate).format(`MMM D, YYYY`)
    );
    console.log(
      "dayjs(endDate).format(`MMM D, YYYY`)",
      dayjs(endDate).format(`MMM D, YYYY`)
    );
    let isValid = true;
    if (disabledDates.length) {
      disabledDates.find((disDate) => {
        if (
          dayjs(startDate) < dayjs(disDate) &&
          dayjs(endDate) > dayjs(disDate)
        ) {
          alert("please select another range");
          isValid = false;
          return true;
        }
        return false;
      });
    }
    if (isValid) {
      setSelectionRange(ranges.selection);
    }
    if (
      dayjs(endDate).format(`MMM D, YYYY`) >
      dayjs(startDate).format(`MMM D, YYYY`)
    ) {
      setIsExpended(false);
      console.log("true");
    }
  };
  const disabledDay = (d) => {
    const { disabledDates } = post;
    if (disabledDates.length) {
      let condition =
        dayjs(d).format(`MMM D, YYYY`) ===
        dayjs(disabledDates[0]).format(`MMM D, YYYY`);
      for (let i = 1; i < disabledDates.length; i++) {
        condition =
          condition ||
          dayjs(d).format(`MMM D, YYYY`) ===
            dayjs(disabledDates[i]).format(`MMM D, YYYY`);
      }
      return condition;
    }
  };
  return (
    <div className="check-in-date-picker-comp">
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
        months={2}
        direction="horizontal"
        disabledDay={disabledDay}
        minDate={today}
      />
    </div>
  );
}

export default CheckInDatePicker;
