import React from "react";
import PropTypes from "prop-types";

type ProgressBarProps = {
  purchased: number;
  target?: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  purchased,
  target = 1000000,
}) => {
  const progress = Math.min((purchased / target) * 100, 100); 

  return (
    <>
      <div
        className="rounded-l-[25px] w-full h-full progress-bar-fill barGradient"
        style={{
          width: `${progress}%`,
        }}
      />
    </>
  );
};

ProgressBar.propTypes = {
  purchased: PropTypes.number.isRequired,
  target: PropTypes.number,

};

export default ProgressBar;
