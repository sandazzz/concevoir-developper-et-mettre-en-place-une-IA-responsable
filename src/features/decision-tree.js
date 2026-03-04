  function handleDecisionClick(button, tree, progressSteps) {
    const node = button.closest(".decision-node-interactive");
    const nextTarget = button.dataset.next;
    const answer = button.dataset.answer;

    // Mark button as selected
    const allButtons = node.querySelectorAll(".decision-btn");
    allButtons.forEach((btn) => btn.classList.remove("selected"));
    button.classList.add("selected");

    // Disable buttons in current node
    allButtons.forEach((btn) => {
      btn.disabled = true;
      btn.style.cursor = "default";
    });

    // Check if it's a result or next step
    if (nextTarget.startsWith("result-")) {
      // Show result
      const resultElement = tree.querySelector("#" + nextTarget);
      if (resultElement) {
        resultElement.classList.remove("hidden");

        // Add confetti effect for positive result
        if (resultElement.querySelector(".result-card.positive")) {
          createConfetti(resultElement);
        }
      }

      // Mark current step as completed
      const currentStep = parseInt(node.dataset.step);
      updateProgressSteps(progressSteps, currentStep, true);

      // Show reset button
      const resetBtn = tree.querySelector(".reset-btn");
      if (resetBtn) {
        resetBtn.classList.remove("hidden");
      }

      // Mark node as completed
      node.classList.remove("active");
      node.classList.add("completed-no-opacity");
    } else {
      // Go to next step
      const currentStep = parseInt(node.dataset.step);
      const nextStep = parseInt(nextTarget);

      // Update progress
      updateProgressSteps(progressSteps, currentStep, false);

      // Mark current node as completed
      node.classList.add("completed");
      node.classList.remove("active");

      // Show next node with animation
      setTimeout(() => {
        const nextNode = tree.querySelector(`[data-step="${nextStep}"]`);
        if (nextNode) {
          nextNode.classList.remove("hidden");
          nextNode.classList.add("active");

          // Update progress step
          progressSteps.forEach((step) => {
            if (parseInt(step.dataset.step) === nextStep) {
              step.classList.add("active");
            }
          });

          // Scroll to next node
          nextNode.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 300);
    }
  }

  function updateProgressSteps(progressSteps, step, isFinal) {
    progressSteps.forEach((progressStep) => {
      const stepNum = parseInt(progressStep.dataset.step);
      if (stepNum < step) {
        progressStep.classList.add("completed");
        progressStep.classList.remove("active");
      } else if (stepNum === step) {
        if (isFinal) {
          progressStep.classList.add("completed");
        }
        progressStep.classList.remove("active");
      }
    });
  }

  function resetDecisionTree(tree, progressSteps) {
    // Reset all nodes
    const nodes = tree.querySelectorAll(".decision-node-interactive");
    nodes.forEach((node, index) => {
      node.classList.remove(
        "completed",
        "active",
        "hidden",
        "completed-no-opacity",
      );
      if (index === 0) {
        node.classList.add("active");
      } else {
        node.classList.add("hidden");
      }

      // Reset buttons
      const buttons = node.querySelectorAll(".decision-btn");
      buttons.forEach((btn) => {
        btn.classList.remove("selected");
        btn.disabled = false;
        btn.style.cursor = "pointer";
      });
    });

    // Reset results
    const results = tree.querySelectorAll(".decision-result");
    results.forEach((result) => result.classList.add("hidden"));

    // Reset progress
    progressSteps.forEach((step, index) => {
      step.classList.remove("completed", "active");
      if (index === 0) {
        step.classList.add("active");
      }
    });

    // Hide reset button
    const resetBtn = tree.querySelector(".reset-btn");
    if (resetBtn) {
      resetBtn.classList.add("hidden");
    }

    // Scroll to top of tree
    tree.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function createConfetti(container) {
    const colors = ["#2d6a4f", "#40916c", "#74c69d", "#52b788", "#95d5b2"];
    const confettiCount = 30;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: 50%;
                opacity: 0;
                border-radius: ${Math.random() > 0.5 ? "50%" : "0"};
                animation: confettiFall ${1 + Math.random()}s ease-out forwards;
                animation-delay: ${Math.random() * 0.3}s;
            `;
      container.style.position = "relative";
      container.style.overflow = "hidden";
      container.appendChild(confetti);

      // Remove confetti after animation
      setTimeout(() => confetti.remove(), 2000);
    }
  }

  const DecisionTree = () => {
    const trees = document.querySelectorAll(".decision-tree-interactive");

    trees.forEach((tree) => {
      const buttons = tree.querySelectorAll(".decision-btn");
      const resetBtn = tree.querySelector(".reset-btn");
      const progressSteps = tree.querySelectorAll(".progress-step");

      buttons.forEach((button) => {
        button.addEventListener("click", () =>
          handleDecisionClick(button, tree, progressSteps),
        );
      });

      if (resetBtn) {
        resetBtn.addEventListener("click", () =>
          resetDecisionTree(tree, progressSteps),
        );
      }
    });
  };


export default DecisionTree;
