export const calculEmpreinteCPU = (nBCpusPhysiques, vCpuParCpu = 32) => {
  const empreinte =
    nBCpusPhysiques * ((vCpuParCpu * 0.173333333333 + 0.491) * 1.97 + 9.14);
  const resultatFinal = Number(empreinte.toFixed(1));
  return resultatFinal;
};

export const calculEmpreinteRAM = (QttDeGoDeRAM, GoModule = 128) => {
  const ramDieParGo = 0.596666666666667;
  const critereDie = 2.2;
  const critereBase = 5.22;
  const QttDeBaretteDeRAM = QttDeGoDeRAM / GoModule;

  const empreinte =
    QttDeBaretteDeRAM * (GoModule * ramDieParGo * critereDie + critereBase);

  const resultatFinal = Number(empreinte.toFixed(1));
  return resultatFinal;
};

export const calculCritereGPU = (modeleGPU) => {
  const gpuData = {
    A100: 200,
    H100: 320,
    "Tesla V100": 175,
  };

  return gpuData[modeleGPU];
};

export const calculEmpreinteGPU = (modeleGPU, nbGPU) => {
  const critereGPU = calculCritereGPU(modeleGPU);
  const empreinte = nbGPU * critereGPU;
  return empreinte.toFixed(2);
};

export const calculEmpreinteSSD = ({
  quantiteGo, // ex: 10000
}) => {
  const goParSSD = 2000;
  const dieParGo = 0.0198;
  const critereDie = 2.2;
  const critereBase = 6.34;

  // 1. Calcul du nombre de SSDs (équivalent =B35/D35)
  const nombreSSDs = quantiteGo / goParSSD;

  // 2. Calcul de l'empreinte
  const empreinte =
    nombreSSDs * (goParSSD * dieParGo * critereDie + critereBase);

  return { empreinte, nombreSSDs: nombreSSDs.toFixed(2) };
};

export const calculEmpreinteAutres = (
  nbPowerSupplyUnit = 2,
  nbHDD,
  nbMotherboard = 1,
  nbRackServer = 1,
  nbBladeEnclosure = 0,
  nbBladeServer = 0,
  nbInterfaceCard = 1,
  nbServerAssembly = 1,
) => {
  const crPowerSupplyUnit = 24.3;
  const crHDD = 31.1;
  const crMotherboard = 66.1;
  const crRackServer = 150.0;
  const crBladeEnclosure = 880;
  const crBladeServer = 30.9;
  const crInterfaceCard = 33.05;
  const crServerAssembly = 6.68;

  const emprPowerSupplyUnit = nbPowerSupplyUnit * 2 * crPowerSupplyUnit;
  const emprHDD = nbHDD * crHDD;
  const emprMotherboard = nbMotherboard * crMotherboard;
  const emprRackServer = nbRackServer * crRackServer;
  const emprBladeEnclosure = nbBladeEnclosure * crBladeEnclosure;
  const emprBladeServer = nbBladeServer * crBladeServer;
  const emprInterfaceCard = nbInterfaceCard * crInterfaceCard;
  const emprServerAssembly = nbServerAssembly * crServerAssembly;

  const total =
    emprPowerSupplyUnit +
    emprHDD +
    emprMotherboard +
    emprRackServer +
    emprBladeEnclosure +
    emprBladeServer +
    emprInterfaceCard +
    emprServerAssembly;

  return total.toFixed(2);
};

const Footprint = () => {
  const cpuInput = document.getElementById("cpu-physical-input");
  const cpuResult = document.getElementById("cpu-footprint-result");

  const ramInput = document.getElementById("ram-input");
  const ramResult = document.getElementById("ram-footprint-result");

  const ramGoPerModule = document.getElementById("ram-go-per-module");
  const ramBaretteOutput = document.getElementById("ram-barette-output");

  const familyGpu1 = document.getElementById("gpu-family-1");
  const nbGpu1 = document.getElementById("gpu-nb-1");
  const gpuCriterion1 = document.getElementById("gpu-criterion-1");
  const gpuResult1 = document.getElementById("gpu-footprint-result-1");

  const familyGpu2 = document.getElementById("gpu-family-2");
  const nbGpu2 = document.getElementById("gpu-nb-2");
  const gpuCriterion2 = document.getElementById("gpu-criterion-2");
  const gpuResult2 = document.getElementById("gpu-footprint-result-2");

  const gpuResultTotal = document.getElementById("gpu-footprint-result");

  const ssdInput = document.getElementById("ssd-go-input");
  const ssdNb = document.getElementById("ssd-nb");
  const ssdResult = document.getElementById("ssd-footprint-result");

  const hddInput = document.getElementById("autres-hdd-input");
  const hddResult = document.getElementById("autres-hdd-footprint");
  const autresTotalResult = document.getElementById("autres-total-footprint");

  const totalCell = document.getElementById("global-total-divided");

  const updateRamGoOutput = () => {
    const value = ramInput.value / Number(ramGoPerModule.textContent);
    if (ramBaretteOutput) {
      ramBaretteOutput.textContent = value;
    }
  };

  const updateGpuTotal = () => {
    const gpu1 = Number(gpuResult1.textContent) || 0;
    const gpu2 = Number(gpuResult2.textContent) || 0;
    const totalGpu = gpu1 + gpu2;

    if (gpuResultTotal) {
      gpuResultTotal.textContent = totalGpu.toFixed(2);
    }
  };

  const updateTotal = () => {
    const cpu = Number(cpuResult.textContent) || 0;
    const ram = Number(ramResult.textContent) || 0;
    const gpu = Number(gpuResultTotal.textContent) || 0;
    const ssd = Number(ssdResult.textContent) || 0;
    const totalAutres = Number(autresTotalResult.textContent) || 0;

    const total = (cpu + ram + gpu + ssd + totalAutres).toFixed(2);

    if (totalCell) {
      totalCell.textContent = total;
    }
  };

  if (cpuInput && cpuResult) {
    cpuInput.addEventListener("input", () => {
      const value = cpuInput.value;
      const result = calculEmpreinteCPU(value);
      cpuResult.textContent = result;
      updateTotal();
    });
  }

  if (ramInput && ramResult) {
    ramInput.addEventListener("input", () => {
      const value = ramInput.value;
      const result = calculEmpreinteRAM(value);
      ramResult.textContent = result;
      updateRamGoOutput();
      updateTotal();
    });
  }

  if (familyGpu1 && nbGpu1 && gpuCriterion1 && gpuResult1) {
    const updateGpu1 = () => {
      const modeleGPU = familyGpu1.value;
      const nbGPU = nbGpu1.value;
      const critere = calculCritereGPU(modeleGPU);
      const empreinte = calculEmpreinteGPU(modeleGPU, nbGPU);
      gpuCriterion1.textContent = critere;
      gpuResult1.textContent = empreinte;
      updateGpuTotal();
      updateTotal();
    };

    familyGpu1.addEventListener("change", updateGpu1);
    nbGpu1.addEventListener("input", updateGpu1);
    updateGpu1();
  }

  if (familyGpu2 && nbGpu2 && gpuCriterion2 && gpuResult2) {
    const updateGpu2 = () => {
      const modeleGPU = familyGpu2.value;
      const nbGPU = nbGpu2.value;
      const critere = calculCritereGPU(modeleGPU);
      const empreinte = calculEmpreinteGPU(modeleGPU, nbGPU);
      gpuCriterion2.textContent = critere;
      gpuResult2.textContent = empreinte;
      updateGpuTotal();
      updateTotal();
    };

    familyGpu2.addEventListener("change", updateGpu2);
    nbGpu2.addEventListener("input", updateGpu2);
    updateGpu2();
  }

  if (ssdInput && ssdResult && ssdNb) {
    ssdInput.addEventListener("input", () => {
      const value = ssdInput.value;
      const result = calculEmpreinteSSD({ quantiteGo: value });
      ssdResult.textContent = result.empreinte.toFixed(2);
      ssdNb.textContent = result.nombreSSDs;
      updateTotal();
    });
  }

  if (hddInput && hddResult && autresTotalResult) {
    hddInput.addEventListener("input", () => {
      const value = hddInput.value;
      const hddFootprint = value * 31.1;
      const result = calculEmpreinteAutres(2, value, 1, 1, 0, 0, 1, 1);
      hddResult.textContent = hddFootprint;
      autresTotalResult.textContent = result;
      updateTotal();
    });
  }
};

export default Footprint;
