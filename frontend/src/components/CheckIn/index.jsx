import "./style.scss";
import { Box } from "@mui/system";
import CheckInDatePicker from "../CheckInDatePicker";
import StarRateIcon from "@mui/icons-material/StarRate";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import dayjs from "dayjs";
import { Button } from "@mui/material";

function CheckIn({ post }) {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const rate = 5;
  const [isDatesExpended, setIsDatesExpended] = useState(false);
  const [isGuestsExpended, setIsGuestsExpended] = useState(false);

  return (
    <div className="check-in-comp">
      <header>
        <div>
          <span className="price-night">{post.price}</span>night
        </div>
        <div className="rate-container">
          <StarRateIcon />
          <span>{rate.toFixed(1)}</span>
          <span className="space"> · </span>
          <span>5 reviews</span>
        </div>
      </header>
      <Box>
        {isDatesExpended ? (
          <CheckInDatePicker
            post={post}
            isExpended={isDatesExpended}
            setIsExpended={setIsDatesExpended}
            selectionRange={selectionRange}
            setSelectionRange={setSelectionRange}
          />
        ) : (
          <Box className="check-in-guests-container">
            <div
              className="check-in-container"
              onClick={() => setIsDatesExpended((current) => !current)}
            >
              <div className="check-in-mini-container border">
                <span className="mini-header">CHECK-IN</span>
                <span>
                  {dayjs(selectionRange.startDate).format(`MMM D, YYYY`)}
                </span>
              </div>
              <div className="check-in-mini-container">
                <span className="mini-header">CHECKOUT</span>
                <span>
                  {dayjs(selectionRange.endDate).format(`MMM D, YYYY`)}
                </span>
              </div>
            </div>
            <div>
              <div
                className={
                  isGuestsExpended
                    ? "guests-container-expended"
                    : "guests-container"
                }
              >
                <div className="guests-mini-container">
                  <span className="mini-header">GUESTS</span>
                  <span>1 guest </span>
                </div>
                {!isGuestsExpended ? (
                  <ExpandMoreIcon
                    onClick={() => setIsGuestsExpended((current) => !current)}
                  />
                ) : (
                  <ExpandLessIcon
                    onClick={() => setIsGuestsExpended((current) => !current)}
                  />
                )}
              </div>
              {isGuestsExpended && (
                <div className="guests-menu-items-container">
                  <div className="guests-menu-item">
                    <div className="guests-rubric">
                      <span className="guests-rubric-header">Adults</span>
                      <span>Age 13+ </span>
                    </div>
                    <div className="guests-buttons-container">
                      <RemoveCircleOutlineIcon className="guests-button" />
                      <span className="guests-buttons-value">1</span>
                      <AddCircleOutlineIcon className="guests-button" />
                    </div>
                  </div>
                  <div className="guests-menu-item">
                    <div className="guests-rubric">
                      <span className="guests-rubric-header">Children</span>
                      <span>Ages 2–12 </span>
                    </div>
                    <div className="guests-buttons-container">
                      <RemoveCircleOutlineIcon className="guests-button" />
                      <span className="guests-buttons-value">1</span>
                      <AddCircleOutlineIcon className="guests-button" />
                    </div>
                  </div>
                  <div className="guests-menu-item">
                    <div className="guests-rubric">
                      <span className="guests-rubric-header">Infants</span>
                      <span>Under 2 </span>
                    </div>
                    <div className="guests-buttons-container">
                      <RemoveCircleOutlineIcon className="guests-button" />
                      <span className="guests-buttons-value">1</span>
                      <AddCircleOutlineIcon className="guests-button" />
                    </div>
                  </div>
                  <div className="guests-menu-item">
                    <div className="guests-rubric">
                      <span className="guests-rubric-header">Pets</span>
                    </div>
                    <div className="guests-buttons-container">
                      <RemoveCircleOutlineIcon className="guests-button" />
                      <span className="guests-buttons-value">1</span>
                      <AddCircleOutlineIcon className="guests-button" />
                    </div>
                  </div>
                  <div className="guests-close-button-container">
                    <Button
                      onClick={() => setIsGuestsExpended((current) => !current)}
                      className="guests-close-button"
                      color="secondary"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Box>
        )}
        <div className="reserve-button-container">
          <button className="reserve-button">Reserve</button>
        </div>
        <p className="wont-charge-para">You won't be charged yet</p>
        <div className="price-details-container">
          <p className="price-details">100$ x 5 nights</p>
          <p className="price-sum">500$</p>
        </div>
        <div className="price-details-container border-total">
          <p className="price-details">Cleaning fee</p>
          <p className="price-sum">95$</p>
        </div>
        <div className="price-details-container bold-total">
          <p className="price-details">Total</p>
          <p className="price-sum">595$</p>
        </div>
      </Box>
    </div>
  );
}

export default CheckIn;
