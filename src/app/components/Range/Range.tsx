import { RangeData } from "@/types/rangeData";
import RangeWithRangeValues from "./RangeWithRangeValues";
import RangeWithoutRangeValues from "./RangeWithoutRangeValues";

type RangeProps = {
  data: RangeData;
};

const Range: React.FC<RangeProps> = ({ data }) => {
  const { min, max, rangeValues } = data;

  if (rangeValues.length > 0) {
    return <RangeWithRangeValues rangeValues={rangeValues} />;
  } else {
    return <RangeWithoutRangeValues min={min} max={max} />;
  }
};

export default Range;
