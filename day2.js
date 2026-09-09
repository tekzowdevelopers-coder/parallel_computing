/**
 * Day 2: Distributed Memory, MPI, GPU & Hybrid Computing — Master Engine
 * "From One Kitchen -> Multiple Regional Restaurant Branches"
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initArchTabs();
  renderRosettaStone();
  initDay2MpiP2PSimulator();
  initDay2CollectiveSimulator();
  initDay2GpuSimulator();
  initCodeLab();
  initChecklist();
});

/* ==========================================================================
   1. Theme Toggle
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  const body = document.body;
  const icon = toggleBtn.querySelector('.toggle-icon');

  const savedTheme = localStorage.getItem('pc102_theme') || 'theme-dark';
  body.className = savedTheme;
  icon.textContent = savedTheme === 'theme-dark' ? '☀️' : '🌙';

  toggleBtn.addEventListener('click', () => {
    if (body.classList.contains('theme-dark')) {
      body.classList.replace('theme-dark', 'theme-light');
      icon.textContent = '🌙';
      localStorage.setItem('pc102_theme', 'theme-light');
    } else {
      body.classList.replace('theme-light', 'theme-dark');
      icon.textContent = '☀️';
      localStorage.setItem('pc102_theme', 'theme-dark');
    }
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
   3. Day 2 Franchise Rosetta Stone
   ========================================================================== */
const ROSETTA_DATA_DAY2 = [
  { icon: '🏢', term: 'Cluster / Network', arrow: '⇄', metaphor: 'Restaurant Franchise Chain', desc: 'Multiple autonomous restaurant branches connected via high-speed network.' },
  { icon: '🌐', term: 'Distributed Memory', arrow: '⇄', metaphor: 'Separate Branch Kitchens', desc: 'Each location has its own private refrigerator; no direct variable sharing.' },
  { icon: '👨🍳', term: 'MPI Process', arrow: '⇄', metaphor: 'Branch Kitchen Manager', desc: 'Independent running OS process with its own private address space.' },
  { icon: '🏷️', term: 'MPI Rank', arrow: '⇄', metaphor: 'Branch ID (0 = Chennai, 1 = Bangalore)', desc: 'Unique integer identifier (0 to size-1) assigned to each process.' },
  { icon: '📞', term: 'MPI_COMM_WORLD', arrow: '⇄', metaphor: 'Franchise Intercom Group', desc: 'The global communicator containing all active branch processes.' },
  { icon: '📦', term: 'MPI_Send / MPI_Recv', arrow: '⇄', metaphor: 'Tomato Courier Delivery', desc: 'Explicit point-to-point message dispatch and arrival envelope.' },
  { icon: '📢', term: 'MPI_Bcast', arrow: '⇄', metaphor: 'Head Office Promo Announcement', desc: 'HQ broadcasts one identical recipe code to every branch simultaneously.' },
  { icon: '🥖', term: 'MPI_Scatter / Gather', arrow: '⇄', metaphor: 'Dough Dispatch & Bread Collection', desc: 'Slicing orders among branches and gathering completed batches.' },
  { icon: '💰', term: 'MPI_Reduce', arrow: '⇄', metaphor: 'Calculating Total Franchise Revenue', desc: 'Combining partial branch sales into corporate totals (SUM/MAX/MIN).' },
  { icon: '🏭', term: 'GPU Accelerator', arrow: '⇄', metaphor: 'Mass Automated Prep Factory', desc: '10,000 specialized workers executing identical small tasks at massive speed.' },
  { icon: '⚡', term: 'Hybrid Computing', arrow: '⇄', metaphor: 'HQ + Chefs + Prep Factory', desc: 'Combining MPI (across nodes) + OpenMP (inside nodes) + CUDA (on GPUs).' },
  { icon: '🛑', term: 'MPI_Barrier', arrow: '⇄', metaphor: 'Synchronized Dinner Opening', desc: 'All branches halt and wait until every branch reaches the checkpoint.' }
];

function renderRosettaStone() {
  const grid = document.getElementById('rosettaGrid');
  grid.innerHTML = '';
  ROSETTA_DATA_DAY2.forEach(item => {
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
}

/* ==========================================================================
   4. Day 2 Simulator 1: Point-to-Point Tomato Dispatch & Deadlock Demo
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
   5. Day 2 Simulator 2: Collective Communication Visualizer
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
    hqBox.textContent = 'Recipe Promo Code: #9021 (Dum Biryani)';
    slots.forEach((s, idx) => {
      setTimeout(() => {
        s.classList.add('active-token');
        s.textContent = '#9021';
      }, idx * 200);
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
      }, idx * 200);
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
   6. Day 2 Simulator 3: GPU Grid / Block / Thread Visualizer
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
      }, Math.min(600, idx * 8));
    });

    summary.innerHTML = `⚡ <strong>GPU Kernel Executing:</strong> Launched ${chips.length} hardware threads concurrently! Every vector item A[i] + B[i] calculated in parallel.`;
  });

  nSelect.addEventListener('change', renderGpuGrid);
  renderGpuGrid();
}

/* ==========================================================================
   7. Code Lab Database (Day 2)
   ========================================================================== */
const CODE_LAB_DATABASE_DAY2 = {
  'd2-hello': {
    fileName: '01_mpi_hello.c',
    title: '01. MPI Hello World',
    code: `#include <mpi.h>\n#include <stdio.h>\n\nint main(int argc, char** argv)\n{\n    MPI_Init(&argc, &argv);\n\n    int rank, size;\n    MPI_Comm_rank(MPI_COMM_WORLD, &rank);\n    MPI_Comm_size(MPI_COMM_WORLD, &size);\n\n    printf("👨🍳 [Rank %d of %d] Branch online & ready to cook!\\n", rank, size);\n\n    MPI_Finalize();\n    return 0;\n}`,
    explanation: `<p><strong>MPI Lifecycle:</strong> <code>MPI_Init</code> initializes communication; <code>MPI_Comm_rank</code> gets branch ID; <code>MPI_Comm_size</code> gets total branch count; <code>MPI_Finalize</code> shuts down cleanly.</p>`,
    compileCmd: 'mpicc 01_mpi_hello.c -o hello_mpi.exe',
    runCmd: 'mpiexec -n 4 .\\hello_mpi.exe'
  },
  'd2-send-recv': {
    fileName: '02_mpi_send_recv.c',
    title: '02. MPI Send & Recv',
    code: `#include <mpi.h>\n#include <stdio.h>\n\nint main(int argc, char** argv)\n{\n    MPI_Init(&argc, &argv);\n    int rank;\n    MPI_Comm_rank(MPI_COMM_WORLD, &rank);\n    int tomato_kg;\n\n    if (rank == 0) {\n        tomato_kg = 42;\n        printf("📦 Branch 0: Sending %d kg tomatoes to Branch 1...\\n", tomato_kg);\n        MPI_Send(&tomato_kg, 1, MPI_INT, 1, 0, MPI_COMM_WORLD);\n    }\n    else if (rank == 1) {\n        MPI_Recv(&tomato_kg, 1, MPI_INT, 0, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);\n        printf("🍅 Branch 1: Received %d kg tomatoes! Ready to cook.\\n", tomato_kg);\n    }\n    MPI_Finalize();\n    return 0;\n}`,
    explanation: `<p><strong>Point-to-Point Message Envelope:</strong> Address, Count, Datatype, Destination/Source Rank, Tag, and Communicator.</p>`,
    compileCmd: 'mpicc 02_mpi_send_recv.c -o send_recv.exe',
    runCmd: 'mpiexec -n 2 .\\send_recv.exe'
  },
  'd2-bcast': {
    fileName: '03_mpi_bcast.c',
    title: '03. MPI Broadcast',
    code: `#include <mpi.h>\n#include <stdio.h>\n\nint main(int argc, char** argv)\n{\n    MPI_Init(&argc, &argv);\n    int rank;\n    MPI_Comm_rank(MPI_COMM_WORLD, &rank);\n    int recipe_code = 0;\n\n    if (rank == 0) {\n        recipe_code = 9021; // Special Dum Biryani Promo Code\n        printf("📢 [HQ]: Broadcasting Promo Code %d to all branches...\\n", recipe_code);\n    }\n\n    // 1-to-All Broadcast\n    MPI_Bcast(&recipe_code, 1, MPI_INT, 0, MPI_COMM_WORLD);\n    printf("🍛 [Branch %d]: Confirmed recipe promo code %d\\n", rank, recipe_code);\n\n    MPI_Finalize();\n    return 0;\n}`,
    explanation: `<p><strong>MPI_Bcast:</strong> Root sends data to all processes in the communicator simultaneously without explicit loops.</p>`,
    compileCmd: 'mpicc 03_mpi_bcast.c -o bcast.exe',
    runCmd: 'mpiexec -n 4 .\\bcast.exe'
  },
  'd2-scatter-gather': {
    fileName: '04_mpi_scatter_gather.c',
    title: '04. Scatter & Gather',
    code: `#include <mpi.h>\n#include <stdio.h>\n#include <stdlib.h>\n\nint main(int argc, char** argv)\n{\n    MPI_Init(&argc, &argv);\n    int rank, size;\n    MPI_Comm_rank(MPI_COMM_WORLD, &rank);\n    MPI_Comm_size(MPI_COMM_WORLD, &size);\n\n    int master_dough[4] = {10, 20, 30, 40};\n    int my_dough = 0;\n    int my_bread = 0;\n    int all_breads[4];\n\n    // Scatter dough to branches\n    MPI_Scatter(master_dough, 1, MPI_INT, &my_dough, 1, MPI_INT, 0, MPI_COMM_WORLD);\n    my_bread = my_dough * 2; // Bake bread\n\n    // Gather baked bread back to HQ\n    MPI_Gather(&my_bread, 1, MPI_INT, all_breads, 1, MPI_INT, 0, MPI_COMM_WORLD);\n\n    if (rank == 0) {\n        printf("🧺 [HQ]: Gathered baked bread from all branches: [%d, %d, %d, %d]\\n",\n               all_breads[0], all_breads[1], all_breads[2], all_breads[3]);\n    }\n    MPI_Finalize();\n    return 0;\n}`,
    explanation: `<p><strong>Scatter & Gather:</strong> <code>MPI_Scatter</code> divides an array into equal disjoint slices. <code>MPI_Gather</code> collects slices back into one master buffer.</p>`,
    compileCmd: 'mpicc 04_mpi_scatter_gather.c -o scatter_gather.exe',
    runCmd: 'mpiexec -n 4 .\\scatter_gather.exe'
  },
  'd2-reduce': {
    fileName: '05_mpi_reduce_sales.c',
    title: '05. MPI Reduce Sales',
    code: `#include <mpi.h>\n#include <stdio.h>\n\nint main(int argc, char** argv)\n{\n    MPI_Init(&argc, &argv);\n    int rank;\n    MPI_Comm_rank(MPI_COMM_WORLD, &rank);\n\n    int my_sales = (rank + 1) * 25000;\n    int total_franchise_sales = 0;\n    int max_branch_sales = 0;\n\n    MPI_Reduce(&my_sales, &total_franchise_sales, 1, MPI_INT, MPI_SUM, 0, MPI_COMM_WORLD);\n    MPI_Reduce(&my_sales, &max_branch_sales, 1, MPI_INT, MPI_MAX, 0, MPI_COMM_WORLD);\n\n    if (rank == 0) {\n        printf("💰 Total Corporate Revenue: Rs. %d\\n", total_franchise_sales);\n        printf("🌟 Top Single Branch Sales: Rs. %d\\n", max_branch_sales);\n    }\n    MPI_Finalize();\n    return 0;\n}`,
    explanation: `<p><strong>Global Reductions:</strong> <code>MPI_Reduce</code> combines data from all processes using an associative operator (<code>MPI_SUM</code>, <code>MPI_MAX</code>, <code>MPI_MIN</code>).</p>`,
    compileCmd: 'mpicc 05_mpi_reduce_sales.c -o reduce_sales.exe',
    runCmd: 'mpiexec -n 4 .\\reduce_sales.exe'
  },
  'd2-trapezoidal': {
    fileName: '06_mpi_trapezoidal.c',
    title: '06. Trapezoidal Rule (PI)',
    code: `#include <mpi.h>\n#include <stdio.h>\n#include <math.h>\n\ndouble f(double x) { return 4.0 / (1.0 + x * x); }\n\ndouble Trap(double a, double b, int n, double h) {\n    double est = (f(a) + f(b)) / 2.0;\n    for(int i = 1; i < n; i++) est += f(a + i * h);\n    return est * h;\n}\n\nint main(int argc, char** argv)\n{\n    MPI_Init(&argc, &argv);\n    int rank, size;\n    MPI_Comm_rank(MPI_COMM_WORLD, &rank);\n    MPI_Comm_size(MPI_COMM_WORLD, &size);\n\n    double a = 0.0, b = 1.0; int n = 50000000;\n    double h = (b - a) / n;\n    int local_n = n / size;\n    double local_a = a + rank * local_n * h;\n    double local_b = local_a + local_n * h;\n\n    double local_int = Trap(local_a, local_b, local_n, h);\n    double total_int = 0.0;\n\n    MPI_Reduce(&local_int, &total_int, 1, MPI_DOUBLE, MPI_SUM, 0, MPI_COMM_WORLD);\n    if (rank == 0) printf("🎯 Computed PI: %.12f (Error: %.2e)\\n", total_int, fabs(total_int - 3.141592653589));\n    MPI_Finalize();\n    return 0;\n}`,
    explanation: `<p><strong>Numerical Integration in Parallel:</strong> Each process computes the area of its local sub-interval; <code>MPI_Reduce</code> sums all sub-areas into total PI value.</p>`,
    compileCmd: 'mpicc 06_mpi_trapezoidal.c -o trap_pi.exe -lm',
    runCmd: 'mpiexec -n 4 .\\trap_pi.exe'
  },
  'd2-sort': {
    fileName: '07_mpi_parallel_sort.c',
    title: '07. Parallel Sorting',
    code: `#include <mpi.h>\n#include <stdio.h>\n#include <stdlib.h>\n\nvoid bubble_sort(int arr[], int n) {\n    for(int i=0; i<n-1; i++)\n        for(int j=0; j<n-i-1; j++)\n            if(arr[j]>arr[j+1]) { int t=arr[j]; arr[j]=arr[j+1]; arr[j+1]=t; }\n}\n\nint main(int argc, char** argv) {\n    MPI_Init(&argc, &argv);\n    int rank, size; MPI_Comm_rank(MPI_COMM_WORLD, &rank); MPI_Comm_size(MPI_COMM_WORLD, &size);\n    int local_n = 4; int local_arr[4]; int master_arr[16] = {84,12,45,99,23,67,34,11,90,5,52,78,19,61,88,3};\n    int gathered[16];\n\n    MPI_Scatter(master_arr, local_n, MPI_INT, local_arr, local_n, MPI_INT, 0, MPI_COMM_WORLD);\n    bubble_sort(local_arr, local_n);\n    MPI_Gather(local_arr, local_n, MPI_INT, gathered, local_n, MPI_INT, 0, MPI_COMM_WORLD);\n\n    if (rank == 0) {\n        bubble_sort(gathered, 16);\n        printf("✅ Globally Sorted Array: ");\n        for(int i=0; i<16; i++) printf("%d ", gathered[i]);\n        printf("\\n");\n    }\n    MPI_Finalize(); return 0;\n}`,
    explanation: `<p><strong>Distributed Sorting:</strong> Scatter data -> Local Sort -> Gather sorted sections -> Global Merge.</p>`,
    compileCmd: 'mpicc 07_mpi_parallel_sort.c -o parallel_sort.exe',
    runCmd: 'mpiexec -n 4 .\\parallel_sort.exe'
  },
  'd2-cuda': {
    fileName: '08_cuda_vector_add.cu',
    title: '08. CUDA GPU Vector Add',
    code: `#include <stdio.h>\n#include <stdlib.h>\n#define N 1000000\n\n#ifdef __CUDACC__\n__global__ void VectorAddKernel(const float* A, const float* B, float* C, int n) {\n    int i = blockIdx.x * blockDim.x + threadIdx.x;\n    if (i < n) C[i] = A[i] + B[i];\n}\n#endif\n\nint main() {\n    size_t size = N * sizeof(float);\n    float *h_A = (float*)malloc(size), *h_B = (float*)malloc(size), *h_C = (float*)malloc(size);\n    for(int i=0; i<N; i++) { h_A[i]=1.5f; h_B[i]=2.5f; }\n\n    #ifdef __CUDACC__\n    float *d_A, *d_B, *d_C;\n    cudaMalloc((void**)&d_A, size); cudaMalloc((void**)&d_B, size); cudaMalloc((void**)&d_C, size);\n    cudaMemcpy(d_A, h_A, size, cudaMemcpyHostToDevice);\n    cudaMemcpy(d_B, h_B, size, cudaMemcpyHostToDevice);\n    VectorAddKernel<<<(N+255)/256, 256>>>(d_A, d_B, d_C, N);\n    cudaMemcpy(h_C, d_C, size, cudaMemcpyDeviceToHost);\n    cudaFree(d_A); cudaFree(d_B); cudaFree(d_C);\n    #else\n    for(int i=0; i<N; i++) h_C[i] = h_A[i] + h_B[i];\n    #endif\n\n    printf("✅ Verification: C[0]=%.2f, C[%d]=%.2f\\n", h_C[0], N-1, h_C[N-1]);\n    return 0;\n}`,
    explanation: `<p><strong>CUDA GPU Kernel:</strong> 10,000s of GPU threads execute <code>VectorAddKernel</code> concurrently. Thread index calculated via <code>blockIdx.x * blockDim.x + threadIdx.x</code>.</p>`,
    compileCmd: 'nvcc 08_cuda_vector_add.cu -o vector_add.exe (or gcc in CPU fallback mode)',
    runCmd: '.\\vector_add.exe'
  },
  'd2-hybrid': {
    fileName: '09_hybrid_mpi_openmp.c',
    title: '09. Hybrid MPI + OpenMP',
    code: `#include <mpi.h>\n#include <omp.h>\n#include <stdio.h>\n\nint main(int argc, char** argv)\n{\n    int provided;\n    MPI_Init_thread(&argc, &argv, MPI_THREAD_FUNNELED, &provided);\n\n    int rank, size;\n    MPI_Comm_rank(MPI_COMM_WORLD, &rank);\n    MPI_Comm_size(MPI_COMM_WORLD, &size);\n\n    printf("🏢 Branch (MPI Process) %d of %d active.\\n", rank, size);\n\n    #pragma omp parallel\n    {\n        printf("   👨🍳 [Branch %d -> Thread %d] Cooking local slice!\\n", rank, omp_get_thread_num());\n    }\n\n    MPI_Finalize();\n    return 0;\n}`,
    explanation: `<p><strong>Hybrid Model:</strong> MPI processes run across distributed nodes; inside each node, OpenMP threads utilize multiple CPU cores.</p>`,
    compileCmd: 'mpicc -fopenmp 09_hybrid_mpi_openmp.c -o hybrid.exe',
    runCmd: 'mpiexec -n 2 .\\hybrid.exe'
  },
  'd2-capstone': {
    fileName: '10_challenge_sales_analyzer.c',
    title: '10. Capstone Sales Analyzer',
    code: `#include <mpi.h>\n#include <stdio.h>\n#define ITEMS 5\n#define BRANCHES 4\n\nint main(int argc, char** argv)\n{\n    MPI_Init(&argc, &argv);\n    int rank;\n    MPI_Comm_rank(MPI_COMM_WORLD, &rank);\n\n    int all_sales[20] = {150,280,420,190,310, 520,190,240,380,490, 95,120,150,210,180, 330,450,290,200,580};\n    int local_sales[ITEMS];\n\n    // 1. Scatter sales to 4 branches\n    MPI_Scatter(all_sales, ITEMS, MPI_INT, local_sales, ITEMS, MPI_INT, 0, MPI_COMM_WORLD);\n\n    // 2. Local statistics\n    int local_total = 0, local_max = local_sales[0];\n    for(int i=0; i<ITEMS; i++) {\n        local_total += local_sales[i];\n        if (local_sales[i] > local_max) local_max = local_sales[i];\n    }\n\n    // 3. Global Reductions to HQ\n    int global_revenue = 0, global_max = 0;\n    MPI_Reduce(&local_total, &global_revenue, 1, MPI_INT, MPI_SUM, 0, MPI_COMM_WORLD);\n    MPI_Reduce(&local_max, &global_max, 1, MPI_INT, MPI_MAX, 0, MPI_COMM_WORLD);\n\n    if (rank == 0) {\n        printf("🏆 GRAND FINANCIAL AUDIT:\\n");\n        printf("   Total Corporate Revenue: Rs. %d\\n", global_revenue);\n        printf("   Highest Single Item:     Rs. %d\\n", global_max);\n    }\n    MPI_Finalize();\n    return 0;\n}`,
    explanation: `<p><strong>Capstone Project:</strong> Combines <code>MPI_Scatter</code>, local branch aggregation, <code>MPI_Reduce</code>, and benchmarking into a complete enterprise analytics pipeline.</p>`,
    compileCmd: 'mpicc 10_challenge_sales_analyzer.c -o capstone.exe',
    runCmd: 'mpiexec -n 4 .\\capstone.exe'
  }
};

function initCodeLab() {
  const nav = document.getElementById('codeLabNav');
  const copyBtn = document.getElementById('copyCodeBtn');
  nav.innerHTML = '';

  let firstKey = null;
  for (const [key, item] of Object.entries(CODE_LAB_DATABASE_DAY2)) {
    if (!firstKey) firstKey = key;
    const btn = document.createElement('button');
    btn.className = 'lab-tab';
    btn.setAttribute('data-code', key);
    btn.innerHTML = `<span class="tab-title">${item.title}</span>`;
    btn.addEventListener('click', () => loadCodeLab(key));
    nav.appendChild(btn);
  }

  copyBtn.addEventListener('click', () => {
    const code = document.getElementById('codeContent').textContent;
    navigator.clipboard.writeText(code).then(() => {
      const orig = copyBtn.innerHTML;
      copyBtn.innerHTML = '<span>✅ Copied!</span>';
      setTimeout(() => { copyBtn.innerHTML = orig; }, 1800);
    });
  });

  if (firstKey) loadCodeLab(firstKey);
}

function loadCodeLab(key) {
  const data = CODE_LAB_DATABASE_DAY2[key];
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

/* ==========================================================================
   8. Day 2 Mastery Checklist
   ========================================================================== */
const CHECKLIST_DAY2 = [
  { id: 1, title: '1. Distributed Memory Architecture', desc: 'Each computer/branch has isolated private RAM and must communicate via network messages.' },
  { id: 2, title: '2. MPI Communicator & Ranks', desc: 'MPI_COMM_WORLD connects all branches; Rank (0 to size-1) identifies each branch process.' },
  { id: 3, title: '3. Point-to-Point Messaging (Send/Recv)', desc: 'Explicit message envelopes with buffer, count, datatype, destination, tag, and comm.' },
  { id: 4, title: '4. Deadlock Recognition & Prevention', desc: 'Preventing mutual blocking waits by ensuring matching send/recv orders or non-blocking calls.' },
  { id: 5, title: '5. Collective Operations (Bcast & Scatter)', desc: 'Broadcasting announcements and scattering arrays across the cluster.' },
  { id: 6, title: '6. Global Reductions (MPI_Reduce)', desc: 'Aggregating distributed datasets into global totals using MPI_SUM, MPI_MAX, and MPI_MIN.' },
  { id: 7, title: '7. Parallel Numerical Integration (Trapezoidal Rule)', desc: 'Dividing mathematical integration intervals and computing PI with high-resolution MPI_Wtime.' },
  { id: 8, title: '8. GPU Programming & CUDA Concepts', desc: 'From 4 master chefs to 10,000 line workers. Host/Device memory, CUDA grids, blocks, and threads.' },
  { id: 9, title: '9. Modern Hybrid Computing (MPI + OpenMP + GPU)', desc: 'Multi-node network scaling (MPI) + Multi-core CPU threading (OpenMP) + GPU matrix acceleration.' }
];

function initChecklist() {
  const grid = document.getElementById('checklistGrid');
  const scoreBadge = document.getElementById('readinessScore');
  const fill = document.getElementById('readinessFill');
  const storageKey = 'pc102_checklist';

  let completedSet = new Set(JSON.parse(localStorage.getItem(storageKey) || '[]'));

  function updateScore() {
    const count = completedSet.size;
    const pct = (count / CHECKLIST_DAY2.length) * 100;
    scoreBadge.textContent = `${count} / ${CHECKLIST_DAY2.length} Completed`;
    fill.style.width = `${pct}%`;
    localStorage.setItem(storageKey, JSON.stringify(Array.from(completedSet)));
  }

  grid.innerHTML = '';
  CHECKLIST_DAY2.forEach(item => {
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
