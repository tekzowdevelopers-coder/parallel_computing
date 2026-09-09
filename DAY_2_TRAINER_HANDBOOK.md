# 🚀 PARALLEL COMPUTING WORKSHOP — DAY 2 TRAINER HANDBOOK
### *“From One Kitchen to Multiple Restaurant Branches: Distributed Memory, MPI, GPU Computing & Hybrid Systems”*

---

**Target Audience:** Faculty Members, Researchers, Postgraduates, and Developers (Beginner Level)  
**Duration:** 8 Hours (Hands-on + Conceptual)  
**Primary Language:** C (with standard MPI and optional CUDA C)  
**Environment:** Windows 10/11 + VS Code + MS-MPI / MPICH  
**Main Pedagogical Theme:** Continuous Restaurant & Kitchen Scalability Metaphor  

---

## 📑 TABLE OF CONTENTS

1. [Workshop Overview & Day 2 Master Metaphor](#1-workshop-overview--day-2-master-metaphor)
2. [Day 2 Schedule at a Glance (8 Hours)](#2-day-2-schedule-at-a-glance-8-hours)
3. [The Restaurant Rosetta Stone (Day 2 Mapping)](#3-the-restaurant-rosetta-stone-day-2-mapping)
4. [Windows + VS Code MPI Environment Setup Guide](#4-windows--vs-code-mpi-environment-setup-guide)
5. [Session 1: Day 1 Recap & Introduction to MPI](#5-session-1-day-1-recap--introduction-to-mpi)
6. [Session 2: MPI Fundamentals & First Program](#6-session-2-mpi-fundamentals--first-program)
7. [Session 3: Point-to-Point Communication (`MPI_Send` & `MPI_Recv`)](#7-session-3-point-to-point-communication-mpi_send--mpi_recv)
8. [Session 4: Collective Communication (`Bcast`, `Scatter`, `Gather`, `Reduce`, `Barrier`)](#8-session-4-collective-communication-bcast-scatter-gather-reduce-barrier)
9. [Session 5: Numerical Integration (Trapezoidal Rule), MPI I/O & Timing](#9-session-5-numerical-integration-trapezoidal-rule-mpi-io--timing)
10. [Session 6: Parallel Sorting & Distributed Performance Evaluation](#10-session-6-parallel-sorting--distributed-performance-evaluation)
11. [Session 7: GPU Programming Fundamentals & CUDA](#11-session-7-gpu-programming-fundamentals--cuda)
12. [Session 8: Hybrid Systems (MPI + OpenMP + GPU) & Capstone Challenge](#12-session-8-hybrid-systems-mpi--openmp--gpu--capstone-challenge)
13. [Hands-on Lab Exercises (10 Complete Exercises with Solutions)](#13-hands-on-lab-exercises)
14. [Common MPI Mistakes & Troubleshooting Guide](#14-common-mpi-mistakes--troubleshooting-guide)
15. [Master Comparison Matrix: OpenMP vs. MPI vs. GPU](#15-master-comparison-matrix-openmp-vs-mpi-vs-gpu)
16. [Comprehensive Trainer Notes & Delivery Blueprint](#16-comprehensive-trainer-notes--delivery-blueprint)
17. [Post-Workshop Competencies & Participant Checklist](#17-post-workshop-competencies--participant-checklist)

---

## 1. WORKSHOP OVERVIEW & DAY 2 MASTER METAPHOR

### The Journey So Far
On **Day 1**, we explored the world of **Shared Memory Computing** using **OpenMP**. Our mental model was a single high-energy kitchen:
- **One Kitchen (CPU)**
- **Multiple Chefs (CPU Cores / Threads)**
- **One Central Refrigerator (Shared RAM)**

All chefs worked in the same physical space, accessed the same ingredients, and had to be careful not to overwrite the shared cash counter (Race Conditions & Critical Sections).

### The Day 2 Evolution: Franchising the Restaurant
Today on **Day 2**, our restaurant business has expanded across the country. We now operate **4 distinct branches**:
- **Branch 0:** Chennai (Headquarters / Master Branch)
- **Branch 1:** Bangalore
- **Branch 2:** Hosur
- **Branch 3:** Coimbatore

Each branch has its **own independent kitchen, its own chefs, and its own private refrigerator (Distributed Memory)**. 

> 💡 **The Core Problem of Day 2:**  
> A chef in Coimbatore cannot walk into the refrigerator in Chennai. If Bangalore needs 10 kg of tomatoes from Chennai, or if Headquarters wants to know total nationwide sales, they cannot just read a shared variable. **They must communicate by sending explicit messages across the network.** That is the essence of **MPI (Message Passing Interface)**.

---

## 2. DAY 2 SCHEDULE AT A GLANCE (8 HOURS)

| Time | Session | Type | Main Focus & Hands-on Deliverables |
| :--- | :--- | :--- | :--- |
| **09:00 – 09:30** | **Session 1** | Conceptual | **Day 1 Recap + Why Distributed Memory?** Transition from 1 kitchen to 4 branches; OpenMP vs. MPI comparison. |
| **09:30 – 10:30** | **Session 2** | Code Lab | **MPI Fundamentals & First Program:** `MPI_Init`, `MPI_Finalize`, `MPI_Comm_rank`, `MPI_Comm_size`, `MPI_COMM_WORLD`, Windows/VS Code setup. |
| **10:30 – 10:45** | **Break** | ☕ | *Morning Tea & Environment Verification* |
| **10:45 – 11:45** | **Session 3** | Code Lab | **Point-to-Point Communication:** `MPI_Send` & `MPI_Recv`, blocking semantics, envelope anatomy (data, count, type, dest, tag), deadlock scenarios. |
| **11:45 – 12:45** | **Session 4** | Code Lab | **Collective Communication:** Head manager announcements (`MPI_Bcast`), order dispatch (`MPI_Scatter`), result gathering (`MPI_Gather`), global revenue reduction (`MPI_Reduce`), synchronization (`MPI_Barrier`). |
| **12:45 – 13:45** | **Lunch** | 🍱 | *Lunch Break & Informal Discussion* |
| **13:45 – 14:45** | **Session 5** | Math & Code | **Numerical Integration, MPI I/O & Timing:** Trapezoidal rule parallelization, `MPI_Wtime()` benchmarking, file I/O bottleneck analysis. |
| **14:45 – 15:30** | **Session 6** | Algorithm | **Parallel Sorting & Performance:** Distributed bucket/bubble sort, communication overhead, speedup & efficiency on clusters. |
| **15:30 – 15:45** | **Break** | ☕ | *Afternoon Refreshment* |
| **15:45 – 16:30** | **Session 7** | Emerging Tech | **GPU Computing Fundamentals:** From master chefs to 1,000s of specialized line workers, Host vs. Device, CUDA Grids, Blocks, Threads, Vector Add. |
| **16:30 – 17:00** | **Session 8** | Capstone | **Hybrid Systems & Final Challenge:** MPI + OpenMP + GPU architecture, Capstone "Distributed Restaurant Sales Analyzer", 2-Day Grand Synthesis. |

---

## 3. THE RESTAURANT ROSETTA STONE (DAY 2 MAPPING)

| Computing Concept | Restaurant Analogy | Operational Meaning |
| :--- | :--- | :--- |
| **Computer Node / Cluster** | **Restaurant Chain / Franchise** | The complete enterprise of interconnected computing units. |
| **Distributed Memory** | **Multiple Separate Branch Kitchens** | Each location has isolated storage; no direct physical sharing of ingredients. |
| **MPI Process** | **Autonomous Branch Kitchen Manager** | An independent running OS process with its own private address space. |
| **MPI Rank (`rank`)** | **Branch ID (e.g., Rank 0 = Chennai)** | A unique integer identifier assigned to each process ($0, 1, \dots, \text{size}-1$). |
| **MPI Communicator (`MPI_COMM_WORLD`)** | **The Franchise Intercom Network** | The group of all active branches authorized to exchange orders and messages. |
| **`MPI_Send`** | **Dispatching a Courier / Delivery Van** | Packing data into an envelope and sending it to a specific target branch. |
| **`MPI_Recv`** | **Signing for and Unpacking a Delivery** | Waiting for and accepting incoming data from a specific sender branch. |
| **`MPI_Bcast`** | **Head Office Daily Special Announcement** | 1 branch broadcasts the identical data item to *all* other branches simultaneously. |
| **`MPI_Scatter`** | **Manager Dividing 100 Orders Among Branches** | Slicing a large dataset into equal pieces and sending piece $i$ to branch $i$. |
| **`MPI_Gather`** | **Collecting Finished Dish Reports from Branches** | Gathering individual pieces from all branches and assembling them into one master array. |
| **`MPI_Reduce`** | **Calculating Total Nationwide Sales** | Combining partial numerical results from all branches using an operator (`+`, `max`, `min`). |
| **`MPI_Barrier`** | **Synchronized Restaurant Opening at 11:00 AM** | All branches pause execution until every single branch reaches this synchronization checkpoint. |
| **GPU (Graphics Processing Unit)** | **High-Speed Automated Prep Factory** | Thousands of small, specialized workers executing identical simple tasks at massive speed. |
| **GPU Thread** | **One Line Worker Peeling One Potato** | The smallest execution unit handling a single data point. |
| **Hybrid Computing** | **Corporate Manager (MPI) + Kitchen (OpenMP) + Factory (GPU)** | Combining distributed processes across nodes with multi-threading and GPU accelerators. |
| **Communication Overhead** | **Highway Traffic & Delivery Van Delays** | Time wasted transferring bytes over the network rather than computing locally. |

---

## 4. WINDOWS + VS CODE MPI ENVIRONMENT SETUP GUIDE

### Compiling on Windows with MS-MPI:
```powershell
# Using GCC directly linking MS-MPI:
gcc -I"C:\Program Files (x86)\Microsoft SDKs\MPI\Include" hello.c -L"C:\Program Files (x86)\Microsoft SDKs\MPI\Lib\x64" -lmsmpi -o hello.exe

# Running with 4 MPI processes:
mpiexec -n 4 .\hello.exe
```

---

## 5. CODE LAB EXAMPLES SUMMARY (10 EXAMPLES)

1. `01_mpi_hello.c` — `MPI_Init`, `MPI_Finalize`, `MPI_Comm_rank`, `MPI_Comm_size`.
2. `02_mpi_send_recv.c` — Point-to-Point message envelopes (sending 42 kg tomatoes).
3. `03_mpi_bcast.c` — 1-to-All broadcast (secret recipe code #9021).
4. `04_mpi_scatter_gather.c` — Slicing dough and gathering baked bread.
5. `05_mpi_reduce_sales.c` — Global reductions (`MPI_SUM`, `MPI_MAX`, `MPI_MIN`).
6. `06_mpi_trapezoidal.c` — Numerical integration computing $\pi$.
7. `07_mpi_parallel_sort.c` — Distributed order sorting.
8. `08_cuda_vector_add.cu` — CUDA GPU kernel vector addition.
9. `09_hybrid_mpi_openmp.c` — Hybrid MPI + OpenMP multi-node program.
10. `10_challenge_sales_analyzer.c` — Capstone Project: Distributed Restaurant Sales Analyzer.

---
*End of Day 2 Trainer Handbook*
