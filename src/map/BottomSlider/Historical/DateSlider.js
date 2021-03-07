import Slider from "@material-ui/core/Slider";
import React from "react";
import Styles from "../../../SCSS/styles.module.scss";

const date_of_first_case = new Date("01/22/2020");


//contains the date slider that user can interact with to see visual of covid 19 outbreak
const DateSlider = (props) => {
  const handleChange = (event, newValue) => {
    var StartOfCovidDate = new Date("01/22/2020");
    props.HandleSliderUpdate(
      StartOfCovidDate.setDate(StartOfCovidDate.getDate() + newValue)
    );
  };

  const date_today = new Date();

  // To calculate the time difference of two dates
  const difference_in_time =
    date_today.getTime() - date_of_first_case.getTime();

  // To calculate the no. of days between two dates (subtract 1 since data is only updated at 23:59 UTC)
  const difference_in_days =
    Math.floor(difference_in_time / (1000 * 3600 * 24)) - 10;
  console.log(difference_in_days);
  const marks = [
    {
      value: 0,
      label: "Day 0"
    },
    {
      value: difference_in_days,
      label: ""
    }
  ];

  return (
    <Slider
      classes={{
        root: Styles.Slider,
        thumb: Styles.SliderThumb,
        markLabelActive: Styles.SliderLabel,
        markLabel: Styles.SliderLabel
      }}
      defaultValue={0}
      onChange={handleChange}
      getAriaValueText={""}
      aria-labelledby="continuous-slider"
      valueLabelDisplay="on"
      marks={marks}
      max={difference_in_days}
    />
  );
};

export default DateSlider;
