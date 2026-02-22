const calculEmpreinteCPU = (nBCpusPhysiques, vCpuParCpu = 32) => {
  const empreinte =
    nBCpusPhysiques * ((vCpuParCpu * 0.173333333333 + 0.491) * 1.97 + 9.14);

  console.log("empreinte brute :", empreinte);

  const resultatFinal = Number(empreinte.toFixed(1));

  console.log("résultat final :", resultatFinal);

  return resultatFinal;
};

const calculEmpreinteRAM = (QttDeGoDeRAM, GoModule = 128) => {
  const ramDieParGo = 0.596666666666667;
  const critereDie = 2.2;
  const critereBase = 5.22;
  const QttDeBaretteDeRAM = QttDeGoDeRAM / GoModule;

  const empreinte =
    QttDeBaretteDeRAM * (GoModule * ramDieParGo * critereDie + critereBase);

  console.log("empreinte brute :", empreinte);

  const resultatFinal = Number(empreinte.toFixed(1));

  console.log("résultat final :", resultatFinal);
  
  return resultatFinal;
};

const calculEmpreinteAutres = (
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

module.exports = {
  calculEmpreinteCPU,
  calculEmpreinteRAM,
  calculEmpreinteAutres,
};
