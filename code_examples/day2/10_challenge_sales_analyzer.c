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
        if (rank == 0) printf("⚠️ Please run with -n 4 processes!\n");
        MPI_Finalize();
        return 0;
    }

    int all_sales[20];
    int local_sales[ITEMS_PER_BRANCH];

    if (rank == 0) {
        int sample_data[20] = {
            150, 280, 420, 190, 310,
            520, 190, 240, 380, 490,
            95,  120, 150, 210, 180,
            330, 450, 290, 200, 580
        };
        for (int i = 0; i < 20; i++) all_sales[i] = sample_data[i];
        printf("📊 [HQ]: Dispersing sales records to 4 branches...\n\n");
    }

    MPI_Scatter(all_sales, ITEMS_PER_BRANCH, MPI_INT, local_sales, ITEMS_PER_BRANCH, MPI_INT, 0, MPI_COMM_WORLD);

    int local_total = 0;
    int local_max = local_sales[0];

    for (int i = 0; i < ITEMS_PER_BRANCH; i++) {
        local_total += local_sales[i];
        if (local_sales[i] > local_max) local_max = local_sales[i];
    }

    printf("📍 [Branch %d]: Local Sales Total = Rs. %d | Best Dish = Rs. %d\n", rank, local_total, local_max);

    int global_revenue = 0;
    int global_max_dish = 0;

    MPI_Reduce(&local_total, &global_revenue, 1, MPI_INT, MPI_SUM, 0, MPI_COMM_WORLD);
    MPI_Reduce(&local_max, &global_max_dish, 1, MPI_INT, MPI_MAX, 0, MPI_COMM_WORLD);

    if (rank == 0) {
        printf("\n=======================================================\n");
        printf("🏆 GRAND NATIONWIDE SALES EXECUTIVE SUMMARY (CAPSTONE)\n");
        printf("=======================================================\n");
        printf("  💰 Gross Corporate Revenue:    Rs. %d\n", global_revenue);
        printf("  🌟 Top Single Menu Item Price: Rs. %d\n", global_max_dish);
        printf("=======================================================\n");
    }

    MPI_Finalize();
    return 0;
}
