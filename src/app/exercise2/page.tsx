import { RangeData } from "@/types/rangeData";
import { JSX } from "react";
import Range from "../components/Range/Range";

export default async function Exercise2(): Promise<JSX.Element> {
  const response = await fetch("http://demo2971721.mockable.io/range-values");

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
  }

  const data: RangeData = await response.json();

  return <Range data={data} />;
}
