import { createElement } from "../../utils/create-element.js";
import { calculatorHeader } from "./components/calculator-header.js";
import { calculatorSummary } from "./components/calculator-summary.js";
import { RamParameter } from "./components/ram-parameter.js";
import { CpuParameter } from "./components/cpu-parameter.js";
import { GpuParameter } from "./components/gpu-parameter.js";
import { SsdParameter } from "./components/ssd-parameter.js";
import { otherParameter } from "./components/other-parameter.js";

export const createCalculator = (exerciceNumber, config = {}) => {
  const idNumber = Math.random().toString(16).slice(2);

  const defaultConfig = {
    cpu: true,
    ram: true,
    gpu: true,
    ssd: true,
    other: {
      powerSupplyUnit: 12,
      inputHdd: false,
      motherboard: 6,
      rackServer: 6,
      bladeEnclosure: 0,
      bladeServer: 0,
      interfaceCard: 6,
      serverAssembly: 6,
    },
  };

  const finalConfig = {
    ...defaultConfig,
    ...config,
    other: {
      ...defaultConfig.other,
      ...(config.other || {}),
    },
  };

  const parameterMap = {
    cpu: CpuParameter,
    ram: RamParameter,
    gpu: GpuParameter,
    ssd: SsdParameter,
  };

  const dynamicParams = Object.entries(parameterMap)
    .filter(([key]) => finalConfig[key])
    .map(([_, component]) => component(idNumber));

  const shouldRenderOther = Object.values(finalConfig.other).some(
    (value) => value > 0,
  );

  const mainChildren = [
    calculatorHeader(exerciceNumber),
    ...dynamicParams,
    shouldRenderOther && otherParameter(idNumber, finalConfig.other),
  ].filter(Boolean);

  return createElement("article", {
    className: "content-block practical-case calculator-studio",
    children: [
      createElement("div", {
        className: "calculator-studio-shell",
        children: [
          createElement("div", {
            className: "calculator-studio-main",
            children: mainChildren,
          }),
          calculatorSummary(idNumber),
        ],
      }),
    ],
  });
};
