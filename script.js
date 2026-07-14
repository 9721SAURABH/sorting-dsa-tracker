const barsContainer = document.getElementById("barsContainer");
const sizeSlider = document.getElementById("sizeSlider");
const speedSlider = document.getElementById("speedSlider");
const algoSelect = document.getElementById("algoSelect");
const comparisonsEl = document.getElementById("comparisons");
const timeElapsedEl = document.getElementById("timeElapsed");

let array = [];
let comparisons = 0;
let sorting = false;

function generateArray() {
  if (sorting) return;
  const size = parseInt(sizeSlider.value);
  array = Array.from({ length: size }, () => Math.floor(Math.random() * 380) + 10);
  comparisons = 0;
  comparisonsEl.textContent = `Comparisons: 0`;
  timeElapsedEl.textContent = `Time: 0 ms`;
  renderBars();
}

function renderBars(activeIndices = [], sortedIndices = []) {
  barsContainer.innerHTML = "";
  array.forEach((val, i) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    if (sortedIndices.includes(i)) bar.classList.add("sorted");
    else if (activeIndices.includes(i)) bar.classList.add("compare");
    bar.style.height = `${val}px`;
    barsContainer.appendChild(bar);
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getSpeedDelay() {
  // Higher slider value = faster = lower delay
  return 105 - parseInt(speedSlider.value);
}

async function bubbleSort() {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      comparisonsEl.textContent = `Comparisons: ${comparisons}`;
      renderBars([j, j + 1]);
      await sleep(getSpeedDelay());
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        renderBars([j, j + 1]);
        await sleep(getSpeedDelay());
      }
    }
  }
  renderBars([], Array.from({ length: n }, (_, i) => i));
}

async function mergeSort(start = 0, end = array.length - 1) {
  if (start >= end) return;
  const mid = Math.floor((start + end) / 2);
  await mergeSort(start, mid);
  await mergeSort(mid + 1, end);
  await merge(start, mid, end);
}

async function merge(start, mid, end) {
  const left = array.slice(start, mid + 1);
  const right = array.slice(mid + 1, end + 1);
  let i = 0, j = 0, k = start;

  while (i < left.length && j < right.length) {
    comparisons++;
    comparisonsEl.textContent = `Comparisons: ${comparisons}`;
    renderBars([k]);
    await sleep(getSpeedDelay());
    if (left[i] <= right[j]) {
      array[k++] = left[i++];
    } else {
      array[k++] = right[j++];
    }
  }
  while (i < left.length) array[k++] = left[i++];
  while (j < right.length) array[k++] = right[j++];
  renderBars();
}

async function quickSort(start = 0, end = array.length - 1) {
  if (start >= end) return;
  const pivotIndex = await partition(start, end);
  await quickSort(start, pivotIndex - 1);
  await quickSort(pivotIndex + 1, end);
}

async function partition(start, end) {
  const pivot = array[end];
  let i = start - 1;
  for (let j = start; j < end; j++) {
    comparisons++;
    comparisonsEl.textContent = `Comparisons: ${comparisons}`;
    renderBars([j, end]);
    await sleep(getSpeedDelay());
    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  [array[i + 1], array[end]] = [array[end], array[i + 1]];
  return i + 1;
}

async function startSort() {
  if (sorting) return;
  sorting = true;
  comparisons = 0;
  const start = performance.now();

  const algo = algoSelect.value;
  if (algo === "bubble") await bubbleSort();
  else if (algo === "merge") await mergeSort();
  else if (algo === "quick") await quickSort();

  const end = performance.now();
  timeElapsedEl.textContent = `Time: ${Math.round(end - start)} ms`;
  renderBars([], Array.from({ length: array.length }, (_, i) => i));
  sorting = false;
}

document.getElementById("generateBtn").addEventListener("click", generateArray);
document.getElementById("sortBtn").addEventListener("click", startSort);
sizeSlider.addEventListener("input", generateArray);

generateArray();
