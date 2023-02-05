import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetEditForm } from "../features/posts/postSlice";
import dayjs from "dayjs";
import { Box, Button } from "@mui/material";

function DatePicker({ post, setPost, editForm }) {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const dispatch = useDispatch();

  const today = new Date();

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
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

  const onDisableButton = () => {
    const { startDate, endDate } = selectionRange;

    setPost({
      ...post,
      disabledDates: [
        ...post.disabledDates,
        ...getArrayDates(startDate, endDate),
      ],
      disabledRanges: [...post.disabledRanges, { startDate, endDate }],
    });
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
    const { disabledDates } = post;
    const { startDate, endDate } = range;

    const arrayToRemove = getArrayDates(startDate, endDate);

    arrayToRemove.map((dateToRemove) =>
      disabledDates.find((disDate, index) => {
        if (
          dayjs(disDate).format(`MMM D, YYYY`) ===
          dayjs(dateToRemove).format(`MMM D, YYYY`)
        ) {
          disabledDates.splice(index, 1);
          return true;
        }
        return false;
      })
    );
    post.disabledRanges.splice(index, 1);

    setPost({
      ...post,
      disabledDates: [...disabledDates],
      disabledRanges: [...post.disabledRanges],
    });
  };
  useEffect(() => {
    if (editForm) {
      setPost({
        ...editForm,
        disabledDates: [...editForm.disabledDates],
        disabledRanges: [...editForm.disabledRanges],
      });
      dispatch(resetEditForm());
    }
  }, [editForm, dispatch, setPost]);

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

      {post.disabledRanges.length > 0 &&
        post.disabledRanges.map((range, index) => (
          <Box key={range.startDate} className="flex date-range">
            <Box key={range.endDate} className="flex date">
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
