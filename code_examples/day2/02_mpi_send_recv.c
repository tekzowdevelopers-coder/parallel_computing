#include <mpi.h>
#include <stdio.h>

/**
 * Exercise 2: Point-to-Point Communication (MPI_Send & MPI_Recv)
 * Analogy: Branch 0 (Chennai) runs low on tomatoes and dispatches 42 kg to Branch 1 (Bangalore).
 */

int main(int argc, char** argv)
{
    MPI_Init(&argc, &argv);

    int rank, size;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    if (size < 2) {
        if (rank == 0) printf("Error: This exercise requires at least 2 processes (run with: mpiexec -n 2 ...)\n");
        MPI_Finalize();
        return 0;
    }

    int tomato_kg;

    if (rank == 0)
    {
        tomato_kg = 42;
        printf("📦 [Rank 0 - Chennai]: Dispatching courier with %d kg tomatoes to Branch 1...\n", tomato_kg);

        // Send: buffer, count, datatype, dest, tag, comm
        MPI_Send(&tomato_kg, 1, MPI_INT, 1, 0, MPI_COMM_WORLD);
        printf("🚚 [Rank 0 - Chennai]: Courier dispatched successfully!\n");
    }
    else if (rank == 1)
    {
        printf("⏳ [Rank 1 - Bangalore]: Waiting at the loading dock for ingredients...\n");

        // Recv: buffer, count, datatype, source, tag, comm, status
        MPI_Recv(&tomato_kg, 1, MPI_INT, 0, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
        printf("🍅 [Rank 1 - Bangalore]: Package received! Received %d kg tomatoes. Ready to make gravy!\n", tomato_kg);
    }
    else
    {
        printf("👨🍳 [Rank %d]: Regular branch cooking duties.\n", rank);
    }

    MPI_Finalize();
    return 0;
}
