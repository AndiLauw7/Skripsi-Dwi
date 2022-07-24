import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import LoadingOverlay from '@ronchalant/react-loading-overlay'
import BounceLoader from '@ronchalant/react-loading-overlay'

export default ({childern}) => {
  return (

    <LoadingOverlay
      active={true}
      spinner={ <BounceLoader />}
    >
      {childern}
    </LoadingOverlay>
    // <div
    //   className="d-flex justify-content-center align-items-center "
    //   style={{
    //     width: "100wh",
    //     height: "100vh",
    //     backgroundColor: "rgba(0, 0, 0, 0.1)",
    //   }}
    // >
     
    // </div>
  );
};
