import Navigation from "./src/features/navigation.js";
import ScrollFeatures from "./src/features/scroll-features.js";
import ScrollAnimations from "./src/features/scroll-animations.js";
import DecisionTree from "./src/features/decision-tree.js";
import Footprint from "./src/features/footprint/footprint.js";
import AnalyseResponse from "./src/features/analyse-response.js";
import { createCalculator } from "./src/features/calculator.js";

const App = (() => {
  const init = () => {
    Navigation();
    ScrollFeatures();
    ScrollAnimations();
    AnalyseResponse();
    DecisionTree();
    Footprint();
    console.log("Formation IA Responsable - Site initialisé");
  };

  return { init };
})();

const calculator1 = createCalculator();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", App.init);
} else {
  App.init();
  document.getElementById("mesure").appendChild(calculator1);
}
