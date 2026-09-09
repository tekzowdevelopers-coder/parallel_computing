#include <mpi.h>
#include <stdio.h>

int main(int argc, char** argv)
{
    MPI_Init(&argc, &argv);
    int rank, size;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    int master_dough[4] = {10, 20, 30, 40};
    int my_dough = 0;
    int my_bread = 0;
    int all_breads[4];

    MPI_Scatter(master_dough, 1, MPI_INT, &my_dough, 1, MPI_INT, 0, MPI_COMM_WORLD);
    my_bread = my_dough * 2;
    MPI_Gather(&my_bread, 1, MPI_INT, all_breads, 1, MPI_INT, 0, MPI_COMM_WORLD);

    if (rank == 0) {
        printf("🧺 [HQ]: Gathered baked bread output: [%d, %d, %d, %d]\n",
               all_breads[0], all_breads[1], all_breads[2], all_breads[3]);
    }

    MPI_Finalize();
    return 0;
}
