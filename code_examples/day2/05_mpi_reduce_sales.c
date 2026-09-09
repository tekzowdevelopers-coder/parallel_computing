#include <mpi.h>
#include <stdio.h>

int main(int argc, char** argv)
{
    MPI_Init(&argc, &argv);
    int rank;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);

    int my_sales = (rank + 1) * 25000;
    int total_sales = 0;
    int max_sales = 0;

    MPI_Reduce(&my_sales, &total_sales, 1, MPI_INT, MPI_SUM, 0, MPI_COMM_WORLD);
    MPI_Reduce(&my_sales, &max_sales, 1, MPI_INT, MPI_MAX, 0, MPI_COMM_WORLD);

    if (rank == 0) {
        printf("💰 Total Franchise Sales: Rs. %d\n", total_sales);
        printf("🌟 Top Branch Sales:     Rs. %d\n", max_sales);
    }

    MPI_Finalize();
    return 0;
}
