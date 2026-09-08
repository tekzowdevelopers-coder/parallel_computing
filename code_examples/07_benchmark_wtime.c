#include <stdio.h>
#include <omp.h>

#define SIZE 20000000

int main()
{
    static double arr[SIZE];
    double start_time, end_time, elapsed;
    double t1_time = 0.0;

    printf("Benchmarking array compute over %d elements:\n\n", SIZE);

    for(int threads = 1; threads <= 8; threads *= 2)
    {
        omp_set_num_threads(threads);

        start_time = omp_get_wtime();

        #pragma omp parallel for
        for(int i = 0; i < SIZE; i++)
        {
            arr[i] = i * 0.5 + 3.14159;
        }

        end_time = omp_get_wtime();
        elapsed = end_time - start_time;

        if (threads == 1) {
            t1_time = elapsed;
            printf("Threads: %d | Time: %.4f s | Speedup: 1.00x (Baseline)\n", threads, elapsed);
        } else {
            double speedup = t1_time / elapsed;
            double efficiency = (speedup / threads) * 100.0;
            printf("Threads: %d | Time: %.4f s | Speedup: %.2fx | Efficiency: %.1f%%\n", threads, elapsed, speedup, efficiency);
        }
    }

    return 0;
}
