import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useState } from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";

function DatePicker({ post, setPost }) {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [disRanges, setDisRanges] = useState([]);

  const [datesDis, setDatesDis] = useState([]);

  const today = new Date();
  const handleSelect = (ranges) => {
    const startDate = ranges.selection.startDate;
    const endDate = ranges.selection.endDate;
    setSelectionRange(ranges.selection);

    setPost({ ...post, availableFrom: startDate, availableUntil: endDate });
  };

  const disabledDay = (d) => {
    if (datesDis.length) {
      let condition =
        dayjs(d).format(`MMM D, YYYY`) ===
        dayjs(datesDis[0]).format(`MMM D, YYYY`);
      for (let i = 1; i < datesDis.length; i++) {
        condition =
          condition ||
          dayjs(d).format(`MMM D, YYYY`) ===
            dayjs(datesDis[i]).format(`MMM D, YYYY`);
      }
      return condition;
    }
  };

  const onDisableButton = () => {
    const startDate = selectionRange.startDate;
    const endDate = selectionRange.endDate;
    setDatesDis([...datesDis, ...getArrayDates(startDate, endDate)]);
    setDisRanges([...disRanges, { start: startDate, end: endDate }]);
  };

  const getArrayDates = (startDate, stopDate) => {
    const dateArray = [];
    let currentDate = dayjs(startDate);
    while (currentDate <= stopDate) {
      dateArray.push(currentDate);
      currentDate = currentDate.add(1, "day");
    }
    return dateArray;
  };

  return (
    <>
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
        months={2}
        direction="horizontal"
        disabledDay={disabledDay}
        minDate={today}
      />
      <button onClick={onDisableButton}>Disable these dates</button>
      {disRanges ??
        disRanges.map((range) => (
          <Box className="flex date-range">
            <Box className="flex date">
              <p>
                {dayjs(range.start).format(`MMM D, YYYY`).toString()} -{" "}
                {dayjs(range.end).format(`MMM D, YYYY`).toString()}
              </p>
            </Box>
          </Box>
        ))}
    </>
  );
}

export default DatePicker;
