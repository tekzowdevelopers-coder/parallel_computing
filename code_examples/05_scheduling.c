#include <stdio.h>
#include <omp.h>

int main()
{
    printf("=== STATIC SCHEDULING (chunk size = 2) ===\n");
    #pragma omp parallel for schedule(static, 2)
    for(int i = 0; i < 8; i++)
    {
        printf("Thread %d handles iteration %d\n", omp_get_thread_num(), i);
    }

    printf("\n=== DYNAMIC SCHEDULING (chunk size = 1) ===\n");
    #pragma omp parallel for schedule(dynamic, 1)
    for(int i = 0; i < 8; i++)
    {
        printf("Thread %d handles iteration %d\n", omp_get_thread_num(), i);
    }

    return 0;
}
