import { createElement } from "../utils/create-element.js";
import { calculatorHeader } from "../features/footprint/components/calculator-header.js";
import { calculatorSummary } from "../features/footprint/components/calculator-summary.js";
import { ramParameter } from "../features/footprint/components/ram-parameter.js";
import { cpuParameter } from "../features/footprint/components/cpu-parameter.js";
import { gpuParameter } from "../features/footprint/components/gpu-parameter.js";
import { ssdParameter } from "../features/footprint/components/ssd-parameter.js";
import { otherParameter } from "../features/footprint/components/other-parameter.js";

export const createCalculator = (
  otherConfig = {
    powerSupplyUnit: 12,
    motherboard: 6,
    rackServer: 6,
    bladeEnclosure: 0,
    bladeServer: 0,
    interfaceCard: 6,
    serverAssembly: 6,
  },
) => {
  const idNumber = Math.random().toString(16).slice(2);

  const parameterMap = {
    cpu: cpuParameter,
    ram: ramParameter,
    gpu: gpuParameter,
    ssd: ssdParameter,
  };

  const dynamicParams = Object.entries(parameterMap)
    .filter(([key]) => finalConfig[key])
    .map(([_, component]) => component(idNumber));

  return createElement("article", {
    className: "content-block practical-case calculator-studio",
    children: [
      createElement("div", {
        className: "calculator-studio-shell",
        children: [
          createElement("div", {
            className: "calculator-studio-main",
            children: [
              calculatorHeader(),
              ...dynamicParams,
              otherParameter(idNumber, false, otherConfig),
            ],
          }),
          calculatorSummary(idNumber),
        ],
      }),
    ],
  });
};
