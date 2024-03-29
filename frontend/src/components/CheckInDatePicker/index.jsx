import "./style.scss";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import dayjs from "dayjs";

function CheckInDatePicker({
  post,
  reservation,
  setReservation,
  isExpended,
  setIsExpended,
  selectionRange,
  setSelectionRange,
  direction,
}) {
  const today = new Date();

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    // setReservation({ ...reservation,});
    const { disabledDates } = post;

    let isValid = true;
    //checks if the selected range includes disabled dates inside
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
      //Update reservation state by picked dates
      const numberOfNights =
        dayjs(endDate).format("D") - dayjs(startDate).format("D");
      setReservation({
        ...reservation,
        startDate,
        endDate,
        numberOfNights,
        totalPrice: numberOfNights * post.price + post.cleaningFee,
      });
      console.log("truevalid");
    }
    if (
      isValid &&
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
        direction={direction}
        disabledDay={disabledDay}
        minDate={today}
        rangeColors={["#e51d53"]}
      />
    </div>
  );
}

export default CheckInDatePicker;
