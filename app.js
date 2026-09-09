/**
 * 2-Day Parallel Computing Masterclass — Complete Interactive Engine
 * Day 1: OpenMP (Shared Memory) & Day 2: MPI, GPU & Hybrid (Distributed Memory)
 */

let CURRENT_DAY = 'day2'; // Default to Day 2

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initDaySwitcher();
  initArchTabs();
  initCodeLab();
  initChecklist();

  // Day 1 Simulators
  initDay1QueueSimulator();
  initDay1RaceSimulator();

  // Day 2 Simulators
  initDay2MpiP2PSimulator();
  initDay2CollectiveSimulator();
  initDay2GpuSimulator();

  // Initial render for active day
  switchDayView('day2');
});

/* ==========================================================================
   1. Theme Toggle
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  const body = document.getElementById('appBody');
  const icon = toggleBtn.querySelector('.toggle-icon');

  const savedTheme = localStorage.getItem('pc_theme') || 'theme-dark';
  body.classList.remove('theme-dark', 'theme-light');
  body.classList.add(savedTheme);
  icon.textContent = savedTheme === 'theme-dark' ? '☀️' : '🌙';

  toggleBtn.addEventListener('click', () => {
    if (body.classList.contains('theme-dark')) {
      body.classList.replace('theme-dark', 'theme-light');
      icon.textContent = '🌙';
      localStorage.setItem('pc_theme', 'theme-light');
    } else {
      body.classList.replace('theme-light', 'theme-dark');
      icon.textContent = '☀️';
      localStorage.setItem('pc_theme', 'theme-dark');
    }
  });
}

/* ==========================================================================
   2. Day Switcher (Day 1 OpenMP vs Day 2 MPI/GPU)
   ========================================================================== */
function initDaySwitcher() {
  const btnD1 = document.getElementById('btnSwitchDay1');
  const btnD2 = document.getElementById('btnSwitchDay2');

  btnD1.addEventListener('click', () => switchDayView('day1'));
  btnD2.addEventListener('click', () => switchDayView('day2'));
}

function switchDayView(day) {
  CURRENT_DAY = day;
  const body = document.getElementById('appBody');
  const btnD1 = document.getElementById('btnSwitchDay1');
  const btnD2 = document.getElementById('btnSwitchDay2');
  const dayBadge = document.getElementById('currentDayBadge');
  const heroPillText = document.getElementById('heroPillText');
  const heroTitle = document.getElementById('heroTitle');
  const heroSubtitle = document.getElementById('heroSubtitle');

  if (day === 'day1') {
    body.classList.replace('day-view-day2', 'day-view-day1');
    btnD1.classList.add('active');
    btnD2.classList.remove('active');
    dayBadge.textContent = 'Day 1 • OpenMP';
    heroPillText.textContent = 'Day 1 Active • Shared Memory, OpenMP & Performance Fundamentals';
    heroTitle.innerHTML = 'From <span class="gradient-text-accent">One Chef</span> to a <br class="br-desktop"><span class="gradient-text-primary">High-Performance Shared Kitchen</span>';
    heroSubtitle.innerHTML = 'Mastering multi-threaded parallel loops, shared/private scoping, race conditions, reduction clauses, and Amdahl\'s Law on multi-core CPUs.';
  } else {
    body.classList.replace('day-view-day1', 'day-view-day2');
    btnD2.classList.add('active');
    btnD1.classList.remove('active');
    dayBadge.textContent = 'Day 2 • MPI & GPU';
    heroPillText.textContent = 'Day 2 Active • Distributed Memory, MPI, GPU & Hybrid Systems';
    heroTitle.innerHTML = 'From <span class="gradient-text-accent">One Kitchen</span> to <br class="br-desktop"><span class="gradient-text-primary">Multiple Restaurant Branches</span>';
    heroSubtitle.innerHTML = 'Yesterday we orchestrated multiple chefs around one refrigerator. Today our restaurant operates <strong>4 regional branches</strong> (Chennai, Bangalore, Hosur, Coimbatore) exchanging <strong>MPI messages</strong> and powered by <strong>thousands of GPU workers</strong>.';
  }

  renderRosettaStone();
  renderCodeLabTabs();
  renderChecklist();
}

/* ==========================================================================
   3. Rosetta Stone Data & Renderer
   ========================================================================== */
const ROSETTA_DATA_DAY1 = [
  { icon: '🏢', term: 'Computer', arrow: '⇄', metaphor: 'Entire Restaurant', desc: 'The complete infrastructure delivering meals to hungry patrons.' },
  { icon: '🍳', term: 'CPU', arrow: '⇄', metaphor: 'Main Kitchen Workspace', desc: 'The physical space where computational work gets cooked.' },
  { icon: '👨🍳', term: 'CPU Core', arrow: '⇄', metaphor: 'Individual Chef', desc: 'A physical worker capable of executing instructions independently.' },
  { icon: '🧵', term: 'Software Thread', arrow: '⇄', metaphor: 'Chef\'s Active Work Stream', desc: 'Lightweight execution unit dispatched to run on a core.' },
  { icon: '📋', term: 'Program', arrow: '⇄', metaphor: 'Kitchen Recipe Book', desc: 'The complete set of instructions written down for execution.' },
  { icon: '🍱', term: 'Task / Iteration', arrow: '⇄', metaphor: 'Food Order', desc: 'e.g., Order #42: Cook 1 Plate of Fried Rice.' },
  { icon: '🧊', term: 'Shared RAM', arrow: '⇄', metaphor: 'Central Kitchen Refrigerator', desc: 'Shared ingredients that every chef in the kitchen can reach.' },
  { icon: '🧂', term: 'CPU Cache', arrow: '⇄', metaphor: 'Chef\'s Spice Prep Counter', desc: 'Small, ultra-fast ingredient shelf right next to the cutting board.' }
];

const ROSETTA_DATA_DAY2 = [
  { icon: '🏢', term: 'Cluster / Network', arrow: '⇄', metaphor: 'Restaurant Franchise Chain', desc: 'Multiple autonomous restaurant branches connected via network.' },
  { icon: '🌐', term: 'Distributed Memory', arrow: '⇄', metaphor: 'Separate Branch Kitchens', desc: 'Each location has its own private refrigerator; no direct sharing.' },
  { icon: '👨🍳', term: 'MPI Process', arrow: '⇄', metaphor: 'Branch Kitchen Manager', desc: 'Independent running OS process with its own private address space.' },
  { icon: '🏷️', term: 'MPI Rank', arrow: '⇄', metaphor: 'Branch ID (0 = Chennai, 1 = Bangalore)', desc: 'Unique integer identifier (0 to size-1) assigned to each process.' },
  { icon: '📞', term: 'MPI_COMM_WORLD', arrow: '⇄', metaphor: 'Franchise Intercom Group', desc: 'The global communicator containing all active branch processes.' },
  { icon: '📦', term: 'MPI_Send / MPI_Recv', arrow: '⇄', metaphor: 'Tomato Courier Delivery', desc: 'Explicit point-to-point message dispatch and arrival envelope.' },
  { icon: '📢', term: 'MPI_Bcast', arrow: '⇄', metaphor: 'Head Office Recipe Announcement', desc: 'HQ broadcasts one identical message to every branch.' },
  { icon: '🥖', term: 'MPI_Scatter / Gather', arrow: '⇄', metaphor: 'Dough Dispatch & Bread Collection', desc: 'Slicing orders among branches and gathering completed batches.' },
  { icon: '💰', term: 'MPI_Reduce', arrow: '⇄', metaphor: 'Calculating Total Franchise Revenue', desc: 'Combining partial branch sales into corporate totals (SUM/MAX).' },
  { icon: '🏭', term: 'GPU Accelerator', arrow: '⇄', metaphor: 'Mass Automated Prep Factory', desc: '10,000 specialized workers executing identical small tasks at high speed.' },
  { icon: '⚡', term: 'Hybrid Computing', arrow: '⇄', metaphor: 'HQ + Chefs + Prep Factory', desc: 'Combining MPI (across nodes) + OpenMP (inside nodes) + CUDA (on GPUs).' },
  { icon: '🛑', term: 'MPI_Barrier', arrow: '⇄', metaphor: 'Synchronized Dinner Opening', desc: 'All branches halt and wait until every branch reaches the checkpoint.' }
];

function renderRosettaStone() {
  const grid = document.getElementById('rosettaGrid');
  const compBox = document.getElementById('comparisonBox');
  const data = CURRENT_DAY === 'day1' ? ROSETTA_DATA_DAY1 : ROSETTA_DATA_DAY2;

  grid.innerHTML = '';
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'rosetta-card';
    card.innerHTML = `
      <div class="rosetta-icon">${item.icon}</div>
      <div class="rosetta-term">${item.term}</div>
      <div class="rosetta-arrow">${item.arrow}</div>
      <div class="rosetta-metaphor">${item.metaphor}</div>
      <p>${item.desc}</p>
    `;
    grid.appendChild(card);
  });

  if (CURRENT_DAY === 'day1') {
    compBox.innerHTML = `
      <div class="comp-col">
        <div class="comp-header"><span class="comp-badge bad">Sequential Execution</span><h3>1 Chef • 100 Orders</h3></div>
        <p>1 Chef works through 100 orders one by one. Total Time = 100 × order_time.</p>
      </div>
      <div class="comp-col">
        <div class="comp-header"><span class="comp-badge good">Parallel Execution (OpenMP)</span><h3>4 Chefs • 25 Orders Each</h3></div>
        <p>4 Chefs concurrently work in 1 shared kitchen around 1 refrigerator. Speedup ≈ 4×.</p>
      </div>
    `;
  } else {
    compBox.innerHTML = `
      <div class="comp-col">
        <div class="comp-header"><span class="comp-badge bad">Shared Memory Limits</span><h3>1 Kitchen Motherboard (~64 Cores Max)</h3></div>
        <p>A single motherboard cannot scale to thousands of cores due to physical memory bus saturation.</p>
      </div>
      <div class="comp-col">
        <div class="comp-header"><span class="comp-badge good">Distributed Memory (MPI)</span><h3>Multiple Regional Branches (Millions of Cores)</h3></div>
        <p>Connect independent computers across high-speed network. Scales to world-class supercomputers!</p>
      </div>
    `;
  }
}

/* ==========================================================================
   4. Architecture Tabs
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
   5. Interactive Code Lab
   ========================================================================== */
const CODE_LAB_DATABASE = {
  // --- DAY 1 EXAMPLES ---
  'd1-hello': {
    day: 'day1',
    fileName: '01_hello_openmp.c',
    title: 'Hello OpenMP',
    code: `#include <stdio.h>\n#include <omp.h>\n\nint main()\n{\n    omp_set_num_threads(4);\n    #pragma omp parallel\n    {\n        int id = omp_get_thread_num();\n        int total = omp_get_num_threads();\n        printf("👨🍳 Chef %d of %d reporting for duty!\\n", id, total);\n    }\n    return 0;\n}`,
    explanation: `<p><strong>Core Directives:</strong> <code>#pragma omp parallel</code> forks a team of concurrent threads. <code>omp_get_thread_num()</code> returns calling thread ID.</p>`,
    compileCmd: 'gcc -fopenmp 01_hello_openmp.c -o hello.exe',
    runCmd: '.\\hello.exe'
  },
  'd1-parallel-for': {
    day: 'day1',
    fileName: '02_array_parallel.c',
    title: 'Parallel Loop',
    code: `#include <stdio.h>\n#include <omp.h>\n#define N 10\n\nint main()\n{\n    int A[N];\n    #pragma omp parallel for\n    for(int i = 0; i < N; i++) {\n        A[i] = i * i;\n        printf("Thread %d processed index %d -> %d\\n", omp_get_thread_num(), i, A[i]);\n    }\n    return 0;\n}`,
    explanation: `<p><strong>Loop Parallelization:</strong> <code>#pragma omp parallel for</code> divides loop iterations across threads.</p>`,
    compileCmd: 'gcc -fopenmp 02_array_parallel.c -o array.exe',
    runCmd: '.\\array.exe'
  },
  'd1-reduction': {
    day: 'day1',
    fileName: '04_reduction.c',
    title: 'Reduction Clause',
    code: `#include <stdio.h>\n#include <omp.h>\n\nint main()\n{\n    int sum = 0;\n    #pragma omp parallel for reduction(+:sum)\n    for(int i = 1; i <= 1000; i++) {\n        sum += i;\n    }\n    printf("Correct Parallel Sum = %d (Expected: 500500)\\n", sum);\n    return 0;\n}`,
    explanation: `<p><strong>Lock-free Tree Reduction:</strong> Each thread accumulates into a private local variable; OpenMP combines results at loop exit.</p>`,
    compileCmd: 'gcc -fopenmp 04_reduction.c -o reduction.exe',
    runCmd: '.\\reduction.exe'
  },

  // --- DAY 2 EXAMPLES ---
  'd2-hello': {
    day: 'day2',
    fileName: '01_mpi_hello.c',
    title: '01. MPI Hello World',
    code: `#include <mpi.h>\n#include <stdio.h>\n\nint main(int argc, char** argv)\n{\n    MPI_Init(&argc, &argv);\n\n    int rank, size;\n    MPI_Comm_rank(MPI_COMM_WORLD, &rank);\n    MPI_Comm_size(MPI_COMM_WORLD, &size);\n\n    printf("👨🍳 [Rank %d of %d] Branch online & ready to cook!\\n", rank, size);\n\n    MPI_Finalize();\n    return 0;\n}`,
    explanation: `<p><strong>MPI Lifecycle:</strong> <code>MPI_Init</code> initializes communication; <code>MPI_Comm_rank</code> gets branch ID; <code>MPI_Comm_size</code> gets total branch count; <code>MPI_Finalize</code> shuts down cleanly.</p>`,
    compileCmd: 'mpicc 01_mpi_hello.c -o hello_mpi.exe',
    runCmd: 'mpiexec -n 4 .\\hello_mpi.exe'
  },
  'd2-send-recv': {
    day: 'day2',
    fileName: '02_mpi_send_recv.c',
    title: '02. MPI Send & Recv',
    code: `#include <mpi.h>\n#include <stdio.h>\n\nint main(int argc, char** argv)\n{\n    MPI_Init(&argc, &argv);\n    int rank;\n    MPI_Comm_rank(MPI_COMM_WORLD, &rank);\n    int tomato_kg;\n\n    if (rank == 0) {\n        tomato_kg = 42;\n        printf("📦 Branch 0: Sending %d kg tomatoes to Branch 1...\\n", tomato_kg);\n        MPI_Send(&tomato_kg, 1, MPI_INT, 1, 0, MPI_COMM_WORLD);\n    }\n    else if (rank == 1) {\n        MPI_Recv(&tomato_kg, 1, MPI_INT, 0, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);\n        printf("🍅 Branch 1: Received %d kg tomatoes! Ready to cook.\\n", tomato_kg);\n    }\n    MPI_Finalize();\n    return 0;\n}`,
    explanation: `<p><strong>Point-to-Point Message Envelope:</strong> Address, Count, Datatype, Destination/Source Rank, Tag, and Communicator.</p>`,
    compileCmd: 'mpicc 02_mpi_send_recv.c -o send_recv.exe',
    runCmd: 'mpiexec -n 2 .\\send_recv.exe'
  },
  'd2-bcast': {
    day: 'day2',
    fileName: '03_mpi_bcast.c',
    title: '03. MPI Broadcast',
    code: `#include <mpi.h>\n#include <stdio.h>\n\nint main(int argc, char** argv)\n{\n    MPI_Init(&argc, &argv);\n    int rank;\n    MPI_Comm_rank(MPI_COMM_WORLD, &rank);\n    int recipe_code = 0;\n\n    if (rank == 0) {\n        recipe_code = 9021; // Special Dum Biryani Promo Code\n        printf("📢 [HQ]: Broadcasting Promo Code %d to all branches...\\n", recipe_code);\n    }\n\n    // 1-to-All Broadcast\n    MPI_Bcast(&recipe_code, 1, MPI_INT, 0, MPI_COMM_WORLD);\n    printf("🍛 [Branch %d]: Confirmed recipe promo code %d\\n", rank, recipe_code);\n\n    MPI_Finalize();\n    return 0;\n}`,
    explanation: `<p><strong>MPI_Bcast:</strong> Root sends data to all processes in the communicator simultaneously without explicit loops.</p>`,
    compileCmd: 'mpicc 03_mpi_bcast.c -o bcast.exe',
    runCmd: 'mpiexec -n 4 .\\bcast.exe'
  },
  'd2-scatter-gather': {
    day: 'day2',
    fileName: '04_mpi_scatter_gather.c',
    title: '04. Scatter & Gather',
    code: `#include <mpi.h>\n#include <stdio.h>\n#include <stdlib.h>\n\nint main(int argc, char** argv)\n{\n    MPI_Init(&argc, &argv);\n    int rank, size;\n    MPI_Comm_rank(MPI_COMM_WORLD, &rank);\n    MPI_Comm_size(MPI_COMM_WORLD, &size);\n\n    int master_dough[4] = {10, 20, 30, 40};\n    int my_dough = 0;\n    int my_bread = 0;\n    int all_breads[4];\n\n    // Scatter dough to branches\n    MPI_Scatter(master_dough, 1, MPI_INT, &my_dough, 1, MPI_INT, 0, MPI_COMM_WORLD);\n    my_bread = my_dough * 2; // Bake bread\n\n    // Gather baked bread back to HQ\n    MPI_Gather(&my_bread, 1, MPI_INT, all_breads, 1, MPI_INT, 0, MPI_COMM_WORLD);\n\n    if (rank == 0) {\n        printf("🧺 [HQ]: Gathered baked bread from all branches: [%d, %d, %d, %d]\\n",\n               all_breads[0], all_breads[1], all_breads[2], all_breads[3]);\n    }\n    MPI_Finalize();\n    return 0;\n}`,
    explanation: `<p><strong>Scatter & Gather:</strong> <code>MPI_Scatter</code> divides an array into equal disjoint slices. <code>MPI_Gather</code> collects slices back into one master buffer.</p>`,
    compileCmd: 'mpicc 04_mpi_scatter_gather.c -o scatter_gather.exe',
    runCmd: 'mpiexec -n 4 .\\scatter_gather.exe'
  },
  'd2-reduce': {
    day: 'day2',
    fileName: '05_mpi_reduce_sales.c',
    title: '05. MPI Reduce Sales',
    code: `#include <mpi.h>\n#include <stdio.h>\n\nint main(int argc, char** argv)\n{\n    MPI_Init(&argc, &argv);\n    int rank;\n    MPI_Comm_rank(MPI_COMM_WORLD, &rank);\n\n    int my_sales = (rank + 1) * 25000;\n    int total_franchise_sales = 0;\n    int max_branch_sales = 0;\n\n    MPI_Reduce(&my_sales, &total_franchise_sales, 1, MPI_INT, MPI_SUM, 0, MPI_COMM_WORLD);\n    MPI_Reduce(&my_sales, &max_branch_sales, 1, MPI_INT, MPI_MAX, 0, MPI_COMM_WORLD);\n\n    if (rank == 0) {\n        printf("💰 Total Corporate Revenue: Rs. %d\\n", total_franchise_sales);\n        printf("🌟 Top Single Branch Sales: Rs. %d\\n", max_branch_sales);\n    }\n    MPI_Finalize();\n    return 0;\n}`,
    explanation: `<p><strong>Global Reductions:</strong> <code>MPI_Reduce</code> combines data from all processes using an associative operator (<code>MPI_SUM</code>, <code>MPI_MAX</code>, <code>MPI_MIN</code>).</p>`,
    compileCmd: 'mpicc 05_mpi_reduce_sales.c -o reduce_sales.exe',
    runCmd: 'mpiexec -n 4 .\\reduce_sales.exe'
  },
  'd2-trapezoidal': {
    day: 'day2',
    fileName: '06_mpi_trapezoidal.c',
    title: '06. Trapezoidal Rule (PI)',
    code: `#include <mpi.h>\n#include <stdio.h>\n#include <math.h>\n\ndouble f(double x) { return 4.0 / (1.0 + x * x); }\n\ndouble Trap(double a, double b, int n, double h) {\n    double est = (f(a) + f(b)) / 2.0;\n    for(int i = 1; i < n; i++) est += f(a + i * h);\n    return est * h;\n}\n\nint main(int argc, char** argv)\n{\n    MPI_Init(&argc, &argv);\n    int rank, size;\n    MPI_Comm_rank(MPI_COMM_WORLD, &rank);\n    MPI_Comm_size(MPI_COMM_WORLD, &size);\n\n    double a = 0.0, b = 1.0; int n = 50000000;\n    double h = (b - a) / n;\n    int local_n = n / size;\n    double local_a = a + rank * local_n * h;\n    double local_b = local_a + local_n * h;\n\n    double local_int = Trap(local_a, local_b, local_n, h);\n    double total_int = 0.0;\n\n    MPI_Reduce(&local_int, &total_int, 1, MPI_DOUBLE, MPI_SUM, 0, MPI_COMM_WORLD);\n    if (rank == 0) printf("🎯 Computed PI: %.12f (Error: %.2e)\\n", total_int, fabs(total_int - 3.141592653589));\n    MPI_Finalize();\n    return 0;\n}`,
    explanation: `<p><strong>Numerical Integration in Parallel:</strong> Each process computes the area of its local sub-interval; <code>MPI_Reduce</code> sums all sub-areas into total PI value.</p>`,
    compileCmd: 'mpicc 06_mpi_trapezoidal.c -o trap_pi.exe -lm',
    runCmd: 'mpiexec -n 4 .\\trap_pi.exe'
  },
  'd2-cuda': {
    day: 'day2',
    fileName: '08_cuda_vector_add.cu',
    title: '07. CUDA GPU Vector Add',
    code: `#include <stdio.h>\n#include <stdlib.h>\n#define N 1000000\n\n#ifdef __CUDACC__\n__global__ void VectorAddKernel(const float* A, const float* B, float* C, int n) {\n    int i = blockIdx.x * blockDim.x + threadIdx.x;\n    if (i < n) C[i] = A[i] + B[i];\n}\n#endif\n\nint main() {\n    size_t size = N * sizeof(float);\n    float *h_A = (float*)malloc(size), *h_B = (float*)malloc(size), *h_C = (float*)malloc(size);\n    for(int i=0; i<N; i++) { h_A[i]=1.5f; h_B[i]=2.5f; }\n\n    #ifdef __CUDACC__\n    float *d_A, *d_B, *d_C;\n    cudaMalloc((void**)&d_A, size); cudaMalloc((void**)&d_B, size); cudaMalloc((void**)&d_C, size);\n    cudaMemcpy(d_A, h_A, size, cudaMemcpyHostToDevice);\n    cudaMemcpy(d_B, h_B, size, cudaMemcpyHostToDevice);\n    VectorAddKernel<<<(N+255)/256, 256>>>(d_A, d_B, d_C, N);\n    cudaMemcpy(h_C, d_C, size, cudaMemcpyDeviceToHost);\n    cudaFree(d_A); cudaFree(d_B); cudaFree(d_C);\n    #else\n    for(int i=0; i<N; i++) h_C[i] = h_A[i] + h_B[i];\n    #endif\n\n    printf("✅ Verification: C[0]=%.2f, C[N-1]=%.2f\\n", h_C[0], h_C[N-1]);\n    return 0;\n}`,
    explanation: `<p><strong>CUDA GPU Kernel:</strong> 10,000s of GPU threads execute <code>VectorAddKernel</code> concurrently. Thread index calculated via <code>blockIdx.x * blockDim.x + threadIdx.x</code>.</p>`,
    compileCmd: 'nvcc 08_cuda_vector_add.cu -o vector_add.exe (or gcc in CPU fallback mode)',
    runCmd: '.\\vector_add.exe'
  },
  'd2-capstone': {
    day: 'day2',
    fileName: '10_challenge_sales_analyzer.c',
    title: '08. Capstone Sales Analyzer',
    code: `#include <mpi.h>\n#include <stdio.h>\n#define ITEMS 5\n#define BRANCHES 4\n\nint main(int argc, char** argv)\n{\n    MPI_Init(&argc, &argv);\n    int rank;\n    MPI_Comm_rank(MPI_COMM_WORLD, &rank);\n\n    int all_sales[20] = {150,280,420,190,310, 520,190,240,380,490, 95,120,150,210,180, 330,450,290,200,580};\n    int local_sales[ITEMS];\n\n    // 1. Scatter sales to 4 branches\n    MPI_Scatter(all_sales, ITEMS, MPI_INT, local_sales, ITEMS, MPI_INT, 0, MPI_COMM_WORLD);\n\n    // 2. Local statistics\n    int local_total = 0, local_max = local_sales[0];\n    for(int i=0; i<ITEMS; i++) {\n        local_total += local_sales[i];\n        if (local_sales[i] > local_max) local_max = local_sales[i];\n    }\n\n    // 3. Global Reductions to HQ\n    int global_revenue = 0, global_max = 0;\n    MPI_Reduce(&local_total, &global_revenue, 1, MPI_INT, MPI_SUM, 0, MPI_COMM_WORLD);\n    MPI_Reduce(&local_max, &global_max, 1, MPI_INT, MPI_MAX, 0, MPI_COMM_WORLD);\n\n    if (rank == 0) {\n        printf("🏆 GRAND FINANCIAL AUDIT:\\n");\n        printf("   Total Corporate Revenue: Rs. %d\\n", global_revenue);\n        printf("   Highest Single Item:     Rs. %d\\n", global_max);\n    }\n    MPI_Finalize();\n    return 0;\n}`,
    explanation: `<p><strong>Capstone Project:</strong> Combines <code>MPI_Scatter</code>, local branch aggregation, <code>MPI_Reduce</code>, and benchmarking into a complete enterprise analytics pipeline.</p>`,
    compileCmd: 'mpicc 10_challenge_sales_analyzer.c -o capstone.exe',
    runCmd: 'mpiexec -n 4 .\\capstone.exe'
  }
};

function renderCodeLabTabs() {
  const nav = document.getElementById('codeLabNav');
  nav.innerHTML = '';

  let firstKey = null;

  for (const [key, item] of Object.entries(CODE_LAB_DATABASE)) {
    if (item.day === CURRENT_DAY) {
      if (!firstKey) firstKey = key;
      const btn = document.createElement('button');
      btn.className = 'lab-tab';
      btn.setAttribute('data-code', key);
      btn.innerHTML = `
        <span class="tab-title">${item.title}</span>
      `;
      btn.addEventListener('click', () => loadCodeLab(key));
      nav.appendChild(btn);
    }
  }

  if (firstKey) loadCodeLab(firstKey);
}

function loadCodeLab(key) {
  const data = CODE_LAB_DATABASE[key];
  if (!data) return;

  document.getElementById('currentFileName').textContent = data.fileName;
  document.getElementById('codeContent').textContent = data.code;
  document.getElementById('expBody').innerHTML = data.explanation;
  document.getElementById('compileCmd').textContent = data.compileCmd;
  document.getElementById('runCmd').textContent = data.runCmd;

  document.querySelectorAll('#codeLabNav .lab-tab').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-code') === key);
  });
}

function initCodeLab() {
  const copyBtn = document.getElementById('copyCodeBtn');
  copyBtn.addEventListener('click', () => {
    const code = document.getElementById('codeContent').textContent;
    navigator.clipboard.writeText(code).then(() => {
      const orig = copyBtn.innerHTML;
      copyBtn.innerHTML = '<span>✅ Copied!</span>';
      setTimeout(() => { copyBtn.innerHTML = orig; }, 1800);
    });
  });
}

/* ==========================================================================
   6. Day 2 Simulator 1: Point-to-Point Tomato Dispatch & Deadlock
   ========================================================================== */
function initDay2MpiP2PSimulator() {
  const btnSend = document.getElementById('btnRunTomatoSend');
  const btnDeadlock = document.getElementById('btnRunDeadlockDemo');
  const btnReset = document.getElementById('btnResetMpiP2P');
  const van = document.getElementById('courierVan');
  const chennaiNode = document.getElementById('nodeChennai');
  const bangaloreNode = document.getElementById('nodeBangalore');
  const chennaiStatus = document.getElementById('chennaiStatus');
  const bangaloreStatus = document.getElementById('bangaloreStatus');
  const chennaiInv = document.getElementById('chennaiInventory');
  const bangaloreInv = document.getElementById('bangaloreInventory');
  const log = document.getElementById('mpiP2PLog');

  function resetP2P() {
    van.style.left = '10px';
    van.innerHTML = '🚚 <span>[Empty]</span>';
    chennaiNode.className = 'branch-node';
    bangaloreNode.className = 'branch-node';
    chennaiStatus.textContent = 'IDLE';
    bangaloreStatus.textContent = 'IDLE';
    chennaiInv.textContent = 'Inventory: 100 kg Tomatoes';
    bangaloreInv.textContent = 'Inventory: 0 kg Tomatoes (LOW!)';
    log.textContent = 'Simulator Ready. Click "Send 42kg Tomatoes" or "Trigger Deadlock".';
  }

  btnSend.addEventListener('click', () => {
    resetP2P();
    chennaiNode.classList.add('active-sender');
    chennaiStatus.textContent = 'CALLING MPI_Send(&tomatoes, 42, MPI_INT, 1, tag=0)';
    chennaiInv.textContent = 'Inventory: 58 kg Tomatoes (-42kg)';
    van.innerHTML = '🚚 <span>[42kg 🍅]</span>';
    log.textContent = '1. Branch 0 (Chennai) packs 42 kg into MPI network buffer and dispatches courier...';

    setTimeout(() => {
      van.style.left = 'calc(100% - 110px)';
      bangaloreNode.classList.add('active-receiver');
      bangaloreStatus.textContent = 'BLOCKING ON MPI_Recv(..., source=0)';
      log.textContent = '2. Courier travelling over highway network bus... Bangalore waiting at loading dock.';
    }, 400);

    setTimeout(() => {
      bangaloreStatus.textContent = 'MPI_Recv SUCCESSFUL!';
      bangaloreInv.textContent = 'Inventory: 42 kg Tomatoes (+42kg)';
      log.innerHTML = '✅ <strong>DELIVERY COMPLETE:</strong> Branch 1 unpacked envelope. Both processes proceed to cooking!';
    }, 2000);
  });

  btnDeadlock.addEventListener('click', () => {
    resetP2P();
    chennaiNode.classList.add('deadlock-freeze');
    bangaloreNode.classList.add('deadlock-freeze');
    chennaiStatus.textContent = 'BLOCKING: MPI_Recv(from=1)...';
    bangaloreStatus.textContent = 'BLOCKING: MPI_Recv(from=0)...';
    van.style.left = '45%';
    van.innerHTML = '🛑 <span>[DEADLOCK]</span>';
    log.innerHTML = '❌ <strong>FATAL DEADLOCK:</strong> Chennai is waiting for Bangalore to send butter, but Bangalore is waiting for Chennai to send spices. Neither sends first. Cluster is frozen!';
  });

  btnReset.addEventListener('click', resetP2P);
}

/* ==========================================================================
   7. Day 2 Simulator 2: Collective Communication
   ========================================================================== */
function initDay2CollectiveSimulator() {
  const btnBcast = document.getElementById('btnSimBcast');
  const btnScatter = document.getElementById('btnSimScatter');
  const btnGather = document.getElementById('btnSimGather');
  const btnReduce = document.getElementById('btnSimReduce');
  const hqBox = document.getElementById('hqDataBox');
  const slots = [
    document.getElementById('slotB0'),
    document.getElementById('slotB1'),
    document.getElementById('slotB2'),
    document.getElementById('slotB3')
  ];
  const summary = document.getElementById('collectiveSummary');

  function clearSlots() {
    slots.forEach(s => {
      s.className = 'branch-slot';
      s.textContent = '-';
    });
  }

  btnBcast.addEventListener('click', () => {
    clearSlots();
    hqBox.textContent = 'Recipe Code: #9021 (Dum Biryani)';
    slots.forEach((s, idx) => {
      setTimeout(() => {
        s.classList.add('active-token');
        s.textContent = '#9021';
      }, idx * 250);
    });
    summary.innerHTML = '📢 <strong>MPI_Bcast:</strong> Headquarters broadcasted the exact same Recipe Code #9021 to all 4 branches simultaneously!';
  });

  btnScatter.addEventListener('click', () => {
    clearSlots();
    const doughBatches = ['10 kg Dough', '20 kg Dough', '30 kg Dough', '40 kg Dough'];
    hqBox.textContent = 'Dough Master Array: [10, 20, 30, 40]';
    slots.forEach((s, idx) => {
      setTimeout(() => {
        s.classList.add('active-token');
        s.textContent = doughBatches[idx];
      }, idx * 250);
    });
    summary.innerHTML = '🥖 <strong>MPI_Scatter:</strong> Master array of 100 kg dough was divided into equal pieces and distributed (Piece i -> Branch i)!';
  });

  btnGather.addEventListener('click', () => {
    clearSlots();
    const bakedItems = ['20 Breads', '40 Breads', '60 Breads', '80 Breads'];
    slots.forEach((s, idx) => {
      s.textContent = bakedItems[idx];
    });
    setTimeout(() => {
      hqBox.textContent = 'HQ Assembled Inventory: [20, 40, 60, 80] Breads';
      summary.innerHTML = '🧺 <strong>MPI_Gather:</strong> Each branch sent its local baked bread count back to HQ to assemble the full corporate inventory!';
    }, 600);
  });

  btnReduce.addEventListener('click', () => {
    clearSlots();
    const branchSales = [50000, 75000, 30000, 45000];
    slots.forEach((s, idx) => {
      s.textContent = `₹${branchSales[idx]}`;
    });
    setTimeout(() => {
      hqBox.textContent = 'Total Corporate Sales (MPI_SUM): ₹2,00,000';
      summary.innerHTML = '💰 <strong>MPI_Reduce:</strong> HQ summed up all individual branch earnings (₹50k + ₹75k + ₹30k + ₹45k = ₹2,00,000) using <code>MPI_SUM</code>!';
    }, 800);
  });
}

/* ==========================================================================
   8. Day 2 Simulator 3: GPU Grid / Block / Thread Visualizer
   ========================================================================== */
function initDay2GpuSimulator() {
  const nSelect = document.getElementById('gpuNSelect');
  const btnLaunch = document.getElementById('btnLaunchGpuKernel');
  const visual = document.getElementById('gpuGridVisual');
  const blocksCountEl = document.getElementById('gpuBlocksCount');
  const summary = document.getElementById('gpuSummary');

  function renderGpuGrid() {
    const N = parseInt(nSelect.value, 10);
    const threadsPerBlock = 8;
    const numBlocks = Math.ceil(N / threadsPerBlock);
    blocksCountEl.textContent = `${numBlocks} Blocks (${N} Total Threads)`;

    visual.innerHTML = '';
    for (let b = 0; b < numBlocks; b++) {
      const blockCard = document.createElement('div');
      blockCard.className = 'gpu-block-card';
      blockCard.innerHTML = `<div class="block-title">Block #${b}</div><div class="threads-chips-grid" id="threadsGrid_${b}"></div>`;
      visual.appendChild(blockCard);

      const chipsGrid = blockCard.querySelector('.threads-chips-grid');
      for (let t = 0; t < threadsPerBlock; t++) {
        const globalIdx = b * threadsPerBlock + t;
        if (globalIdx < N) {
          const chip = document.createElement('div');
          chip.className = 't-chip';
          chip.id = `gpu_t_${globalIdx}`;
          chip.textContent = `t${globalIdx}`;
          chip.title = `Global Thread Index: ${globalIdx} (Block ${b}, Thread ${t})`;
          chipsGrid.appendChild(chip);
        }
      }
    }
  }

  btnLaunch.addEventListener('click', () => {
    const chips = visual.querySelectorAll('.t-chip');
    chips.forEach(c => c.classList.remove('active-gpu'));

    chips.forEach((c, idx) => {
      setTimeout(() => {
        c.classList.add('active-gpu');
      }, Math.min(600, idx * 10));
    });

    summary.innerHTML = `⚡ <strong>GPU Kernel Executing:</strong> Launched ${chips.length} hardware threads concurrently! Every vector item A[i] + B[i] calculated in parallel.`;
  });

  nSelect.addEventListener('change', renderGpuGrid);
  renderGpuGrid();
}

/* ==========================================================================
   9. Day 1 Simulators (Queue & Race)
   ========================================================================== */
function initDay1QueueSimulator() {
  const runBtn = document.getElementById('btnRunQueueSim');
  const resetBtn = document.getElementById('btnResetQueueSim');
  const chefsSelect = document.getElementById('queueChefsSelect');
  const lanesContainer = document.getElementById('chefsLanesContainer');
  const timeElapsedEl = document.getElementById('queueTimeElapsed');
  const throughputEl = document.getElementById('queueThroughput');
  const progressBar = document.getElementById('queueTotalProgress');

  let simTimer = null;
  const TOTAL_ORDERS = 24;

  function renderLanes() {
    const numChefs = parseInt(chefsSelect.value, 10);
    lanesContainer.innerHTML = '';
    for (let c = 0; c < numChefs; c++) {
      const row = document.createElement('div');
      row.className = 'lane-row';
      row.innerHTML = `<div class="lane-chef">👨🍳 Chef ${c}</div><div class="lane-slots" id="d1_slots_${c}"></div>`;
      lanesContainer.appendChild(row);
    }
  }

  function resetSim() {
    if (simTimer) clearInterval(simTimer);
    timeElapsedEl.textContent = '0.0s';
    throughputEl.textContent = '0 orders/s';
    progressBar.style.width = '0%';
    renderLanes();
  }

  runBtn.addEventListener('click', () => {
    resetSim();
    const numChefs = parseInt(chefsSelect.value, 10);
    let ordersDone = 0;
    let seconds = 0.0;
    const ordersPerChef = Math.ceil(TOTAL_ORDERS / numChefs);

    for (let c = 0; c < numChefs; c++) {
      const slotsEl = document.getElementById(`d1_slots_${c}`);
      for (let o = 0; o < ordersPerChef; o++) {
        const orderId = c * ordersPerChef + o + 1;
        if (orderId <= TOTAL_ORDERS) {
          const slot = document.createElement('div');
          slot.className = 'slot-item';
          slot.id = `d1_slot_${orderId}`;
          slot.textContent = `#${orderId}`;
          slotsEl.appendChild(slot);
        }
      }
    }

    simTimer = setInterval(() => {
      seconds += 0.2;
      timeElapsedEl.textContent = `${seconds.toFixed(1)}s`;
      for (let c = 0; c < numChefs; c++) {
        const orderId = c * ordersPerChef + Math.floor(seconds / 0.4);
        if (orderId <= TOTAL_ORDERS) {
          const slot = document.getElementById(`d1_slot_${orderId}`);
          if (slot && !slot.classList.contains('done')) {
            slot.classList.add('done');
            ordersDone++;
          }
        }
      }
      progressBar.style.width = `${Math.min(100, (ordersDone / TOTAL_ORDERS) * 100)}%`;
      throughputEl.textContent = `${(ordersDone / Math.max(0.1, seconds)).toFixed(1)} orders/s`;
      if (ordersDone >= TOTAL_ORDERS) clearInterval(simTimer);
    }, 200);
  });

  resetBtn.addEventListener('click', resetSim);
  chefsSelect.addEventListener('change', resetSim);
  renderLanes();
}

function initDay1RaceSimulator() {
  const btnBuggy = document.getElementById('btnSimulateBuggyCash');
  const btnSafe = document.getElementById('btnSimulateSafeReduction');
  const display = document.getElementById('registerDisplay');
  const status = document.getElementById('registerStatus');
  const chef1Action = document.getElementById('chef1Action');
  const chef2Action = document.getElementById('chef2Action');
  const raceLog = document.getElementById('raceLog');

  btnBuggy.addEventListener('click', () => {
    display.textContent = '₹100';
    status.textContent = 'UNSYNCHRONIZED WRITE RACE';
    status.style.color = '#f43f5e';
    chef1Action.textContent = 'Reads ₹100, computes ₹150...';
    chef2Action.textContent = 'Reads ₹100, computes ₹130...';
    setTimeout(() => {
      display.textContent = '₹130 (CORRUPTED)';
      display.style.color = '#f43f5e';
      raceLog.innerHTML = '❌ <strong>DATA RACE:</strong> Chef 2 overwrote ₹150 with ₹130. ₹50 was lost! Expected: ₹180.';
    }, 1500);
  });

  btnSafe.addEventListener('click', () => {
    display.textContent = '₹100';
    display.style.color = '#38bdf8';
    status.textContent = 'REDUCTION (LOCAL SLICES)';
    status.style.color = '#10b981';
    chef1Action.textContent = 'Local slice = +₹50';
    chef2Action.textContent = 'Local slice = +₹30';
    setTimeout(() => {
      display.textContent = '₹180 (PERFECT)';
      display.style.color = '#10b981';
      raceLog.innerHTML = '✅ <strong>SAFE REDUCTION:</strong> Lock-free parallel accumulation achieved exact ₹180!';
    }, 1500);
  });
}

/* ==========================================================================
   10. Mastery Checklist
   ========================================================================== */
const CHECKLIST_DAY1 = [
  { id: 'd1_1', title: '1. Parallel Computing Basics', desc: 'Dividing computational work across multiple physical cores.' },
  { id: 'd1_2', title: '2. Process vs Thread', desc: 'Process = independent memory; Thread = lightweight worker sharing memory.' },
  { id: 'd1_3', title: '3. SIMD vs MIMD', desc: 'SIMD = all chop tomatoes; MIMD = different dishes per chef.' },
  { id: 'd1_4', title: '4. Speedup & Amdahl\'s Law', desc: 'Speedup = Ts/Tp; Max speedup is bounded by serial bottleneck (1/S).' },
  { id: 'd1_5', title: '5. OpenMP parallel for & Scopes', desc: 'Splitting loop iterations and handling shared vs private variables.' },
  { id: 'd1_6', title: '6. Race Conditions & Reduction', desc: 'Preventing memory corruption using reduction(+:sum).' }
];

const CHECKLIST_DAY2 = [
  { id: 'd2_1', title: '1. Distributed Memory Architecture', desc: 'Each computer/branch has isolated private RAM and must communicate via network messages.' },
  { id: 'd2_2', title: '2. MPI Communicator & Ranks', desc: 'MPI_COMM_WORLD connects all branches; Rank (0 to size-1) identifies each branch process.' },
  { id: 'd2_3', title: '3. Point-to-Point Messaging (Send/Recv)', desc: 'Explicit message envelopes with buffer, count, datatype, destination, tag, and comm.' },
  { id: 'd2_4', title: '4. Deadlock Recognition & Prevention', desc: 'Preventing mutual blocking waits by ensuring matching send/recv orders or non-blocking calls.' },
  { id: 'd2_5', title: '5. Collective Operations (Bcast & Scatter)', desc: 'Broadcasting announcements and scattering arrays across the cluster.' },
  { id: 'd2_6', title: '6. Global Reductions (MPI_Reduce)', desc: 'Aggregating distributed datasets into global totals using MPI_SUM, MPI_MAX, and MPI_MIN.' },
  { id: 'd2_7', title: '7. Parallel Numerical Integration (Trapezoidal Rule)', desc: 'Dividing mathematical integration intervals and computing PI with high-resolution MPI_Wtime.' },
  { id: 'd2_8', title: '8. GPU Programming & CUDA Concepts', desc: 'From 4 master chefs to 10,000 line workers. Host/Device memory, CUDA grids, blocks, and threads.' },
  { id: 'd2_9', title: '9. Modern Hybrid Computing (MPI + OpenMP + GPU)', desc: 'Multi-node network scaling (MPI) + Multi-core CPU threading (OpenMP) + GPU matrix acceleration.' }
];

function renderChecklist() {
  const grid = document.getElementById('checklistGrid');
  const scoreBadge = document.getElementById('readinessScore');
  const fill = document.getElementById('readinessFill');
  const data = CURRENT_DAY === 'day1' ? CHECKLIST_DAY1 : CHECKLIST_DAY2;
  const storageKey = `pc_check_${CURRENT_DAY}`;

  let completedSet = new Set(JSON.parse(localStorage.getItem(storageKey) || '[]'));

  function updateScore() {
    const count = completedSet.size;
    const pct = (count / data.length) * 100;
    scoreBadge.textContent = `${count} / ${data.length} Completed`;
    fill.style.width = `${pct}%`;
    localStorage.setItem(storageKey, JSON.stringify(Array.from(completedSet)));
  }

  grid.innerHTML = '';
  data.forEach(item => {
    const isDone = completedSet.has(item.id);
    const card = document.createElement('div');
    card.className = `check-item ${isDone ? 'completed' : ''}`;
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

function initChecklist() {
  renderChecklist();
}
