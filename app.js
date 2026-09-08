/**
 * Day 1: Parallel Computing & OpenMP — Master Interactive Engine
 * From One Chef -> Multiple Chefs -> Parallel Kitchen
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initArchTabs();
  initAmdahlCalculator();
  initCodeLab();
  initQueueSimulator();
  initRaceSimulator();
  initSchedulingSimulator();
  initChecklist();
});

/* ==========================================================================
   1. Theme Toggle
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  const body = document.body;
  const icon = toggleBtn.querySelector('.toggle-icon');

  const savedTheme = localStorage.getItem('pc101_theme') || 'theme-dark';
  body.className = savedTheme;
  icon.textContent = savedTheme === 'theme-dark' ? '☀️' : '🌙';

  toggleBtn.addEventListener('click', () => {
    if (body.classList.contains('theme-dark')) {
      body.classList.replace('theme-dark', 'theme-light');
      icon.textContent = '🌙';
      localStorage.setItem('pc101_theme', 'theme-light');
    } else {
      body.classList.replace('theme-light', 'theme-dark');
      icon.textContent = '☀️';
      localStorage.setItem('pc101_theme', 'theme-dark');
    }
    // Re-render chart for theme contrast
    if (window.renderAmdahlChart) window.renderAmdahlChart();
  });
}

/* ==========================================================================
   2. Architecture Tabs
   ========================================================================== */
function initArchTabs() {
  const tabBtns = document.querySelectorAll('#archTabs .tab-btn');
  const tabContents = document.querySelectorAll('#archTabs .tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const activeContent = document.getElementById(target);
      if (activeContent) activeContent.classList.add('active');
    });
  });
}

/* ==========================================================================
   3. Interactive Amdahl's Law Calculator & Live Canvas Chart
   ========================================================================== */
function initAmdahlCalculator() {
  const serialSlider = document.getElementById('serialFractionSlider');
  const coresSlider = document.getElementById('numCoresSlider');
  const serialVal = document.getElementById('serialVal');
  const parallelVal = document.getElementById('parallelVal');
  const coresVal = document.getElementById('coresVal');
  const actualSpeedup = document.getElementById('actualSpeedup');
  const efficiencyVal = document.getElementById('efficiencyVal');
  const maxSpeedup = document.getElementById('maxSpeedup');
  const canvas = document.getElementById('amdahlChart');
  const ctx = canvas.getContext('2d');

  function updateCalculations() {
    const S = parseFloat(serialSlider.value) / 100;
    const P = 1 - S;
    const N = parseInt(coresSlider.value, 10);

    serialVal.textContent = `${Math.round(S * 100)}%`;
    parallelVal.textContent = `${Math.round(P * 100)}%`;
    coresVal.textContent = `${N} ${N === 1 ? 'Chef (Core)' : 'Chefs (Cores)'}`;

    // Amdahl's law: Speedup = 1 / (S + P/N)
    const speedup = 1 / (S + (P / N));
    const efficiency = (speedup / N) * 100;
    const maxS = S === 0 ? '∞' : (1 / S).toFixed(2) + '×';

    actualSpeedup.textContent = `${speedup.toFixed(2)}×`;
    efficiencyVal.textContent = `${efficiency.toFixed(1)}%`;
    maxSpeedup.textContent = maxS;

    drawChart(S, P, N);
  }

  function drawChart(S, P, currentN) {
    const isDark = document.body.classList.contains('theme-dark');
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const padLeft = 45;
    const padBottom = 35;
    const padTop = 20;
    const padRight = 20;
    const chartW = width - padLeft - padRight;
    const chartH = height - padTop - padBottom;

    const maxN = 32;
    const maxTheoretical = S === 0 ? 16 : Math.min(16, Math.ceil(1 / S) + 2);
    const yMax = Math.max(8, maxTheoretical);

    // Draw Grid Lines
    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
    ctx.lineWidth = 1;
    ctx.font = '10px Fira Code';
    ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';

    for (let y = 0; y <= yMax; y += 2) {
      const yPos = padTop + chartH - (y / yMax) * chartH;
      ctx.beginPath();
      ctx.moveTo(padLeft, yPos);
      ctx.lineTo(padLeft + chartW, yPos);
      ctx.stroke();
      ctx.fillText(`${y}×`, 10, yPos + 3);
    }

    // X Axis Labels
    const xTicks = [1, 4, 8, 16, 24, 32];
    xTicks.forEach(n => {
      const xPos = padLeft + ((n - 1) / (maxN - 1)) * chartW;
      ctx.fillText(`${n}`, xPos - 4, height - 12);
    });

    // Draw Ideal Linear Speedup (N)
    ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(14, 165, 233, 0.3)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    for (let n = 1; n <= maxN; n++) {
      const x = padLeft + ((n - 1) / (maxN - 1)) * chartW;
      const y = padTop + chartH - (Math.min(n, yMax) / yMax) * chartH;
      if (n === 1) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Asymptote (Theoretical Max)
    if (S > 0) {
      const maxLimit = 1 / S;
      const yLimitPos = padTop + chartH - (Math.min(maxLimit, yMax) / yMax) * chartH;
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.5)';
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(padLeft, yLimitPos);
      ctx.lineTo(padLeft + chartW, yLimitPos);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw Actual Amdahl Curve
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    let curDotX = 0;
    let curDotY = 0;

    for (let n = 1; n <= maxN; n++) {
      const sn = 1 / (S + (P / n));
      const x = padLeft + ((n - 1) / (maxN - 1)) * chartW;
      const y = padTop + chartH - (Math.min(sn, yMax) / yMax) * chartH;
      if (n === 1) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);

      if (n === currentN) {
        curDotX = x;
        curDotY = y;
      }
    }
    ctx.stroke();

    // Draw Active Dot
    if (curDotX > 0) {
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(curDotX, curDotY, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  serialSlider.addEventListener('input', updateCalculations);
  coresSlider.addEventListener('input', updateCalculations);

  window.renderAmdahlChart = updateCalculations;
  updateCalculations();
}

/* ==========================================================================
   4. OpenMP Hands-on Code Lab
   ========================================================================== */
const CODE_DATABASE = {
  hello: {
    fileName: 'hello_openmp.c',
    code: `#include <stdio.h>
#include <omp.h>

int main()
{
    // Set number of threads to 4
    omp_set_num_threads(4);

    #pragma omp parallel
    {
        // Each thread obtains its unique worker ID (0, 1, 2, 3)
        int id = omp_get_thread_num();
        int total = omp_get_num_threads();

        printf("👨🍳 Chef %d reporting for duty! (Total Chefs = %d)\\n", id, total);
    }

    return 0;
}`,
    explanation: `
      <p><strong>Core Directives & Functions:</strong></p>
      <ul>
        <li><code>#include &lt;omp.h&gt;</code>: Provides headers and prototypes for OpenMP runtime functions.</li>
        <li><code>#pragma omp parallel</code>: Directs the compiler to fork a team of concurrent threads executing the enclosed block.</li>
        <li><code>omp_get_thread_num()</code>: Returns the calling thread's unique index (starting at 0 for the Master thread).</li>
        <li><em>Note:</em> The execution order in terminal is non-deterministic because OS schedules threads concurrently!</li>
      </ul>
    `,
    compileCmd: 'gcc -fopenmp hello_openmp.c -o hello.exe',
    runCmd: './hello.exe'
  },
  'parallel-for': {
    fileName: 'array_parallel_for.c',
    code: `#include <stdio.h>
#include <omp.h>

#define N 10

int main()
{
    int A[N];

    // OpenMP splits the 10 loop iterations across available threads
    #pragma omp parallel for
    for(int i = 0; i < N; i++)
    {
        int tid = omp_get_thread_num();
        A[i] = i * i;
        printf("Thread %d processed index %d -> %d\\n", tid, i, A[i]);
    }

    printf("\\nFinal Array Result:\\n");
    for(int i = 0; i < N; i++) {
        printf("%d ", A[i]);
    }
    printf("\\n");

    return 0;
}`,
    explanation: `
      <p><strong>Parallelizing Loops:</strong></p>
      <ul>
        <li><code>#pragma omp parallel for</code>: Automatically divides independent loop iterations (orders) among active threads.</li>
        <li>The loop iteration variable <code>i</code> is made <strong>private</strong> to each thread by default.</li>
        <li>Array <code>A</code> is <strong>shared</strong> so all threads write to their assigned disjoint slice without collisions.</li>
      </ul>
    `,
    compileCmd: 'gcc -fopenmp array_parallel_for.c -o array_loop.exe',
    runCmd: './array_loop.exe'
  },
  'race-condition': {
    fileName: 'race_condition_bug.c',
    code: `#include <stdio.h>
#include <omp.h>

int main()
{
    int sum = 0;

    // ⚠️ BUG: Multiple threads modify 'sum' simultaneously without synchronization!
    #pragma omp parallel for
    for(int i = 1; i <= 1000; i++)
    {
        sum += i; // READ -> MODIFY -> WRITE data race!
    }

    printf("Buggy Sum = %d (Expected: 500500)\\n", sum);

    // 🛡️ FIX using critical directive:
    int safe_sum = 0;
    #pragma omp parallel for
    for(int i = 1; i <= 1000; i++)
    {
        #pragma omp critical
        {
            safe_sum += i; // Only 1 thread enters at a time!
        }
    }

    printf("Safe Sum with Critical = %d\\n", safe_sum);
    return 0;
}`,
    explanation: `
      <p><strong>The Shared Cash Register Bug:</strong></p>
      <ul>
        <li>When multiple threads perform <code>sum += i</code> concurrently, read/modify/write steps interleave, resulting in lost updates.</li>
        <li><code>#pragma omp critical</code>: Enforces mutual exclusion — only one thread is permitted into the critical cash counter at a time.</li>
        <li><em>Drawback of critical:</em> Other threads are forced to wait in queue, introducing serialization overhead!</li>
      </ul>
    `,
    compileCmd: 'gcc -fopenmp race_condition_bug.c -o race.exe',
    runCmd: './race.exe'
  },
  reduction: {
    fileName: 'sum_reduction.c',
    code: `#include <stdio.h>
#include <omp.h>

int main()
{
    int sum = 0;

    // 🚀 Optimal Shared-Memory Reduction
    #pragma omp parallel for reduction(+:sum)
    for(int i = 1; i <= 1000; i++)
    {
        sum += i; // Each thread accumulates into private local copy
    }

    // At loop exit, OpenMP combines all local sums into the master sum!
    printf("Correct Parallel Sum = %d (Expected 500500)\\n", sum);

    return 0;
}`,
    explanation: `
      <p><strong>The Reduction Clause:</strong></p>
      <ul>
        <li><code>reduction(+:sum)</code>: Gives each thread a private accumulator initialized to 0.</li>
        <li>Threads sum their own slice locally at full CPU speed without locks or waiting.</li>
        <li>When all threads complete, OpenMP adds together the local sums in a tree reduction.</li>
        <li>Supports operators: <code>+</code>, <code>*</code>, <code>-</code>, <code>min</code>, <code>max</code>, <code>&</code>, <code>|</code>.</li>
      </ul>
    `,
    compileCmd: 'gcc -fopenmp sum_reduction.c -o reduction.exe',
    runCmd: './reduction.exe'
  },
  scheduling: {
    fileName: 'loop_scheduling.c',
    code: `#include <stdio.h>
#include <omp.h>
#include <unistd.h>

int main()
{
    printf("--- Static Scheduling (Equal chunks before loop) ---\\n");
    #pragma omp parallel for schedule(static, 2)
    for(int i = 0; i < 8; i++) {
        printf("Static: Thread %d handling task %d\\n", omp_get_thread_num(), i);
    }

    printf("\\n--- Dynamic Scheduling (Grab chunk when idle) ---\\n");
    #pragma omp parallel for schedule(dynamic, 1)
    for(int i = 0; i < 8; i++) {
        printf("Dynamic: Thread %d handling task %d\\n", omp_get_thread_num(), i);
    }

    return 0;
}`,
    explanation: `
      <p><strong>Static vs Dynamic Scheduling:</strong></p>
      <ul>
        <li><code>schedule(static, chunk)</code>: Deterministically distributes chunks to threads before loop execution. Lowest scheduling overhead.</li>
        <li><code>schedule(dynamic, chunk)</code>: Threads pull next available chunk from a shared work-queue upon finishing. Perfect for uneven workloads (e.g. quick tea vs slow biryani).</li>
      </ul>
    `,
    compileCmd: 'gcc -fopenmp loop_scheduling.c -o schedule.exe',
    runCmd: './schedule.exe'
  },
  matrix: {
    fileName: 'matrix_mult_collapse.c',
    code: `#include <stdio.h>
#include <omp.h>

#define N 3

int main()
{
    int A[N][N] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    int B[N][N] = {{9, 8, 7}, {6, 5, 4}, {3, 2, 1}};
    int C[N][N] = {0};

    // collapse(2) merges the 2 outer loops into a single N*N iteration space!
    #pragma omp parallel for collapse(2)
    for(int i = 0; i < N; i++)
    {
        for(int j = 0; j < N; j++)
        {
            int sum = 0;
            for(int k = 0; k < N; k++)
            {
                sum += A[i][k] * B[k][j];
            }
            C[i][j] = sum;
        }
    }

    printf("Result Matrix C (3x3):\\n");
    for(int i = 0; i < N; i++) {
        for(int j = 0; j < N; j++) {
            printf("%4d ", C[i][j]);
        }
        printf("\\n");
    }

    return 0;
}`,
    explanation: `
      <p><strong>Matrix Multiplication & collapse(2):</strong></p>
      <ul>
        <li>Computing each element <code>C[i][j]</code> is completely independent (like calculating separate table bills).</li>
        <li><code>collapse(2)</code>: Flattens the <code>i</code> and <code>j</code> nested loops into a single large loop of size \(N \times N\), exposing greater parallelism to the thread pool.</li>
      </ul>
    `,
    compileCmd: 'gcc -fopenmp matrix_mult_collapse.c -o matmult.exe',
    runCmd: './matmult.exe'
  },
  timing: {
    fileName: 'benchmark_wtime.c',
    code: `#include <stdio.h>
#include <omp.h>

#define SIZE 20000000

int main()
{
    static double arr[SIZE];
    double start_time, end_time, elapsed;

    for(int threads = 1; threads <= 4; threads *= 2)
    {
        omp_set_num_threads(threads);

        start_time = omp_get_wtime();

        #pragma omp parallel for
        for(int i = 0; i < SIZE; i++) {
            arr[i] = i * 0.5 + 3.14159;
        }

        end_time = omp_get_wtime();
        elapsed = end_time - start_time;

        printf("Threads: %d | Time: %f seconds\\n", threads, elapsed);
    }

    return 0;
}`,
    explanation: `
      <p><strong>High-Resolution Wall-Clock Benchmarking:</strong></p>
      <ul>
        <li><code>omp_get_wtime()</code>: Returns elapsed wall-clock time in seconds with microsecond resolution.</li>
        <li>Formula: <code>Time = end_time - start_time</code>.</li>
        <li>Compute <code>Speedup = Time_1 / Time_N</code> to experimentally verify your workshop performance scaling!</li>
      </ul>
    `,
    compileCmd: 'gcc -fopenmp benchmark_wtime.c -o benchmark.exe',
    runCmd: './benchmark.exe'
  }
};

function initCodeLab() {
  const tabs = document.querySelectorAll('#codeLabNav .lab-tab');
  const codeContent = document.getElementById('codeContent');
  const fileName = document.getElementById('currentFileName');
  const expBody = document.getElementById('expBody');
  const compileCmd = document.getElementById('compileCmd');
  const runCmd = document.getElementById('runCmd');
  const copyBtn = document.getElementById('copyCodeBtn');

  function renderLab(key) {
    const data = CODE_DATABASE[key];
    if (!data) return;

    fileName.textContent = data.fileName;
    codeContent.textContent = data.code;
    expBody.innerHTML = data.explanation;
    compileCmd.textContent = data.compileCmd;
    runCmd.textContent = data.runCmd;

    tabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-code') === key));
  }

  tabs.forEach(t => {
    t.addEventListener('click', () => {
      renderLab(t.getAttribute('data-code'));
    });
  });

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(codeContent.textContent).then(() => {
      const origText = copyBtn.innerHTML;
      copyBtn.innerHTML = '<span>✅ Copied!</span>';
      setTimeout(() => {
        copyBtn.innerHTML = origText;
      }, 1800);
    });
  });

  renderLab('hello');
}

/* ==========================================================================
   5. Live Simulator 1: Order Queue Simulation
   ========================================================================== */
function initQueueSimulator() {
  const runBtn = document.getElementById('btnRunQueueSim');
  const resetBtn = document.getElementById('btnResetQueueSim');
  const chefsSelect = document.getElementById('queueChefsSelect');
  const lanesContainer = document.getElementById('chefsLanesContainer');
  const timeElapsedEl = document.getElementById('queueTimeElapsed');
  const throughputEl = document.getElementById('queueThroughput');
  const progressBar = document.getElementById('queueTotalProgress');

  let simTimer = null;
  let isRunning = false;
  const TOTAL_ORDERS = 40;

  function renderLanes() {
    const numChefs = parseInt(chefsSelect.value, 10);
    lanesContainer.innerHTML = '';

    for (let c = 0; c < numChefs; c++) {
      const row = document.createElement('div');
      row.className = 'lane-row';
      row.innerHTML = `
        <div class="lane-chef">👨🍳 Chef ${c}</div>
        <div class="lane-slots" id="laneSlots_${c}"></div>
      `;
      lanesContainer.appendChild(row);
    }
  }

  function resetSim() {
    if (simTimer) clearInterval(simTimer);
    isRunning = false;
    timeElapsedEl.textContent = '0.0s';
    throughputEl.textContent = '0 orders/s';
    progressBar.style.width = '0%';
    renderLanes();
  }

  function startSim() {
    if (isRunning) return;
    resetSim();
    isRunning = true;

    const numChefs = parseInt(chefsSelect.value, 10);
    let ordersDone = 0;
    let seconds = 0.0;
    const ordersPerChef = Math.ceil(TOTAL_ORDERS / numChefs);

    // Initialize slots in each lane
    for (let c = 0; c < numChefs; c++) {
      const slotsEl = document.getElementById(`laneSlots_${c}`);
      for (let o = 0; o < ordersPerChef; o++) {
        const orderId = c * ordersPerChef + o + 1;
        if (orderId <= TOTAL_ORDERS) {
          const slot = document.createElement('div');
          slot.className = 'slot-item';
          slot.id = `slot_${orderId}`;
          slot.textContent = `#${orderId}`;
          slotsEl.appendChild(slot);
        }
      }
    }

    let activeOrderIndex = 0;
    simTimer = setInterval(() => {
      seconds += 0.2;
      timeElapsedEl.textContent = `${seconds.toFixed(1)}s`;

      // Process 1 order per chef in parallel
      for (let c = 0; c < numChefs; c++) {
        const orderId = c * ordersPerChef + Math.floor(seconds / 0.4);
        if (orderId <= TOTAL_ORDERS) {
          const slot = document.getElementById(`slot_${orderId}`);
          if (slot && !slot.classList.contains('done')) {
            slot.className = 'slot-item done';
            ordersDone++;
          }
        }
      }

      const progress = Math.min(100, (ordersDone / TOTAL_ORDERS) * 100);
      progressBar.style.width = `${progress}%`;
      const tp = seconds > 0 ? (ordersDone / seconds).toFixed(1) : 0;
      throughputEl.textContent = `${tp} orders/s`;

      if (ordersDone >= TOTAL_ORDERS || seconds >= 12.0) {
        clearInterval(simTimer);
        isRunning = false;
        progressBar.style.width = '100%';
      }
    }, 200);
  }

  runBtn.addEventListener('click', startSim);
  resetBtn.addEventListener('click', resetSim);
  chefsSelect.addEventListener('change', resetSim);

  renderLanes();
}

/* ==========================================================================
   6. Live Simulator 2: Shared Cash Register Race Condition
   ========================================================================== */
function initRaceSimulator() {
  const btnBuggy = document.getElementById('btnSimulateBuggyCash');
  const btnSafe = document.getElementById('btnSimulateSafeReduction');
  const display = document.getElementById('registerDisplay');
  const status = document.getElementById('registerStatus');
  const chef1Action = document.getElementById('chef1Action');
  const chef2Action = document.getElementById('chef2Action');
  const raceLog = document.getElementById('raceLog');

  btnBuggy.addEventListener('click', () => {
    display.textContent = '₹100';
    status.textContent = 'SIMULTANEOUS UNSYNCHRONIZED ACCESS';
    status.style.color = '#f43f5e';

    chef1Action.textContent = '1. Reads current value: ₹100';
    chef2Action.textContent = '1. Reads current value: ₹100';
    raceLog.textContent = 'Both threads read ₹100 into local registers at the exact same clock cycle!';

    setTimeout(() => {
      chef1Action.textContent = '2. Computes ₹100 + ₹50 = ₹150, writes ₹150';
      display.textContent = '₹150';
      raceLog.textContent = 'Chef 1 writes ₹150 to memory. But Chef 2 still has stale ₹100 in CPU register...';
    }, 1200);

    setTimeout(() => {
      chef2Action.textContent = '2. Computes ₹100 + ₹30 = ₹130, writes ₹130';
      display.textContent = '₹130 (CORRUPTED!)';
      display.style.color = '#f43f5e';
      raceLog.innerHTML = '❌ <strong>DATA RACE DISASTER:</strong> Chef 2 blindly overwrote ₹150 with ₹130. ₹50 was permanently lost! Expected: ₹180.';
    }, 2500);
  });

  btnSafe.addEventListener('click', () => {
    display.textContent = '₹100';
    display.style.color = '#38bdf8';
    status.textContent = 'REDUCTION (LOCAL ACCUMULATION)';
    status.style.color = '#10b981';

    chef1Action.textContent = '1. Private local accumulator = ₹50';
    chef2Action.textContent = '1. Private local accumulator = ₹30';
    raceLog.textContent = 'Each thread works on its own isolated private stack memory without touching the shared register.';

    setTimeout(() => {
      chef1Action.textContent = '2. Finished local slice (+₹50)';
      chef2Action.textContent = '2. Finished local slice (+₹30)';
      display.textContent = '₹100 + (₹50 + ₹30)';
      raceLog.textContent = 'OpenMP reduction combines private results via tree reduction: 100 + 50 + 30...';
    }, 1200);

    setTimeout(() => {
      display.textContent = '₹180 (PERFECT)';
      display.style.color = '#10b981';
      raceLog.innerHTML = '✅ <strong>SAFE REDUCTION SUCCESS:</strong> Zero lock contention, full CPU throughput, exact correct sum of ₹180 achieved!';
    }, 2400);
  });
}

/* ==========================================================================
   7. Live Simulator 3: Scheduling Simulator
   ========================================================================== */
function initSchedulingSimulator() {
  const btnStatic = document.getElementById('btnScheduleStatic');
  const btnDynamic = document.getElementById('btnScheduleDynamic');
  const container = document.getElementById('scheduleLanesWrapper');
  const summary = document.getElementById('scheduleSummary');

  // Workload: 4 Biryanis (heavy) and 4 Teas (light)
  function renderStatic() {
    container.innerHTML = `
      <div class="lane-row">
        <div class="lane-chef">👨🍳 Chef 0</div>
        <div class="lane-slots">
          <span class="sched-item biryani">🍲 Biryani 1 (4s)</span>
          <span class="sched-item biryani">🍲 Biryani 2 (4s)</span>
          <span class="sched-item biryani">🍲 Biryani 3 (4s)</span>
          <span class="sched-item biryani">🍲 Biryani 4 (4s)</span>
          <small style="color:#f43f5e; font-weight:700;">(Total: 16s Overloaded!)</small>
        </div>
      </div>
      <div class="lane-row">
        <div class="lane-chef">👨🍳 Chef 1</div>
        <div class="lane-slots">
          <span class="sched-item tea">☕ Tea 1 (1s)</span>
          <span class="sched-item tea">☕ Tea 2 (1s)</span>
          <span class="sched-item tea">☕ Tea 3 (1s)</span>
          <span class="sched-item tea">☕ Tea 4 (1s)</span>
          <small style="color:#38bdf8; font-weight:700;">(Finished in 4s -> IDLE for 12s!)</small>
        </div>
      </div>
    `;
    summary.innerHTML = `
      ⚠️ <strong>Static Scheduling Issue:</strong> Chunks are assigned ahead of time. Chef 1 finishes fast teas in 4 seconds and sits idle, while Chef 0 sweats for 16 seconds. <em>Total time = 16 seconds (Poor Load Balance).</em>
    `;
  }

  function renderDynamic() {
    container.innerHTML = `
      <div class="lane-row">
        <div class="lane-chef">👨🍳 Chef 0</div>
        <div class="lane-slots">
          <span class="sched-item biryani">🍲 Biryani 1 (4s)</span>
          <span class="sched-item biryani">🍲 Biryani 2 (4s)</span>
          <span class="sched-item tea">☕ Tea 3 (1s)</span>
          <span class="sched-item tea">☕ Tea 4 (1s)</span>
          <small style="color:#10b981; font-weight:700;">(Total: 10s)</small>
        </div>
      </div>
      <div class="lane-row">
        <div class="lane-chef">👨🍳 Chef 1</div>
        <div class="lane-slots">
          <span class="sched-item biryani">🍲 Biryani 3 (4s)</span>
          <span class="sched-item biryani">🍲 Biryani 4 (4s)</span>
          <span class="sched-item tea">☕ Tea 1 (1s)</span>
          <span class="sched-item tea">☕ Tea 2 (1s)</span>
          <small style="color:#10b981; font-weight:700;">(Total: 10s)</small>
        </div>
      </div>
    `;
    summary.innerHTML = `
      ✅ <strong>Dynamic Scheduling Balance:</strong> Whenever a chef finishes an item, they pull the next available order from the shared work pool. Both chefs finish in ~10 seconds! <em>Perfect for unpredictable loop workloads.</em>
    `;
  }

  btnStatic.addEventListener('click', renderStatic);
  btnDynamic.addEventListener('click', renderDynamic);
  renderStatic();
}

/* ==========================================================================
   8. 10 Golden Must-Understand Concepts Checklist
   ========================================================================== */
const MUST_KNOW_CONCEPTS = [
  {
    id: 1,
    title: '1. What is Parallel Computing?',
    desc: 'Dividing a computational problem into concurrent sub-tasks executed across multiple processing cores simultaneously.'
  },
  {
    id: 2,
    title: '2. Sequential vs Parallel Execution',
    desc: '1 Chef cooking 100 orders one-by-one vs 4 Chefs cooking 25 orders each concurrently in the kitchen.'
  },
  {
    id: 3,
    title: '3. Process vs Thread',
    desc: 'A Process has its own independent address space (MPI). A Thread is a lightweight worker sharing memory with sibling threads (OpenMP).'
  },
  {
    id: 4,
    title: '4. CPU Core',
    desc: 'A distinct physical silicon execution unit with registers and ALU capable of running an independent thread instruction stream.'
  },
  {
    id: 5,
    title: '5. SIMD vs MIMD',
    desc: 'SIMD: All chefs chop one tomato together (Vector/GPU). MIMD: Each chef prepares a completely different recipe (Multicore CPU).'
  },
  {
    id: 6,
    title: '6. Shared vs Distributed Memory',
    desc: 'Shared: 1 kitchen, 1 central refrigerator (OpenMP). Distributed: Separate restaurant branches communicating by message delivery (MPI).'
  },
  {
    id: 7,
    title: '7. Speedup (S = Ts / Tp)',
    desc: 'The ratio of single-thread sequential runtime over parallel multi-threaded runtime. 100s / 25s = 4.0×.'
  },
  {
    id: 8,
    title: '8. Parallel Efficiency (E = S / N)',
    desc: 'Percentage of hardware capacity utilized. E.g. Speedup 3.2 on 4 cores = 80% efficiency.'
  },
  {
    id: 9,
    title: '9. Amdahl’s Law & The Cashier Bottleneck',
    desc: 'Maximum theoretical speedup is strictly capped by the serial fraction S: Max Speedup = 1 / S.'
  },
  {
    id: 10,
    title: '10. OpenMP Core Directives',
    desc: 'Proficiency with #pragma omp parallel, parallel for, reduction(+:sum), critical, collapse(2), and schedule().'
  }
];

function initChecklist() {
  const grid = document.getElementById('checklistGrid');
  const scoreBadge = document.getElementById('readinessScore');
  const fill = document.getElementById('readinessFill');

  let completedSet = new Set(JSON.parse(localStorage.getItem('pc101_checklist') || '[]'));

  function updateScore() {
    const count = completedSet.size;
    const pct = (count / MUST_KNOW_CONCEPTS.length) * 100;
    scoreBadge.textContent = `${count} / ${MUST_KNOW_CONCEPTS.length} Completed`;
    fill.style.width = `${pct}%`;
    localStorage.setItem('pc101_checklist', JSON.stringify(Array.from(completedSet)));
  }

  MUST_KNOW_CONCEPTS.forEach(item => {
    const card = document.createElement('div');
    const isDone = completedSet.has(item.id);
    card.className = `check-item ${isDone ? 'completed' : ''}`;
    card.id = `check_card_${item.id}`;

    card.innerHTML = `
      <div class="check-box-custom">${isDone ? '✓' : ''}</div>
      <div class="check-content">
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
      </div>
    `;

    card.addEventListener('click', () => {
      if (completedSet.has(item.id)) {
        completedSet.delete(item.id);
        card.classList.remove('completed');
        card.querySelector('.check-box-custom').textContent = '';
      } else {
        completedSet.add(item.id);
        card.classList.add('completed');
        card.querySelector('.check-box-custom').textContent = '✓';
      }
      updateScore();
    });

    grid.appendChild(card);
  });

  updateScore();
}
