# 🚀 2-Day Parallel Computing Workshop Master Portal
### *“From One Chef → Multiple Chefs → Distributed Regional Branches”*

A comprehensive, interactive, trainer-ready repository and web application for a complete 2-Day Faculty Development Program (FDP) / Workshop on **Parallel & Distributed Computing**.

---

## 📑 2-Day Curriculum at a Glance

### 🍳 Day 1: Shared Memory Computing & OpenMP
- **Main Theme:** *"One Kitchen, Multiple Chefs, One Shared Refrigerator"*
- **Core Topics:** Parallel hardware, multi-core CPUs, Flynn's taxonomy (SIMD/MIMD), cache hierarchy & coherence, Amdahl's Law, OpenMP thread creation, parallel loops, variable scoping (`shared` vs `private`), race conditions, critical sections, reduction clauses, static/dynamic scheduling, and matrix multiplication benchmark.

### 🏢 Day 2: Distributed Memory Computing, MPI & GPU Accelerators
- **Main Theme:** *"Multiple Regional Restaurant Branches Communicating Across Cities"*
- **Core Topics:** Distributed memory architecture, MPI lifecycle (`MPI_Init`, `MPI_Finalize`), ranks and communicators (`MPI_COMM_WORLD`), point-to-point communication (`MPI_Send`, `MPI_Recv`), blocking semantics & deadlock prevention, collective operations (`MPI_Bcast`, `MPI_Scatter`, `MPI_Gather`, `MPI_Reduce`, `MPI_Barrier`), numerical integration (Trapezoidal rule computing $\pi$), parallel distributed sorting, GPU computing fundamentals (CUDA Grids/Blocks/Threads, Host vs Device), and modern Hybrid Computing (MPI + OpenMP + CUDA).

---

## 📂 Repository File Structure

```
parallel-computing-day1/
├── index.html                  # Master switchable 2-Day interactive web portal
├── style.css                   # Responsive theme with Day 1 & Day 2 simulator animations
├── app.js                      # Complete interactive engine (Simulators, Code Lab, Checklists)
├── DAY_2_TRAINER_HANDBOOK.md   # Exhaustive 8-hour publication-ready trainer manual
├── README.md                   # Setup guide and compilation reference
└── code_examples/
    ├── 01_hello_openmp.c
    ├── 02_array_parallel.c
    ├── 03_race_condition_vs_critical.c
    ├── 04_reduction.c
    ├── 05_scheduling.c
    ├── 06_matrix_mult.c
    ├── 07_benchmark_wtime.c
    └── day2/
        ├── 01_mpi_hello.c
        ├── 02_mpi_send_recv.c
        ├── 03_mpi_bcast.c
        ├── 04_mpi_scatter_gather.c
        ├── 05_mpi_reduce_sales.c
        ├── 06_mpi_trapezoidal.c
        ├── 07_mpi_parallel_sort.c
        ├── 08_cuda_vector_add.cu
        ├── 09_hybrid_mpi_openmp.c
        └── 10_challenge_sales_analyzer.c
```

---

## ⚡ How to Compile & Run the Code Examples

### 1. Day 1 OpenMP Programs (GCC on Linux / Windows MinGW):
```powershell
gcc -fopenmp 01_hello_openmp.c -o hello.exe
.\hello.exe
```

### 2. Day 2 MPI Programs (MS-MPI / MPICH on Windows):
```powershell
# If mpicc wrapper is available:
mpicc 01_mpi_hello.c -o hello_mpi.exe
mpiexec -n 4 .\hello_mpi.exe

# Or with GCC directly linking MS-MPI:
gcc -I"C:\Program Files (x86)\Microsoft SDKs\MPI\Include" 01_mpi_hello.c -L"C:\Program Files (x86)\Microsoft SDKs\MPI\Lib\x64" -lmsmpi -o hello_mpi.exe
mpiexec -n 4 .\hello_mpi.exe
```

### 3. Day 2 CUDA GPU Example:
```powershell
# With NVIDIA CUDA Compiler:
nvcc 08_cuda_vector_add.cu -o vector_add.exe
.\vector_add.exe

# Or compile with standard GCC (automatic CPU emulation fallback included):
gcc 08_cuda_vector_add.cu -o vector_add.exe
.\vector_add.exe
```

---

## 🌐 Opening the Interactive Web Portal

Open [`index.html`](file:///C:/Users/PC/.gemini/antigravity/scratch/parallel-computing-day1/index.html) in your favorite web browser, or launch a local web server:
```powershell
python -m http.server 8000
# Navigate to http://localhost:8000
```
Use the top header pills to effortlessly toggle between **Day 1: OpenMP** and **Day 2: MPI & GPU**.
