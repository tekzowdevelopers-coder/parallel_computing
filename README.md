# 🚀 Day 1: Parallel Computing + OpenMP Workshop
### *“From One Chef → Multiple Chefs → Parallel Kitchen”*

Welcome to the interactive learning repository for Day 1 of the 2-Day Parallel Computing Workshop!

---

## 📂 Project Structure

- `index.html` — The main interactive learning landing page (Open directly in any modern browser).
- `style.css` — Modern responsive theme (Dark & Light modes, responsive layouts, glassmorphism).
- `app.js` — Concurrency simulators, Amdahl's law chart, interactive code lab, and mastery checklist.
- `code_examples/` — Ready-to-compile C source files:
  1. `01_hello_openmp.c` — Thread teams and `omp_get_thread_num()`
  2. `02_array_parallel.c` — `#pragma omp parallel for`
  3. `03_race_condition_vs_critical.c` — Race conditions & critical sections
  4. `04_reduction.c` — High-performance tree reduction (`reduction(+:sum)`)
  5. `05_scheduling.c` — Static vs dynamic scheduling
  6. `06_matrix_mult.c` — Matrix multiplication with `collapse(2)`
  7. `07_benchmark_wtime.c` — Microsecond benchmarking with `omp_get_wtime()`

---

## ⚡ How to Compile & Run the C Examples

### GCC (Linux / macOS / MinGW on Windows):
```bash
gcc -fopenmp 01_hello_openmp.c -o hello
./hello
```

### Visual C++ (MSVC on Windows):
```cmd
cl /openmp 01_hello_openmp.c
01_hello_openmp.exe
```

---

## 🌐 Launching the Landing Page
Simply double-click `index.html` in your file explorer, or serve it with any lightweight server:
```bash
npx serve .
# or Python
python -m http.server 8000
```
