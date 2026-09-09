#include <mpi.h>
#include <stdio.h>

/**
 * Exercise 1: First MPI Program
 * Analogy: All branch kitchens report online to franchise headquarters.
 */

int main(int argc, char** argv)
{
    // Initialize MPI environment
    MPI_Init(&argc, &argv);

    int rank, size;

    // Get current process rank and total process count
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    char branch_name[20];
    if (rank == 0) sprintf(branch_name, "Chennai (HQ)");
    else if (rank == 1) sprintf(branch_name, "Bangalore");
    else if (rank == 2) sprintf(branch_name, "Hosur");
    else if (rank == 3) sprintf(branch_name, "Coimbatore");
    else sprintf(branch_name, "Branch #%d", rank);

    printf("👨🍳 [Rank %d/%d] %s Kitchen is ONLINE and ready to cook!\n",
           rank, size, branch_name);

    // Cleanly finalize MPI
    MPI_Finalize();
    return 0;
}
