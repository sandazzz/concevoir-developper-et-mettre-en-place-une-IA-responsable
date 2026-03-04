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

    const hddInput = document.getElementById("autres-hdd-input");
    const hddResult = document.getElementById("autres-hdd-footprint");
    const autresTotalResult = document.getElementById("autres-total-footprint");

    const totalCell = document.getElementById("global-total-divided");

    const updateTotal = () => {
      const cpu = Number(cpuResult.textContent) || 0;
      const ram = Number(ramResult.textContent) || 0;
      const totalAutres = Number(autresTotalResult.textContent) || 0;

      const total = ((cpu + ram + totalAutres) / 1000).toFixed(2);

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
