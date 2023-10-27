import { ErrorBoundary } from "@sentry/react";
// import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

const LandingLayout = () => {
  // const t = useTranslation();
  return (
    <>
      <ErrorBoundary>
        {/* <header className="w-full h-20 ">
        <div className="w-[10rem]">
          <Draggable
          axis="x"
            handle=".handle"
            defaultPosition={{ x: 0, y: 0 }}
            grid={[25, 25]}
            scale={1}>
            <Select
              label="Select"
              className=""
              onChange={(value) => console.log(value)}>
              {test.map((t, i) => {
                return (
                  <SelectItem value={i} key={i}>
                  {t}
                  </SelectItem>
                  );
                })}
            </Select>
            </Draggable>
            </div>
          </header> */}
        <main className="w-full h-full bg-amber-400">
           notice
          <Outlet></Outlet>
        </main>
      </ErrorBoundary>
    </>
  );
};

export default LandingLayout;
