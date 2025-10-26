


/* =========================================================
   1. UPDATE BINARY DISPLAY
   ---------------------------------------------------------
   Converts decimal inputs A and B to binary according to
   the selected ALU mode (4-bit or 8-bit).
   ========================================================= */
function updateBinaryDisplay() {
  const mode = document.getElementById('mode').value;
  const bitWidth = mode === "4bit" ? 4 : 8;

  const A = parseInt(document.getElementById('A').value) || 0;
  const B = parseInt(document.getElementById('B').value) || 0;

  const A_bin = A.toString(2).padStart(bitWidth, '0');
  const B_bin = B.toString(2).padStart(bitWidth, '0');

  document.getElementById('A_bin').innerText = A_bin;
  document.getElementById('B_bin').innerText = B_bin;
}


/* =========================================================
   2. RUN ALU SIMULATION
   ---------------------------------------------------------
   Fetches simulation results from backend (/simulate),
   updates result panel, and calculates CPU flags.
   ========================================================= */
async function runALU() {

  /* --------------------------
     MODE & INPUT SETUP
  ---------------------------*/
  const mode = document.getElementById('mode').value;
  const bitWidth = mode === "4bit" ? 4 : 8;
  const maxVal = bitWidth === 4 ? 15 : 255;

  const A = parseInt(document.getElementById('A').value);
  const B = parseInt(document.getElementById('B').value);
  const SEL = document.getElementById('SEL').value;

  if (isNaN(A) || isNaN(B)) {
    alert("Please enter valid numbers for A and B");
    return;
  }

  // Always refresh binary display before running ALU
  updateBinaryDisplay();


  /* --------------------------
     SEND REQUEST TO BACKEND
  ---------------------------*/
  const res = await fetch('/simulate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ A, B, SEL, mode })
  });

  const data = await res.json();


  /* --------------------------
     UPDATE RESULT DISPLAY
  ---------------------------*/
  document.getElementById('resultBox').innerHTML = `
    <b>Mode:</b> ${mode.toUpperCase()}<br>
    <b>Operation:</b> ${data.operation}<br>
    <b>Result (Decimal):</b> ${data.result_dec}<br>
    <b>Result (Binary):</b> ${data.result_bin}
  `;


  /* =========================================================
     3. CPU FLAG LOGIC (CARRY, ZERO, OVERFLOW)
     ---------------------------------------------------------
     - Carry: Unsigned overflow beyond maxVal
     - Zero:  All bits of result are zero
     - Overflow: Signed overflow when MSBs mismatch
     ========================================================= */
  const resultVal = parseInt(data.result_dec);
  const resultBin = data.result_bin.slice(-bitWidth); // trim carry-out if any

  // Extract MSBs
  const msbA = (A >> (bitWidth - 1)) & 1;
  const msbB = (B >> (bitWidth - 1)) & 1;
  const msbR = parseInt(resultBin[0]); // MSB of result

  // Compute flag states
  const carryFlag = resultVal > maxVal;                         // Unsigned overflow
  const zeroFlag = (resultVal & ((1 << bitWidth) - 1)) === 0;   // All bits zero
  const overflowFlag = ((msbA === msbB) && (msbR !== msbA));    // Signed overflow


  /* --------------------------
     UPDATE FLAG INDICATORS
  ---------------------------*/
  document.getElementById('carryFlag').className = carryFlag ? 'flag on' : 'flag off';
  document.getElementById('zeroFlag').className = zeroFlag ? 'flag on' : 'flag off';
  document.getElementById('overflowFlag').className = overflowFlag ? 'flag on' : 'flag off';
}
