import { createElement } from "./src/utils/create-element.js";
import { calculatorHeader } from "./src/features/footprint/components/calculator-header.js";
import { calculatorSummary } from "./src/features/footprint/components/calculator-summary.js";
import { ramParameter } from "./src/features/footprint/components/ram-parameter.js";
import { cpuParameter } from "./src/features/footprint/components/cpu-parameter.js";
import { gpuParameter } from "./src/features/footprint/components/gpu-parameter.js";
import { ssdParameter } from "./src/features/footprint/components/ssd-parameter.js";
import { otherParameter } from "./src/features/footprint/components/other-parameter.js";
import Footprint from "./src/features/footprint/footprint.js";
import { counter } from "./src/features/counter.js";

const app = document.getElementById("app");

const createCalculator = () =>
  createElement("article", {
    className: "content-block practical-case calculator-studio",
    children: [
      createElement("div", {
        className: "calculator-studio-shell",
        children: [
          createElement("div", {
            className: "calculator-studio-main",
            children: [
              calculatorHeader(),
              cpuParameter(),
              ramParameter(),
              gpuParameter(),
              ssdParameter(),
              otherParameter(),
            ],
          }),
          calculatorSummary(),
        ],
      }),
    ],
  });

const button1 = counter(10);
const button2 = counter(20);
const button3 = counter(30);

if (app) {
  app.append(button1, button2, button3);
  app.appendChild(createCalculator());
}
