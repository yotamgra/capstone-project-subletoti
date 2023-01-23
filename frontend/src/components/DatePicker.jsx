import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useState } from "react";

function DatePicker({ post, setPost }) {
  let disablePast = [];
  for (let i = 0; i < 100; i++) {
    disablePast.push(
      new Date(new Date().setDate(new Date().getDate() - 1 - i))
    );
  }

  const handleSelect = (ranges) => {
    const startDate = ranges.selection.startDate;
    const endDate = ranges.selection.endDate;
    setSelectionRange(ranges.selection);

    setPost({ ...post, availableFrom: startDate, availableUntil: endDate });
  };
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  return (
    <DateRangePicker
      ranges={[selectionRange]}
      onChange={handleSelect}
      disabledDates={disablePast}
    />
  );
}

export default DatePicker;
