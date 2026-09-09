# 🚀 Day 1: Parallel Computing & OpenMP Workshop
### *“From One Chef → Multiple Chefs → Parallel Kitchen”*

Welcome to the interactive learning repository and web landing page for **Day 1 of the Parallel Computing Workshop (OpenMP & Shared Memory Computing)**.

---

## 📑 Day 1 Curriculum at a Glance

- **Duration:** 8 Hours (Hands-on + Concepts)
- **Main Theme:** *"One Kitchen, Multiple Chefs, One Shared Refrigerator"*
- **Core Topics:** 
  1. What is Parallel Computing? (The 100-Order Dilemma)
  2. Parallel Hardware & Architectures (CPUs, Cores, SIMD vs MIMD)
  3. Shared vs Distributed Memory Architecture (OpenMP vs Cluster Models)
  4. Cache Hierarchy, Memory Latency & Cache Coherence
  5. Speedup, Parallel Efficiency & Amdahl's Law (The Single Cashier Bottleneck)
  6. OpenMP Introduction, Directives & Thread Teams (`#pragma omp parallel`)
  7. Parallel Loops & Variable Scoping (`#pragma omp parallel for`, `shared` vs `private`)
  8. Race Conditions, Critical Sections & Reduction (`reduction(+:sum)`)
  9. Static vs Dynamic Loop Scheduling (Tea 1 min vs Biryani 20 min)
  10. Parallel Matrix Multiplication with `collapse(2)` & Wall-clock Benchmarking (`omp_get_wtime()`)

---

## 📂 Repository File Structure

```
parallel-computing-day1/
├── index.html              # Main interactive learning landing page
├── style.css               # Modern responsive theme (Dark/Light mode, animations, glassmorphic UI)
├── app.js                  # Live simulation engines, Canvas Amdahl chart, Code lab, Checklist
├── README.md               # Setup guide and compilation reference
└── code_examples/          # 7 standalone ready-to-run C source files
    ├── 01_hello_openmp.c
    ├── 02_array_parallel.c
    ├── 03_race_condition_vs_critical.c
    ├── 04_reduction.c
    ├── 05_scheduling.c
    ├── 06_matrix_mult.c
    └── 07_benchmark_wtime.c
```

---

## ⚡ How to Compile & Run the C Examples

### GCC (Linux / macOS / MinGW on Windows):
```bash
cd code_examples
gcc -fopenmp 01_hello_openmp.c -o hello.exe
.\hello.exe
```

### Visual C++ (MSVC on Windows):
```cmd
cd code_examples
cl /openmp 01_hello_openmp.c
01_hello_openmp.exe
```

---

## 🌐 Opening the Interactive Web Portal

Simply open [`index.html`](file:///C:/Users/PC/.gemini/antigravity/scratch/parallel-computing-day1/index.html) directly in your browser, or serve it locally:
```powershell
python -m http.server 8000
# Open http://localhost:8000
```
