import { Heatmap } from "./charts/Heatmap";
import { ChartCanvas } from "./ui/ChartCanvas";

const HeatMap = () => { 

  return (
    <div> 
      <b> Time Range Component </b>    
          <ChartCanvas
            VizComponent={Heatmap}
            vizName={"heatmap"}
            maxWidth={2000}
            height={300}
            />
    </div>
  );
}

export default HeatMap;