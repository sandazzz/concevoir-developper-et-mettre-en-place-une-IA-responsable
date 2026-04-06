export function updateTotal(IdNumber) {
  const totalCPU = document.getElementById(`cpu-footprint-result-${IdNumber}`);
  const totalRAM = document.getElementById(`ram-footprint-result-${IdNumber}`);
  const totalGPU = document.getElementById(`gpu-footprint-result-${IdNumber}`);
  const totalSSD = document.getElementById(`ssd-footprint-result-${IdNumber}`);
  const totalAutres = document.getElementById(
    `autres-total-footprint-${IdNumber}`,
  );
  const total = document.getElementById(`global-total-${IdNumber}`);

  const cpuValue = Number(totalCPU ? totalCPU.textContent : 0);
  const ramValue = Number(totalRAM ? totalRAM.textContent : 0);
  const gpuValue = Number(totalGPU ? totalGPU.textContent : 0);
  const ssdValue = Number(totalSSD ? totalSSD.textContent : 0);
  const autresValue = Number(totalAutres ? totalAutres.textContent : 0);

  const totalValue = (
    cpuValue +
    ramValue +
    gpuValue +
    ssdValue +
    autresValue
  ).toFixed(2);

  if (total) {
    total.textContent = totalValue;
  }
}
