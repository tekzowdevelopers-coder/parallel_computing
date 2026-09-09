#include <mpi.h>
#include <omp.h>
#include <stdio.h>

/**
 * Exercise 9: Hybrid Computing (MPI + OpenMP)
 * Analogy: Multiple restaurant branches (MPI Processes), each containing multiple chefs (OpenMP Threads).
 */

int main(int argc, char** argv)
{
    int provided;
    // Request multi-threaded MPI support
    MPI_Init_thread(&argc, &argv, MPI_THREAD_FUNNELED, &provided);

    int rank, size;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    printf("🏢 Branch (MPI Process) %d of %d active.\n", rank, size);

    // Within each branch process, fork OpenMP worker threads
    #pragma omp parallel
    {
        int tid = omp_get_thread_num();
        int nthreads = omp_get_num_threads();

        printf("   👨🍳 [Branch %d -> Worker %d of %d] Cooking local course!\n",
               rank, tid, nthreads);
    }

    MPI_Finalize();
    return 0;
}
