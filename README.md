# 🚀 Parallel Computing Workshop: 2-Day Masterclass
### *“From One Kitchen to a Global Restaurant Franchise & Cloud Superkitchen”*

A comprehensive, interactive 2-day curriculum, trainer handbooks, live browser-based visual simulators, and 17 standalone C / CUDA code examples for teaching High-Performance & Parallel Computing from scratch.

---

## 📑 Workshop Structure & Quick Links

| Day | Topic & Theme | Web Portal | Handbook | Core Code Lab |
| :--- | :--- | :--- | :--- | :--- |
| **Day 1** | **OpenMP & Shared Memory Computing**<br>*“One Kitchen, Multiple Chefs, Shared Refrigerator”* | [`index.html`](index.html) | Included in Web Portal | [`code_examples/`](code_examples/) (7 C files) |
| **Day 2** | **MPI, Distributed Memory & GPU Computing**<br>*“Regional Restaurant Branches & Highway Logistics”* | [`day2.html`](day2.html) | [`DAY_2_TRAINER_HANDBOOK.md`](DAY_2_TRAINER_HANDBOOK.md) | [`code_examples/day2/`](code_examples/day2/) (10 C / CUDA files) |

---

## 📂 Repository File Structure

```
parallel_computing/
├── index.html                  # Day 1: Interactive Learning Web Portal (OpenMP)
├── style.css                   # Day 1: Stylesheet & UI theme
├── app.js                      # Day 1: Interactive simulators (Amdahl, Thread Pool, Race Condition)
│
├── day2.html                   # Day 2: Standalone Interactive Learning Web Portal (MPI & GPU)
├── day2.css                    # Day 2: Dedicated Cyber-Cyan stylesheet & logistics animation engine
├── day2.js                     # Day 2: 3 Live Simulators (P2P Courier, Collectives, CUDA GPU Explorer)
├── DAY_2_TRAINER_HANDBOOK.md   # Complete 8-Hour Trainer Guide & Classroom Script for Day 2
│
├── code_examples/              # Day 1 OpenMP C Source Files
│   ├── 01_hello_openmp.c
│   ├── 02_array_parallel.c
│   ├── 03_race_condition_vs_critical.c
│   ├── 04_reduction.c
│   ├── 05_scheduling.c
│   ├── 06_matrix_mult.c
│   └── 07_benchmark_wtime.c
│
└── code_examples/day2/         # Day 2 MPI & CUDA Source Files
    ├── 01_mpi_hello.c
    ├── 02_mpi_send_recv.c
    ├── 03_mpi_ring.c
    ├── 04_mpi_bcast.c
    ├── 05_mpi_scatter_gather.c
    ├── 06_mpi_reduce_sales.c
    ├── 07_mpi_trapezoidal.c
    ├── 08_mpi_parallel_sort.c
    ├── 09_cuda_vector_add.cu
    └── 10_challenge_sales_analyzer.c
```

---

## ⚡ How to Compile & Run Code Examples

### 1️⃣ Day 1: OpenMP (GCC / MSVC)
```bash
# GCC (Linux / macOS / MinGW):
cd code_examples
gcc -fopenmp 01_hello_openmp.c -o hello.exe
.\hello.exe

# MSVC (Windows Visual Studio Command Prompt):
cl /openmp 01_hello_openmp.c
01_hello_openmp.exe
```

### 2️⃣ Day 2: MPI Programs (Microsoft MPI on Windows or MPICH / OpenMPI on Linux)

#### Windows (Microsoft MPI):
1. Install [MS-MPI SDK & Redistributable](https://learn.microsoft.com/en-us/message-passing-interface/microsoft-mpi).
2. Compile and launch across 4 processes:
```cmd
cd code_examples\day2
cl.exe /I"C:\Program Files (x86)\Microsoft SDKs\MPI\Include" 01_mpi_hello.c /link /LIBPATH:"C:\Program Files (x86)\Microsoft SDKs\MPI\Lib\x64" msmpi.lib /out:01_mpi_hello.exe
mpiexec -n 4 01_mpi_hello.exe
```

#### Linux / macOS / MinGW (`mpicc`):
```bash
cd code_examples/day2
mpicc 01_mpi_hello.c -o 01_mpi_hello
mpirun -n 4 ./01_mpi_hello
```

### 3️⃣ Day 2: CUDA GPU Programs (NVIDIA `nvcc`)
```bash
cd code_examples/day2
nvcc 09_cuda_vector_add.cu -o cuda_vector_add
./cuda_vector_add
```

---

## 🌐 Running the Interactive Web Portals Locally

You can open either [`index.html`](index.html) or [`day2.html`](day2.html) directly in any web browser, or launch a quick local server:

```powershell
python -m http.server 8000
```
Then visit:
- **Day 1 (OpenMP):** `http://localhost:8000/index.html`
- **Day 2 (MPI & GPU):** `http://localhost:8000/day2.html`

