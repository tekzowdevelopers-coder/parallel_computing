#include <stdio.h>
#include <omp.h>

int main()
{
    // Set 4 threads explicitly
    omp_set_num_threads(4);

    #pragma omp parallel
    {
        int id = omp_get_thread_num();
        int total = omp_get_num_threads();
        printf("👨🍳 Chef %d reporting for duty! (Total Chefs = %d)\n", id, total);
    }

    return 0;
}
