import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Box, Button } from "@mui/material";

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
    const { startDate, endDate } = selectionRange;

    setDatesDis([...datesDis, ...getArrayDates(startDate, endDate)]);
    setDisRanges([...disRanges, { startDate, endDate }]);
    // setDisRanges([])
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
  const onUndo = (range, index) => {
    console.log(range);
    const { startDate, endDate } = range;
    const arrayToRemove = getArrayDates(startDate, endDate);
    arrayToRemove.map((dateToRemove) =>
      datesDis.find((disDate, index) => {
        if (
          dayjs(disDate).format(`MMM D, YYYY`) ===
          dayjs(dateToRemove).format(`MMM D, YYYY`)
        ) {
          datesDis.splice(index, 1);
          return true;
        }
        return false;
      })
    );
    setDatesDis([...datesDis]);
    disRanges.splice(index, 1);
    setDisRanges([...disRanges]);
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

      {disRanges.length > 0 &&
        disRanges.map((range, index) => (
          <Box key={range.startDate} className="flex date-range">
            <Box className="flex date">
              <p>
                {dayjs(range.startDate).format(`MMM D, YYYY`).toString()} -{" "}
                {dayjs(range.endDate).format(`MMM D, YYYY`).toString()}
              </p>
            </Box>
            <Button
              onClick={() => {
                onUndo(range, index);
              }}
            >
              Undo
            </Button>
          </Box>
        ))}
    </>
  );
}

export default DatePicker;
