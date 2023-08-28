import { ReactNode, useRef, useState } from "react";
import { useDimensions } from "../hooks/use-dimensions";

type ChartOrSandboxProps = {
  VizComponent: (props: {
    width: number;
    height: number;
  }) => JSX.Element | null; // A component that calls the viz component (e.g. heatmap) with everything needed except width and height
  vizName: string;
  height?: number;
  maxWidth?: number;
  caption?: string | ReactNode;
};

export const ChartOrSandbox = ({
  VizComponent,
  vizName,
  height = 400,
  maxWidth = 800,
  caption,
}: ChartOrSandboxProps) => {

  // the chart / sandbox will fill the available space until maxWidth is reached
  const chartRef = useRef<HTMLDivElement>(null);
  const chartSize = useDimensions(chartRef);

  return (
    // Add a full screen width wrapper with grey background around everything.
    // It has to be "relative". Note that it goes out of the article container if necessary!
    <div
      style={{ marginLeft: "-50vw", left: "50%" }}
      className="my-4 py-4 w-screen relative"
    >
        <div className="flex flex-col items-center justify-center">
          <div className="bg-gray-100 bg-opacity-50 w-screen flex justify-center z-50 pointer-events-none">
            <div
              style={{ height, width: "100%", maxWidth }}
              ref={chartRef}
              className="pointer-events-auto"
            >
              <VizComponent height={height} width={chartSize.width} />
            </div>
          </div>
         
        </div>
    </div>
  );
};
