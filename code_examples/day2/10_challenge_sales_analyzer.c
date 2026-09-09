#include <mpi.h>
#include <stdio.h>
#include <stdlib.h>

/**
 * Exercise 10: Final Hands-on Capstone Challenge
 * Title: "Distributed Restaurant Sales Analyzer"
 * Scenario: 4 branches evaluate 5 menu items each. HQ scatters dataset, branches compute local stats,
 * and global financial audit is reduced back to HQ with timing benchmarks.
 */

#define ITEMS_PER_BRANCH 5
#define NUM_BRANCHES 4

int main(int argc, char** argv)
{
    MPI_Init(&argc, &argv);

    int rank, size;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    if (size != NUM_BRANCHES) {
        if (rank == 0) printf("⚠️ Please run this capstone with exactly 4 processes: mpiexec -n 4 ...\n");
        MPI_Finalize();
        return 0;
    }

    int all_sales[NUM_BRANCHES * ITEMS_PER_BRANCH];
    int local_sales[ITEMS_PER_BRANCH];

    // Branch Names
    const char* branch_names[4] = {"Chennai (HQ)", "Bangalore", "Hosur", "Coimbatore"};

    if (rank == 0) {
        int seed_data[20] = {
            150, 280, 420, 190, 310, // Chennai
            520, 190, 240, 380, 490, // Bangalore
            95,  120, 150, 210, 180, // Hosur
            330, 450, 290, 200, 580  // Coimbatore
        };
        for (int i = 0; i < 20; i++) all_sales[i] = seed_data[i];

        printf("📊 [HQ Financial Office]: Dispersing multi-branch daily sales ledgers...\n\n");
    }

    MPI_Barrier(MPI_COMM_WORLD);
    double t_start = MPI_Wtime();

    // 1. Scatter slices of data to all branches
    MPI_Scatter(all_sales, ITEMS_PER_BRANCH, MPI_INT,
                local_sales, ITEMS_PER_BRANCH, MPI_INT,
                0, MPI_COMM_WORLD);

    // 2. Local branch analytics
    int local_total = 0;
    int local_max = local_sales[0];
    int local_min = local_sales[0];

    for (int i = 0; i < ITEMS_PER_BRANCH; i++) {
        local_total += local_sales[i];
        if (local_sales[i] > local_max) local_max = local_sales[i];
        if (local_sales[i] < local_min) local_min = local_sales[i];
    }
    double local_avg = (double)local_total / ITEMS_PER_BRANCH;

    printf("📍 [Branch %d - %s]: Total = Rs. %d | Best Dish = Rs. %d | Avg = Rs. %.1f\n",
           rank, branch_names[rank], local_total, local_max, local_avg);

    // 3. Collective Reductions
    int global_revenue = 0;
    int global_max_dish = 0;
    int global_min_dish = 0;

    MPI_Reduce(&local_total, &global_revenue, 1, MPI_INT, MPI_SUM, 0, MPI_COMM_WORLD);
    MPI_Reduce(&local_max, &global_max_dish, 1, MPI_INT, MPI_MAX, 0, MPI_COMM_WORLD);
    MPI_Reduce(&local_min, &global_min_dish, 1, MPI_INT, MPI_MIN, 0, MPI_COMM_WORLD);

    double t_end = MPI_Wtime();

    if (rank == 0) {
        printf("\n=======================================================\n");
        printf("🏆 GRAND NATIONWIDE SALES EXECUTIVE AUDIT (DAY 2 CAPSTONE)\n");
        printf("=======================================================\n");
        printf("  💰 Gross Corporate Revenue:     Rs. %d\n", global_revenue);
        printf("  🌟 Top Single Menu Item Price:  Rs. %d\n", global_max_dish);
        printf("  📉 Lowest Menu Item Price:      Rs. %d\n", global_min_dish);
        printf("  📈 Chain Average Item Price:    Rs. %.2f\n", (double)global_revenue / (NUM_BRANCHES * ITEMS_PER_BRANCH));
        printf("  ⏱️ Total Parallel Audit Time:   %f microseconds\n", (t_end - t_start) * 1e6);
        printf("=======================================================\n");
    }

    MPI_Finalize();
    return 0;
}
