import React, {Suspense,lazy} from "react";

//dynamic import
const Nature = lazy(() => import("../../components/Nature"))


const GeneralApp = () => {

  return (
    <>
    <Suspense fallback="......Loading">
    {/* <Nature /> */}
    </Suspense>
    </>
  );
};

export default GeneralApp;
