#include <mpi.h>
#include <stdio.h>
#include <math.h>

/**
 * Exercise 6: Numerical Integration via MPI Trapezoidal Rule
 * Target: Calculate Area under f(x) = 4 / (1 + x^2) from 0 to 1 -> Exactly equals PI (3.141592653589...)
 */

double f(double x) {
    return 4.0 / (1.0 + x * x);
}

double Trap(double left_endpt, double right_endpt, int trap_count, double base_len) {
    double estimate = (f(left_endpt) + f(right_endpt)) / 2.0;
    for (int i = 1; i < trap_count; i++) {
        double x = left_endpt + i * base_len;
        estimate += f(x);
    }
    return estimate * base_len;
}

int main(int argc, char** argv)
{
    MPI_Init(&argc, &argv);

    int rank, size;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    double a = 0.0, b = 1.0;
    int n = 50000000; // 50 Million intervals

    MPI_Barrier(MPI_COMM_WORLD);
    double start_time = MPI_Wtime();

    double h = (b - a) / n;
    int local_n = n / size;

    double local_a = a + rank * local_n * h;
    double local_b = local_a + local_n * h;
    double local_integral = Trap(local_a, local_b, local_n, h);

    double total_integral = 0.0;
    MPI_Reduce(&local_integral, &total_integral, 1, MPI_DOUBLE, MPI_SUM, 0, MPI_COMM_WORLD);

    double end_time = MPI_Wtime();

    if (rank == 0) {
        printf("=======================================================\n");
        printf("🎯 MPI PARALLEL NUMERICAL INTEGRATION (PI BENCHMARK)\n");
        printf("=======================================================\n");
        printf("  Computed PI:     %.14f\n", total_integral);
        printf("  Reference PI:    %.14f\n", 3.14159265358979);
        printf("  Absolute Error:  %.14e\n", fabs(total_integral - 3.14159265358979));
        printf("  MPI Processes:   %d\n", size);
        printf("  Total Wall Time: %f seconds\n", end_time - start_time);
        printf("=======================================================\n");
    }

    MPI_Finalize();
    return 0;
}
