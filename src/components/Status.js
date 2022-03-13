import React from "react";

const expiryDate = "02/12/2021";
const startdate = "03/10/2021";

const Status = () => {
  return (
    <div>
      <h1>Start Date: {dateConvertor(expiryDate)}</h1>
      <h1>Expiry Date: {dateConvertor(startDate)}</h1>
    </div>
  );
};

export default Status;
