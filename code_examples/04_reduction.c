#include <stdio.h>
#include <omp.h>

int main()
{
    int sum = 0;

    // Fast lock-free accumulation using tree reduction
    #pragma omp parallel for reduction(+:sum)
    for(int i = 1; i <= 1000; i++)
    {
        sum += i;
    }

    printf("OpenMP Reduction Sum = %d (Expected: 500500)\n", sum);
    return 0;
}
