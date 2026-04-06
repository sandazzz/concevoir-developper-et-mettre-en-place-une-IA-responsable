import Navigation from "./src/features/navigation.js";
import ScrollFeatures from "./src/features/scroll-features.js";
import ScrollAnimations from "./src/features/scroll-animations.js";
import DecisionTree from "./src/features/decision-tree.js";
import AnalyseResponse from "./src/features/analyse-response.js";
import { createCalculator } from "./src/features/footprint/calculator.js";

const App = (() => {
  const init = () => {
    Navigation();
    ScrollFeatures();
    ScrollAnimations();
    AnalyseResponse();
    DecisionTree();
    console.log("Formation IA Responsable - Site initialisé");
  };

  return { init };
})();

const calculator1 = createCalculator("Cluster GPU fictif : FAB-IA-01");

const calculator2 = createCalculator("Services du projet ABC", {
  gpu: false,
  ssd: false,
  other: {
    powerSupplyUnit: 2,
    inputHdd: true,
    motherboard: 1,
    rackServer: 1,
    bladeEnclosure: 0,
    bladeServer: 0,
    interfaceCard: 1,
    serverAssembly: 1,
  },
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", App.init);
} else {
  App.init();
  document.getElementById("id01").appendChild(calculator1);
  document.getElementById("id02").appendChild(calculator2);
}
