#include <mpi.h>
#include <stdio.h>

int main(int argc, char** argv)
{
    MPI_Init(&argc, &argv);

    int rank;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    int tomato_kg;

    if (rank == 0) {
        tomato_kg = 42;
        printf("📦 [Branch 0 - Chennai]: Sending %d kg tomatoes to Branch 1...\n", tomato_kg);
        MPI_Send(&tomato_kg, 1, MPI_INT, 1, 0, MPI_COMM_WORLD);
    }
    else if (rank == 1) {
        MPI_Recv(&tomato_kg, 1, MPI_INT, 0, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
        printf("🍅 [Branch 1 - Bangalore]: Received %d kg tomatoes from Branch 0!\n", tomato_kg);
    }

    MPI_Finalize();
    return 0;
}
