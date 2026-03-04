const AnalyseResponse = () => {
  const analyseResponseButton = document.getElementById(
    "analyseResponseButton",
  );
  const analyseAnwsers = document.querySelector(".analysis-grid");

  analyseResponseButton.addEventListener("click", (e) => {
    analyseAnwsers.classList.add("active");
  });
};

export default AnalyseResponse;
