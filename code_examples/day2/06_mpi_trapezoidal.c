#include <mpi.h>
#include <stdio.h>
#include <math.h>

double f(double x) { return 4.0 / (1.0 + x * x); }

double Trap(double a, double b, int n, double h) {
    double est = (f(a) + f(b)) / 2.0;
    for(int i = 1; i < n; i++) est += f(a + i * h);
    return est * h;
}

int main(int argc, char** argv)
{
    MPI_Init(&argc, &argv);
    int rank, size;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    double a = 0.0, b = 1.0;
    int n = 50000000;
    double h = (b - a) / n;
    int local_n = n / size;

    double local_a = a + rank * local_n * h;
    double local_b = local_a + local_n * h;
    double local_int = Trap(local_a, local_b, local_n, h);

    double total_int = 0.0;
    MPI_Reduce(&local_int, &total_int, 1, MPI_DOUBLE, MPI_SUM, 0, MPI_COMM_WORLD);

    if (rank == 0) {
        printf("🎯 Computed PI: %.12f\n", total_int);
        printf("🎯 True PI:     %.12f\n", 3.14159265358979);
    }

    MPI_Finalize();
    return 0;
}
