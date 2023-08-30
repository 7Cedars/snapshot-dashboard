import { data } from './data';
import { NetworkDiagram } from './NetworkDiagram';

interface Props {
  width: number;
  height: number;
}

export const NetworkDiagramBasicCanvasDemo = ({
  width = 700,
  height = 400,
}: Props) => {
  if (width === 0) {
    return null;
  }
  return <NetworkDiagram data={data} width={width} height={height} />;
};
