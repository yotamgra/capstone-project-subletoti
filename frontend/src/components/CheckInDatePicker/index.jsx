import "./style.scss";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useState } from "react";

function CheckInDatePicker({ post, setPost }) {
  const today = new Date();
  const handleSelect = (ranges) => {
    const startDate = ranges.selection.startDate;
    const endDate = ranges.selection.endDate;
    setSelectionRange(ranges.selection);

    
  };
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  return (
    <div className="check-in-date-picker-comp">
    <DateRangePicker
      ranges={[selectionRange]}
      onChange={handleSelect}
      months={2}
      direction="horizontal"
      // disabledDay={(d) => {

      //   return d < yesterday;
      // }}
      minDate={today}
    />
    </div>
  );
}

export default CheckInDatePicker;
