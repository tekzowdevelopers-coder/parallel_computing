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
13. [Hands-on Lab Exercises (8 Complete Exercises with Solutions)](#13-hands-on-lab-exercises)
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

Use this reference table throughout the day to bridge computer science abstractions with intuitive physical mechanics:

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

> ⚠️ **CRITICAL TRAINER NOTE FOR WINDOWS ENVIRONMENTS:**  
> On Windows, the MPI compiler and runtime setup differs from Linux. Microsoft provides **MS-MPI** (Microsoft MPI), which includes the runtime (`mpiexec.exe`) and SDK headers (`mpi.h`, `msmpi.lib`). Microsoft MS-MPI **does not** supply a standard `mpicc` wrapper out-of-the-box. Below are the two recommended paths for beginner workshops on Windows.

### Option A: Recommended Beginner Setup (MSYS2 / MinGW-w64 with MS-MPI or MPICH)

If using GCC (MinGW-w64) with standard wrappers:
1. Open PowerShell and verify GCC is installed:
   ```powershell
   gcc --version
   ```
2. Verify MS-MPI runtime is installed:
   ```powershell
   mpiexec
   ```
   *(If installed, it outputs Microsoft MPI usage options).*

### Option B: Compiling with MinGW GCC + MS-MPI Directly
If `mpicc` is not present, compile directly with GCC linking `msmpi.dll`:
```powershell
gcc -I"C:\Program Files (x86)\Microsoft SDKs\MPI\Include" hello.c -L"C:\Program Files (x86)\Microsoft SDKs\MPI\Lib\x64" -lmsmpi -o hello.exe
```

### Option C: Compiling with MSVC (Developer Command Prompt / VS Code MSVC)
```cmd
cl /I"C:\Program Files (x86)\Microsoft SDKs\MPI\Include" hello.c /link /LIBPATH:"C:\Program Files (x86)\Microsoft SDKs\MPI\Lib\x64" msmpi.lib /out:hello.exe
```

### Running MPI Programs:
To launch 4 parallel processes:
```powershell
mpiexec -n 4 .\hello.exe
```

### Common Windows Setup Errors & Fixes
| Error Message | Root Cause | Instant Fix |
| :--- | :--- | :--- |
| `'mpiexec' is not recognized` | MS-MPI Binaries not in system `PATH`. | Add `C:\Program Files\Microsoft MPI\Bin\` to Environment Variables `PATH`. |
| `'mpi.h': No such file or directory` | Include directory path not passed to compiler. | Add `-I"C:\Program Files (x86)\Microsoft SDKs\MPI\Include"` to compilation command. |
| `Cannot open msmpi.lib / undefined reference to MPI_Init` | Linker cannot find MPI library. | Add library search path and `-lmsmpi` (or `msmpi.lib`). |
| Firewall prompt appears when running `mpiexec` | Windows Firewall blocking local inter-process socket communication. | Click **"Allow Access"** on Private Networks. |

---

## 5. SESSION 1 — DAY 1 RECAP & INTRODUCTION TO MPI

### Duration: 09:00 – 09:30 (30 mins)

### 1. Interactive Warm-up: 5-Minute Recap Quiz
Start by projecting these questions to the participants:
1. *What is parallel computing in one sentence?* (Splitting a problem to run concurrently on multiple hardware resources.)
2. *What is the difference between a process and a thread?* (Processes have private isolated memory; threads share memory within a process.)
3. *What is a Race Condition?* (Two or more threads writing to shared memory simultaneously without synchronization, corrupting data.)
4. *How did OpenMP fix the shared cash counter problem?* (`#pragma omp critical` or `#pragma omp parallel for reduction(+:sum)`.)
5. *What is Amdahl’s Law?* (Speedup is bounded by the serial bottleneck: $Speedup \le 1/S$.)

---

### 2. The Day 2 Story: Franchising the Restaurant

```
               CORPORATE RESTAURANT CHAIN
                           │
      ┌────────────┬───────┴───────┬────────────┐
      ↓            ↓               ↓            ↓
  BRANCH 0     BRANCH 1        BRANCH 2     BRANCH 3
  (Chennai)   (Bangalore)       (Hosur)    (Coimbatore)
    [RAM 0]      [RAM 1]         [RAM 2]      [RAM 3]
       │            │               │            │
       └────────────┴───────┬───────┴────────────┘
                            ↓
               INTERCONNECT NETWORK CABLE
               (Explicit Messages / MPI)
```

Explain to the class:
> *"Yesterday, our restaurant had 4 chefs working around 1 shared refrigerator in Chennai. But what if we want to serve customers in Bangalore, Hosur, and Coimbatore? We can't stretch one refrigerator across 500 kilometers! Each city builds its own branch with its own kitchen, chefs, and refrigerator. This is **Distributed Memory Computing**. To coordinate, the branches must use the phone or internet. In high-performance computing, that communication protocol is called **MPI (Message Passing Interface)**."*

---

### 3. OpenMP vs. MPI: The Fundamental Paradigm Shift

| Feature | OpenMP (Day 1) | MPI (Day 2) |
| :--- | :--- | :--- |
| **Memory Architecture** | **Shared Memory** (One central address space) | **Distributed Memory** (Isolated address spaces per node) |
| **Execution Entity** | **Threads** (Lightweight workers inside a process) | **Processes** (Heavyweight, independent OS processes) |
| **Data Sharing** | Implicit via shared memory pointers/variables | Explicit via network messages (`Send` / `Recv`) |
| **Hardware Target** | Multi-core laptop, desktop, single CPU socket | Computer clusters, supercomputers, networked cloud nodes |
| **Data Hazards** | Race conditions, false sharing, cache coherence | Deadlocks, message truncation, buffer overflow |
| **Scalability Limit** | Limited by single motherboard memory bus (~64-128 cores) | Scales to millions of cores across massive data centers |

---

## 6. SESSION 2 — MPI FUNDAMENTALS & FIRST PROGRAM

### Duration: 09:30 – 10:30 (60 mins)

### 1. The Core Lifecycle of an MPI Application
Every MPI program follows a four-part contract:
1. **Initialize MPI Execution:** `MPI_Init` sets up communication channels, allocates internal buffers, and gives processes their identity.
2. **Determine Process Count:** `MPI_Comm_size` asks: *"How many total branch kitchens exist in our chain?"*
3. **Determine Process Identity:** `MPI_Comm_rank` asks: *"Which specific branch am I? ($0, 1, \dots, N-1$)"*
4. **Finalize MPI Execution:** `MPI_Finalize` cleanly shuts down network sockets, flushes buffers, and releases cluster resources.

---

### 2. Code Example: `01_mpi_hello.c`

```c
#include <mpi.h>
#include <stdio.h>

int main(int argc, char** argv)
{
    // Step 1: Initialize the MPI communication environment
    MPI_Init(&argc, &argv);

    int rank, size;

    // Step 2: Get the unique ID (Rank) of this process
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);

    // Step 3: Get the total number of running processes (Size)
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    // Step 4: Perform independent work based on rank
    printf("👨🍳 Branch ID (Rank) %d of %d online! Ready to cook.\n", rank, size);

    // Step 5: Cleanly terminate MPI environment
    MPI_Finalize();

    return 0;
}
```

---

### 3. Line-by-Line Breakdown & Deep Explanation

- `#include <mpi.h>`: Contains definitions, function prototypes, MPI datatypes, and constants (e.g., `MPI_COMM_WORLD`, `MPI_INT`).
- `MPI_Init(&argc, &argv)`: Must be called before any other MPI function. It passes command-line arguments so the MPI runtime can extract cluster flags (like process IDs and socket mappings).
- `MPI_COMM_WORLD`: The default **communicator** (communication universe) containing all processes spawned by `mpiexec`. Analogy: *The global franchise intercom connecting all authorized branches.*
- `MPI_Comm_rank(MPI_COMM_WORLD, &rank)`: Assigns an integer ID ($0, 1, \dots, \text{size}-1$) to the calling process. Rank 0 is typically designated as the **Master / Coordinator Branch**.
- `MPI_Comm_size(MPI_COMM_WORLD, &size)`: Populates `size` with the total number of processes requested by `-n <num>`.
- `MPI_Finalize()`: Must be called before `main()` exits. No MPI calls are permitted after this.

---

### 4. Compilation & Execution Output

**Command:**
```powershell
mpiexec -n 4 .\01_mpi_hello.exe
```

**Sample Output:**
```text
👨🍳 Branch ID (Rank) 0 of 4 online! Ready to cook.
👨🍳 Branch ID (Rank) 2 of 4 online! Ready to cook.
👨🍳 Branch ID (Rank) 1 of 4 online! Ready to cook.
👨🍳 Branch ID (Rank) 3 of 4 online! Ready to cook.
```

> ❓ **Expected Student Question:** *"Why did Rank 2 print before Rank 1?"*  
> 💬 **Trainer Answer:** *"Because all 4 processes are completely independent programs running concurrently on separate CPU cores. The operating system schedules them independently. There is no guaranteed order in parallel execution unless you explicitly synchronize them!"*

---

## 7. SESSION 3 — POINT-TO-POINT COMMUNICATION

### Duration: 10:45 – 11:45 (60 mins)

### 1. The Tomato Dispatch Story
> *"Branch 0 (Chennai) has run out of tomatoes during Saturday evening rush. Branch 0 calls Branch 1 (Bangalore) and dispatches a delivery courier carrying exactly **42 kg of fresh tomatoes**."*

---

### 2. Anatomy of the MPI Message Envelope
Sending a message across a cluster requires an explicit envelope containing 6 pieces of information:

```
┌─────────────────────────────────────────────────────────────┐
│                      MPI MESSAGE ENVELOPE                   │
├─────────────────────────────────────────────────────────────┤
│ 1. Buffer Address : Memory pointer where data starts (&num) │
│ 2. Element Count  : Number of items (e.g., 1, 100, 1000)     │
│ 3. Datatype       : MPI_INT, MPI_FLOAT, MPI_DOUBLE, MPI_CHAR│
│ 4. Target / Source: Rank of Destination or Source process    │
│ 5. Tag            : User message ID (e.g., Tag 0 = Tomatoes)│
│ 6. Communicator   : Group context (MPI_COMM_WORLD)          │
└─────────────────────────────────────────────────────────────┘
```

---

### 3. Code Example: `02_mpi_send_recv.c`

```c
#include <mpi.h>
#include <stdio.h>

int main(int argc, char** argv)
{
    MPI_Init(&argc, &argv);

    int rank;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);

    int tomato_kg;

    if (rank == 0)
    {
        // Branch 0 prepares package
        tomato_kg = 42;
        printf("📦 Branch 0 (Chennai): Sending %d kg tomatoes to Branch 1...\n", tomato_kg);

        // MPI_Send(buffer, count, datatype, destination, tag, communicator)
        MPI_Send(&tomato_kg, 1, MPI_INT, 1, 0, MPI_COMM_WORLD);
        printf("🚚 Branch 0: Package dispatched!\n");
    }
    else if (rank == 1)
    {
        // Branch 1 waits for package
        printf("⏳ Branch 1 (Bangalore): Waiting at loading dock for delivery...\n");

        // MPI_Recv(buffer, count, datatype, source, tag, communicator, status)
        MPI_Recv(&tomato_kg, 1, MPI_INT, 0, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
        printf("🍅 Branch 1 (Bangalore): Successfully received %d kg tomatoes from Branch 0!\n", tomato_kg);
    }
    else
    {
        printf("Branch %d: Regular cooking duty (no tomato dispatch).\n", rank);
    }

    MPI_Finalize();
    return 0;
}
```

---

### 4. Blocking Semantics & The Danger of Deadlock

#### What does "Blocking" mean?
- **`MPI_Send` is blocking:** It does not return until the sender's local buffer can be safely overwritten (either copied into MPI network buffer or received by receiver).
- **`MPI_Recv` is blocking:** It pauses execution and waits until matching data physically arrives in memory.

#### The Classic Kitchen Deadlock Story:
> *"Suppose Chennai wants 10 kg of butter from Bangalore before it can cook. But Bangalore ALSO wants 10 kg of spices from Chennai before it can cook. Both branch managers sit on the phone waiting for the other to send first. Neither sends. **Both kitchens freeze forever.**"*

```c
// ⚠️ DANGEROUS DEADLOCK PATTERN:
// Process 0:
MPI_Recv(..., source = 1, ...); // Waiting for Process 1
MPI_Send(..., dest   = 1, ...);

// Process 1:
MPI_Recv(..., source = 0, ...); // Waiting for Process 0
MPI_Send(..., dest   = 0, ...);
// RESULT: Complete system freeze (Deadlock)!
```

> 🛡️ **The Golden Rule:** Always ensure matching `Send` and `Recv` orders, or use non-blocking routines (`MPI_Isend`, `MPI_Irecv`) / `MPI_Sendrecv`.

---

## 8. SESSION 4 — COLLECTIVE COMMUNICATION

### Duration: 11:45 – 12:45 (60 mins)

Collective operations involve **all processes** within a communicator simultaneously. No tags are used!

```
1. MPI_Bcast (Broadcast)           2. MPI_Scatter (Distribute Work)
   [Data] -> All Branches             [Data 1, 2, 3, 4] -> P0, P1, P2, P3

3. MPI_Gather (Collect Results)    4. MPI_Reduce (Global Aggregation)
   P0, P1, P2, P3 -> [Master Array]   P0+P1+P2+P3 -> Total Sum at Root
```

---

### 1. Detailed Collective Operations

#### A. `MPI_Bcast` (Headquarters Announcement)
- **Story:** Headquarters (Rank 0) announces: *"Today's special recipe is Dum Biryani, secret spice code = 9021."*
- **Syntax:** `MPI_Bcast(buffer, count, datatype, root, comm)`
- **Behavior:** Root sends data; all other ranks receive data into the same buffer.

#### B. `MPI_Scatter` (Dispatching 100 Orders Across 4 Branches)
- **Story:** 100 incoming catering orders arrive at headquarters. Head office splits them into 4 chunks of 25 orders each: Branch 0 gets 0–24, Branch 1 gets 25–49, Branch 2 gets 50–74, Branch 3 gets 75–99.
- **Syntax:** `MPI_Scatter(sendbuf, sendcount, sendtype, recvbuf, recvcount, recvtype, root, comm)`

#### C. `MPI_Gather` (Collecting Completed Dish Batches)
- **Story:** Each branch prepares 25 packaged meals. Headquarters collects all 25 from each branch to assemble the full 100-meal order.
- **Syntax:** `MPI_Gather(sendbuf, sendcount, sendtype, recvbuf, recvcount, recvtype, root, comm)`

#### D. `MPI_Reduce` (Calculating Global Franchise Sales)
- **Story:** Chennai earned ₹50,000, Bangalore ₹75,000, Hosur ₹30,000, Coimbatore ₹45,000. Headquarters uses `MPI_SUM` to compute total chain revenue (₹200,000).
- **Operators:** `MPI_SUM`, `MPI_MAX` (find top-selling branch), `MPI_MIN`, `MPI_PROD`.

#### E. `MPI_Barrier` (Synchronized Restaurant Launch)
- **Story:** No branch unlocks its front doors for dinner until *all 4 branches* finish prep work.
- **Syntax:** `MPI_Barrier(MPI_COMM_WORLD);`

---

### 2. Code Example: `03_mpi_collective_sales.c`

```c
#include <mpi.h>
#include <stdio.h>
#include <stdlib.h>

#define TOTAL_BRANCHES 4

int main(int argc, char** argv)
{
    MPI_Init(&argc, &argv);

    int rank, size;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    if (size != TOTAL_BRANCHES) {
        if (rank == 0) printf("Please run with -n 4 processes!\n");
        MPI_Finalize();
        return 0;
    }

    // 1. Broadcast: Head Office announces the day's special recipe code
    int secret_recipe_code = 0;
    if (rank == 0) {
        secret_recipe_code = 9988;
        printf("📢 [BCAST] HQ (Rank 0): Broadcasting Secret Recipe Code %d to all branches...\n", secret_recipe_code);
    }

    MPI_Bcast(&secret_recipe_code, 1, MPI_INT, 0, MPI_COMM_WORLD);
    printf("👨🍳 Branch %d received recipe code: %d\n", rank, secret_recipe_code);

    // 2. Scatter: HQ distributes raw dough packages (kg) to each branch
    int all_dough[4] = {100, 150, 80, 120}; // Only initialized at Root
    int my_dough = 0;                       // Local slice for each branch

    MPI_Scatter(all_dough, 1, MPI_INT, &my_dough, 1, MPI_INT, 0, MPI_COMM_WORLD);
    printf("🥖 Branch %d received %d kg dough to bake.\n", rank, my_dough);

    // 3. Local Computation: Each branch sells baked items (Sales = dough * 50)
    int local_sales = my_dough * 50;

    // 4. Reduce: HQ calculates total franchise revenue and maximum branch sales
    int total_franchise_sales = 0;
    int max_single_branch_sales = 0;

    MPI_Reduce(&local_sales, &total_franchise_sales, 1, MPI_INT, MPI_SUM, 0, MPI_COMM_WORLD);
    MPI_Reduce(&local_sales, &max_single_branch_sales, 1, MPI_INT, MPI_MAX, 0, MPI_COMM_WORLD);

    if (rank == 0) {
        printf("\n========================================\n");
        printf("💰 HQ FINANCIAL SUMMARY (MPI_Reduce):\n");
        printf("   Total Nationwide Sales: Rs. %d\n", total_franchise_sales);
        printf("   Top Branch Sales Record: Rs. %d\n", max_single_branch_sales);
        printf("========================================\n");
    }

    MPI_Finalize();
    return 0;
}
```

---

## 9. SESSION 5 — NUMERICAL INTEGRATION, MPI I/O & TIMING

### Duration: 13:45 – 14:45 (60 mins)

### 1. The Trapezoidal Rule Problem
We wish to compute the definite integral (area under curve $f(x)$):
$$\int_{a}^{b} f(x) \, dx \approx \sum_{i=1}^{n} \frac{f(x_{i-1}) + f(x_i)}{2} \cdot h$$
where $h = \frac{b - a}{n}$.

```
  y ^               /---\
    |              /     \
    |    /--------/       \--------\
    |   | Trap 1 | Trap 2 | Trap 3 | Trap 4 |
    +---+--------+--------+--------+--------+---> x
        a        x1       x2       x3       b
     [Process 0] [Process 1] [Process 2] [Process 3]
```

**Parallel Strategy:**
1. Divide the interval $[a, b]$ into $P$ sub-intervals (one per process).
2. Process $i$ computes its local trapezoidal area.
3. Call `MPI_Reduce(..., MPI_SUM, 0)` to combine local areas into the total integral!

---

### 2. Code Example: `04_mpi_trapezoidal.c`

```c
#include <mpi.h>
#include <stdio.h>
#include <math.h>

// Mathematical function to integrate: f(x) = 4.0 / (1.0 + x^2) -> Integral from 0 to 1 equals PI!
double f(double x) {
    return 4.0 / (1.0 + x * x);
}

// Local Trapezoidal computation
double Trap(double left_endpt, double right_endpt, int trap_count, double base_len) {
    double estimate = (f(left_endpt) + f(right_endpt)) / 2.0;
    for (int i = 1; i < trap_count; i++) {
        double x = left_endpt + i * base_len;
        estimate += f(x);
    }
    return estimate * base_len;
}

int main(int argc, char** argv) {
    MPI_Init(&argc, &argv);

    int rank, size;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    double a = 0.0, b = 1.0;
    int n = 100000000; // 100 Million trapezoids

    // Synchronization barrier before starting timer
    MPI_Barrier(MPI_COMM_WORLD);
    double start_time = MPI_Wtime();

    double h = (b - a) / n;
    int local_n = n / size; // Number of trapezoids per process

    double local_a = a + rank * local_n * h;
    double local_b = local_a + local_n * h;
    double local_integral = Trap(local_a, local_b, local_n, h);

    // Sum all local integrals into total_integral at Root (Rank 0)
    double total_integral = 0.0;
    MPI_Reduce(&local_integral, &total_integral, 1, MPI_DOUBLE, MPI_SUM, 0, MPI_COMM_WORLD);

    double end_time = MPI_Wtime();

    if (rank == 0) {
        printf("🎯 Calculated PI Value: %.12f\n", total_integral);
        printf("🎯 True PI Value:       %.12f\n", 3.141592653589);
        printf("🎯 Absolute Error:      %.12e\n", fabs(total_integral - 3.141592653589));
        printf("⏱️ Total Execution Time: %f seconds across %d MPI processes.\n", end_time - start_time, size);
    }

    MPI_Finalize();
    return 0;
}
```

---

### 3. MPI I/O & Bottlenecks
> *"Imagine 100 chefs all trying to write to the same single physical ledger book at the exact same moment. They bump shoulders and queue up. That is the **Parallel I/O Bottleneck**."*

- **Standard I/O (`printf`/`fopen`):** Every process contends for standard output or single disk file. Output becomes scrambled.
- **Best Practice for Beginners:** Process 0 handles all console and disk file output after collecting results with `MPI_Gather` or `MPI_Reduce`.
- **Advanced Solution:** MPI-IO (`MPI_File_open`, `MPI_File_write_all`) provides collective file pointers.

---

## 10. SESSION 6 — PARALLEL SORTING & DISTRIBUTED PERFORMANCE

### Duration: 14:45 – 15:30 (45 mins)

### 1. The Distributed Order Sorting Concept
- **Problem:** 1,000 customer orders arrive with random priority ticket numbers ($1 \dots 9999$).
- **Parallel Pipeline:**
  1. `MPI_Scatter`: Send 250 orders to each of 4 branches.
  2. **Local Sort:** Each branch sorts its 250 orders independently using local sorting (e.g. bubble sort or quicksort).
  3. `MPI_Gather`: Gather the 4 sorted sub-lists back at Rank 0.
  4. **Merge:** Rank 0 merges the 4 pre-sorted lists into one globally sorted ticket ledger.

---

### 2. Measuring Distributed Performance

Recall the fundamental performance equations:
$$\text{Speedup } S_p = \frac{T_1}{T_p}, \qquad \text{Efficiency } E_p = \frac{S_p}{p} \times 100\%$$

#### The Live Workshop Experiment Table (Participants Record Real Timings):

| Process Count ($p$) | Measured Runtime ($T_p$) | Experimental Speedup ($S_p$) | Parallel Efficiency ($E_p$) | Dominant Factor |
| :---: | :---: | :---: | :---: | :--- |
| **1 (Sequential)** | e.g. 8.20 s | 1.00× (Baseline) | 100% | Pure computation |
| **2 Processes** | e.g. 4.30 s | 1.91× | 95.3% | Minimal communication overhead |
| **4 Processes** | e.g. 2.35 s | 3.49× | 87.2% | Good core utilization |
| **8 Processes** | e.g. 1.60 s | 5.12× | 64.0% | Network overhead & merge bottleneck |

> ⚠️ **Trainer Explanation for Sub-Linear Scaling:**  
> *"Why didn't 8 processes give us an 8× speedup? Because of **Network Latency**, the **Merge Step on Rank 0 (Amdahl's serial bottleneck)**, and memory bus contention!"*

---

## 11. SESSION 7 — GPU PROGRAMMING FUNDAMENTALS & CUDA

### Duration: 15:45 – 16:30 (45 mins)

### 1. CPU vs. GPU: The Master Chef vs. The Assembly Line

```
   ┌───────────────────────────────────┐    ┌───────────────────────────────────┐
   │            CPU CORE               │    │            GPU CORE               │
   │  - 4 to 64 Heavyweight Cores      │    │  - 1,000s to 10,000s Light Cores  │
   │  - Complex Branch Prediction & ALU│    │  - SIMT (Single Instruction Multi)│
   │  - Handles complex decision logic │    │  - Massive Data-Parallel Math     │
   │  - Analogy: 4 Michelin Star Chefs │    │  - Analogy: 10,000 Potato Peelers │
   └───────────────────────────────────┘    └───────────────────────────────────┘
```

---

### 2. The GPU Execution Model: Host & Device

1. **Host (CPU):** Manages overall program flow, allocates host memory (`malloc`), allocates GPU memory (`cudaMalloc`).
2. **Transfer to Device:** Copies input data from Host RAM to GPU VRAM (`cudaMemcpyHostToDevice`).
3. **Kernel Launch:** Launches the parallel GPU function (`kernel<<<blocks, threads>>>`).
4. **Transfer to Host:** Copies final computed results from GPU back to CPU (`cudaMemcpyDeviceToHost`).
5. **Free Memory:** Frees GPU memory (`cudaFree`).

---

### 3. CUDA Hierarchy: Grid $\to$ Block $\to$ Thread

```
GRID (The Entire Processing Facility)
 ├── BLOCK 0 (Kitchen Station 0)
 │    ├── Thread 0, Thread 1, Thread 2, ... Thread 255
 └── BLOCK 1 (Kitchen Station 1)
      ├── Thread 0, Thread 1, Thread 2, ... Thread 255
```

Each thread calculates its unique global index:
```c
int i = blockIdx.x * blockDim.x + threadIdx.x;
```

---

### 4. Code Example: `05_cuda_vector_add.cu` (with CPU Fallback)

```cuda
#include <stdio.h>
#include <stdlib.h>

#define N 1000000 // 1 Million elements

// GPU Kernel: Executed by thousands of GPU threads simultaneously
__global__ void VectorAddKernel(const float* A, const float* B, float* C, int n)
{
    // Calculate global thread index across blocks
    int i = blockIdx.x * blockDim.x + threadIdx.x;

    if (i < n) {
        C[i] = A[i] + B[i]; // Every thread computes 1 addition!
    }
}

int main()
{
    size_t size = N * sizeof(float);

    // 1. Allocate Host (CPU) memory
    float* h_A = (float*)malloc(size);
    float* h_B = (float*)malloc(size);
    float* h_C = (float*)malloc(size);

    for (int i = 0; i < N; i++) {
        h_A[i] = 1.0f;
        h_B[i] = 2.0f;
    }

    #ifdef __CUDACC__
    // 2. Allocate Device (GPU) memory
    float *d_A, *d_B, *d_C;
    cudaMalloc((void**)&d_A, size);
    cudaMalloc((void**)&d_B, size);
    cudaMalloc((void**)&d_C, size);

    // 3. Copy inputs from CPU -> GPU
    cudaMemcpy(d_A, h_A, size, cudaMemcpyHostToDevice);
    cudaMemcpy(d_B, h_B, size, cudaMemcpyHostToDevice);

    // 4. Launch Kernel: 256 threads per block
    int threadsPerBlock = 256;
    int blocksPerGrid = (N + threadsPerBlock - 1) / threadsPerBlock;
    printf("🚀 Launching GPU Kernel with %d blocks of %d threads (%d total workers)...\n",
           blocksPerGrid, threadsPerBlock, blocksPerGrid * threadsPerBlock);

    VectorAddKernel<<<blocksPerGrid, threadsPerBlock>>>(d_A, d_B, d_C, N);
    cudaDeviceSynchronize();

    // 5. Copy result from GPU -> CPU
    cudaMemcpy(h_C, d_C, size, cudaMemcpyDeviceToHost);

    // Cleanup GPU
    cudaFree(d_A); cudaFree(d_B); cudaFree(d_C);
    #else
    printf("ℹ️ Running in CPU Emulation Mode (CUDA compiler not detected)...\n");
    for (int i = 0; i < N; i++) h_C[i] = h_A[i] + h_B[i];
    #endif

    // Verification
    printf("✅ Result verification: C[0] = %f, C[N-1] = %f (Expected: 3.000000)\n", h_C[0], h_C[N-1]);

    free(h_A); free(h_B); free(h_C);
    return 0;
}
```

---

## 12. SESSION 8 — HYBRID SYSTEMS & CAPSTONE CHALLENGE

### Duration: 16:30 – 17:00 (30 mins)

### 1. What is Hybrid Computing?
Modern world-class supercomputers (like Frontier, Summit, Aurora) do not pick only one model. They combine **all three**:
- **MPI across Nodes:** Connects thousands of independent servers over high-speed InfiniBand network.
- **OpenMP within Nodes:** Uses shared memory multi-threading across all CPU sockets and cores.
- **GPU Accelerators on Nodes:** Dispatches massive matrix math and deep learning tensors to NVIDIA/AMD GPUs.

```
CLUSTER NODE 0 (Chennai Branch)         CLUSTER NODE 1 (Bangalore Branch)
┌────────────────────────────────┐     ┌────────────────────────────────┐
│ MPI Process 0                  │     │ MPI Process 1                  │
│ ├── OpenMP Thread 0 (Chef 0)   │     │ ├── OpenMP Thread 0 (Chef 0)   │
│ ├── OpenMP Thread 1 (Chef 1)   │     │ ├── OpenMP Thread 1 (Chef 1)   │
│ └── GPU Kernel (1,000 Workers) │     │ └── GPU Kernel (1,000 Workers) │
└───────────────┬────────────────┘     └───────────────┬────────────────┘
                └────────── MPI Network Bus ───────────┘
```

---

### 2. Capstone Challenge: "Distributed Restaurant Sales Analyzer"

#### Scenario:
The restaurant chain has 4 regional branches. Each branch records daily sales for 10 menu categories.
1. **HQ (Rank 0)** generates sales data for all branches and uses `MPI_Scatter` to distribute 10 menu lines to each branch.
2. **Each Branch** locally computes:
   - Its **Total Sales**
   - Its **Best-Selling Dish (Maximum)**
   - Its **Average Item Price**
3. **Collective Reductions:**
   - `MPI_Reduce` with `MPI_SUM` aggregates nationwide revenue.
   - `MPI_Reduce` with `MPI_MAX` finds the single most profitable dish nationwide.
4. **Timing & Speedup:** Record wall-clock execution time with `MPI_Wtime()`.

---

### 3. Code Example: `06_challenge_sales_analyzer.c`

```c
#include <mpi.h>
#include <stdio.h>
#include <stdlib.h>

#define ITEMS_PER_BRANCH 5
#define NUM_BRANCHES 4

int main(int argc, char** argv)
{
    MPI_Init(&argc, &argv);

    int rank, size;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    if (size != NUM_BRANCHES) {
        if (rank == 0) printf("Error: Run with exactly 4 processes (-n 4)!\n");
        MPI_Finalize();
        return 0;
    }

    int all_sales[NUM_BRANCHES * ITEMS_PER_BRANCH];
    int local_sales[ITEMS_PER_BRANCH];

    // Rank 0 populates sample sales data (Rs.)
    if (rank == 0) {
        int sample_data[20] = {
            120, 250, 400, 150, 300, // Branch 0 (Chennai)
            500, 180, 220, 350, 450, // Branch 1 (Bangalore)
            90,  110, 140, 200, 160, // Branch 2 (Hosur)
            310, 420, 280, 190, 550  // Branch 3 (Coimbatore)
        };
        for(int i = 0; i < 20; i++) all_sales[i] = sample_data[i];
        printf("📊 HQ (Chennai): Distributing sales datasets to 4 branches...\n\n");
    }

    double t_start = MPI_Wtime();

    // 1. Scatter data to branches
    MPI_Scatter(all_sales, ITEMS_PER_BRANCH, MPI_INT,
                local_sales, ITEMS_PER_BRANCH, MPI_INT,
                0, MPI_COMM_WORLD);

    // 2. Local Analysis
    int local_total = 0;
    int local_max = local_sales[0];

    for (int i = 0; i < ITEMS_PER_BRANCH; i++) {
        local_total += local_sales[i];
        if (local_sales[i] > local_max) local_max = local_sales[i];
    }
    double local_avg = (double)local_total / ITEMS_PER_BRANCH;

    printf("📍 Branch %d Analysis: Total = Rs. %d | Top Dish = Rs. %d | Avg = Rs. %.1f\n",
           rank, local_total, local_max, local_avg);

    // 3. Global Reductions to HQ
    int global_revenue = 0;
    int global_top_dish = 0;

    MPI_Reduce(&local_total, &global_revenue, 1, MPI_INT, MPI_SUM, 0, MPI_COMM_WORLD);
    MPI_Reduce(&local_max, &global_top_dish, 1, MPI_INT, MPI_MAX, 0, MPI_COMM_WORLD);

    double t_end = MPI_Wtime();

    if (rank == 0) {
        printf("\n===================================================\n");
        printf("🏆 GRAND NATIONWIDE SALES EXECUTIVE SUMMARY\n");
        printf("===================================================\n");
        printf("  💰 Total Corporate Revenue:   Rs. %d\n", global_revenue);
        printf("  🌟 Highest Single Item Price: Rs. %d\n", global_top_dish);
        printf("  ⏱️ Total Parallel Time:       %f ms\n", (t_end - t_start) * 1000.0);
        printf("===================================================\n");
    }

    MPI_Finalize();
    return 0;
}
```

---

## 13. HANDS-ON LAB EXERCISES

### Exercise 1: MPI Ring Communication
- **Objective:** Pass a token integer around a ring of $P$ processes: $0 \to 1 \to 2 \to \dots \to P-1 \to 0$.
- **Story:** A confidential recipe clipboard is signed and passed from Branch 0 to 1, to 2, to 3, and back to 0.
- **Challenge Question:** *What happens if every process calls `MPI_Recv` before `MPI_Send`? How do you prevent deadlock?*

### Exercise 2: Master-Worker Dynamic Task Queue
- **Objective:** Rank 0 acts as a dispatcher sending tasks to idle worker ranks on demand using non-blocking probes (`MPI_Iprobe`).
- **Story:** Head Chef assigns a new catering order whenever a branch reports it has finished cooking.

### Exercise 3: Parallel Matrix-Vector Multiplication ($A \times x = y$)
- **Objective:** Broadcast vector $x$ to all ranks using `MPI_Bcast`, scatter matrix rows using `MPI_Scatter`, compute local dot products, and assemble result vector $y$ with `MPI_Gather`.

### Exercise 4: Monte Carlo Calculation of $\pi$
- **Objective:** Each process generates $N/P$ random coordinate points $(x, y)$ inside a square and counts how many fall inside the circle $x^2 + y^2 \le 1$. Reduce counts with `MPI_Reduce(..., MPI_SUM)`.

---

## 14. COMMON MPI MISTAKES & TROUBLESHOOTING GUIDE

| # | Fatal Mistake | Symptom / Behavior | How to Avoid / Fix |
| :---: | :--- | :--- | :--- |
| **1** | Forgetting `MPI_Init` / `MPI_Finalize` | Program crashes with `SIGSEGV` or leaves zombie processes. | Ensure `MPI_Init` is the first MPI call and `MPI_Finalize` is called before exit. |
| **2** | Send / Receive Datatype Mismatch | Sender sends `MPI_INT`, Receiver expects `MPI_DOUBLE`. Result is corrupted garbage values. | Keep datatypes identical on both sides of the envelope. |
| **3** | Tag or Rank Mismatch | `MPI_Recv` waits for Tag 1, but Sender sent with Tag 0. Program hangs indefinitely. | Double check source rank and message tag. Use `MPI_ANY_TAG` if tag is dynamic. |
| **4** | Classic Point-to-Point Deadlock | Both processes call blocking `MPI_Recv` simultaneously. | Alternate send/recv order (Even ranks send first, Odd ranks receive first) or use `MPI_Sendrecv`. |
| **5** | Mismatched Collective Buffers | Calling `MPI_Bcast` with count 10 on root, but count 5 on receivers. | All collective parameters (count, datatype, root) **must match exactly across all ranks**. |
| **6** | Array Out-of-Bounds in `MPI_Scatter` | Send buffer at root has fewer elements than $\text{sendcount} \times \text{size}$. | Allocate root array of size $\ge \text{sendcount} \times \text{size}$. |
| **7** | Assuming Rank 0 is Always Fastest | Writing code that assumes Rank 0 will execute ahead of Rank 1. | MPI processes run asynchronously; use `MPI_Barrier` if strict ordering is required. |
| **8** | Excessive Synchronization | Placing `MPI_Barrier` inside tight loops, destroying performance. | Remove unnecessary barriers; collective calls already synchronize implicitly! |

---

## 15. MASTER COMPARISON MATRIX: OPENMP VS. MPI VS. GPU

```
┌───────────────────────────┬───────────────────────────┬───────────────────────────┐
│      OpenMP (Day 1)       │        MPI (Day 2)        │        GPU (CUDA)         │
├───────────────────────────┼───────────────────────────┼───────────────────────────┤
│ • Shared Memory Model     │ • Distributed Memory      │ • Massive Data Parallel   │
│ • Threads inside 1 Process│ • Independent Processes   │ • Thousands of GPU Threads│
│ • Implicit data sharing   │ • Explicit Network Msgs   │ • Host <-> Device Copies  │
│ • Easy `#pragma` pragmas  │ • Scalable across cluster │ • Extreme compute TFLOPS  │
│ • Single Motherboard      │ • Supercomputer Scale     │ • Graphics / AI / Tensors │
│ • 1 Kitchen, Many Chefs   │ • 4 City Branch Kitchens  │ • 10,000 Prep Workers     │
└───────────────────────────┴───────────────────────────┴───────────────────────────┘
```

---

## 16. COMPREHENSIVE TRAINER NOTES & DELIVERY BLUEPRINT

### Session 1 & 2 Delivery Tips:
- **Do not start with complex networking slides.** Start by drawing 4 city boxes (Chennai, Bangalore, Hosur, Coimbatore) on the board.
- Emphasize that **each process runs the exact same code** from line 1 (`SPMD: Single Program Multiple Data`), but executes different `if (rank == ...)` branches based on its ID.

### Session 3 & 4 Delivery Tips:
- Walk two students to opposite sides of the classroom. Hand one student a physical sealed envelope labeled *"Data: 42, To: Bangalore, Tag: 0"*. Have them walk over and hand it to the second student. Physical demonstration creates permanent memory!

### Session 7 & 8 Delivery Tips:
- If your workshop lab lacks NVIDIA GPUs, emphasize the **conceptual paradigm of Host vs. Device** and run the provided C emulation mode. The cognitive breakthrough is understanding **Data Parallelism vs. Task Parallelism**.

---

## 17. POST-WORKSHOP COMPETENCIES & PARTICIPANT CHECKLIST

By the end of this 2-Day workshop, participants will be able to:
- [x] Explain the fundamental difference between Shared Memory (OpenMP) and Distributed Memory (MPI).
- [x] Configure and compile multi-process MPI C programs in Windows and VS Code.
- [x] Construct robust point-to-point communication pipelines without deadlocks.
- [x] Implement collective communication patterns (`Bcast`, `Scatter`, `Gather`, `Reduce`, `Barrier`).
- [x] Parallelize numerical algorithms (Trapezoidal Rule) and achieve verified speedups.
- [x] Measure high-resolution wall-clock execution time and calculate parallel efficiency.
- [x] Explain GPU architecture, Host/Device memory transfers, and CUDA kernels.
- [x] Architect modern hybrid HPC applications (MPI + OpenMP + GPU).

---
*End of Day 2 Trainer Handbook — Parallel Computing Workshop Series*
