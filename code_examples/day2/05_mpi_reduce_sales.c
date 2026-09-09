#include <mpi.h>
#include <stdio.h>

/**
 * Exercise 5: MPI_Reduce
 * Analogy: Each branch computes its daily sales. HQ uses MPI_Reduce to calculate total franchise sales and max branch record.
 */

int main(int argc, char** argv)
{
    MPI_Init(&argc, &argv);

    int rank, size;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    // Each branch has different daily earnings (Rs.)
    int my_branch_sales = (rank + 1) * 35000 + (rank % 2 == 0 ? 12000 : 5000);

    printf("📍 [Branch %d]: Daily revenue generated = Rs. %d\n", rank, my_branch_sales);

    int total_franchise_sales = 0;
    int max_branch_sales = 0;
    int min_branch_sales = 0;

    // 1. Calculate Sum
    MPI_Reduce(&my_branch_sales, &total_franchise_sales, 1, MPI_INT, MPI_SUM, 0, MPI_COMM_WORLD);

    // 2. Calculate Max
    MPI_Reduce(&my_branch_sales, &max_branch_sales, 1, MPI_INT, MPI_MAX, 0, MPI_COMM_WORLD);

    // 3. Calculate Min
    MPI_Reduce(&my_branch_sales, &min_branch_sales, 1, MPI_INT, MPI_MIN, 0, MPI_COMM_WORLD);

    if (rank == 0) {
        printf("\n==============================================\n");
        printf("💰 CORPORATE REVENUE AUDIT (MPI_Reduce):\n");
        printf("   Total Franchise Revenue: Rs. %d\n", total_franchise_sales);
        printf("   Top Performing Branch:   Rs. %d\n", max_branch_sales);
        printf("   Lowest Branch Revenue:   Rs. %d\n", min_branch_sales);
        printf("   Average Branch Revenue:  Rs. %.2f\n", (double)total_franchise_sales / size);
        printf("==============================================\n");
    }

    MPI_Finalize();
    return 0;
}
