#include <mpi.h>
#include <omp.h>
#include <stdio.h>

int main(int argc, char** argv)
{
    int provided;
    MPI_Init_thread(&argc, &argv, MPI_THREAD_FUNNELED, &provided);

    int rank, size;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    printf("🏢 Branch (MPI Process) %d of %d active.\n", rank, size);

    #pragma omp parallel
    {
        printf("   👨🍳 [Branch %d -> Thread %d] Cooking local course!\n",
               rank, omp_get_thread_num());
    }

    MPI_Finalize();
    return 0;
}
