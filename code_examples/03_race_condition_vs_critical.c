#include <stdio.h>
#include <omp.h>

int main()
{
    int sum_buggy = 0;

    // 1. Buggy version: Unsynchronized Race Condition
    #pragma omp parallel for
    for(int i = 1; i <= 1000; i++)
    {
        sum_buggy += i;
    }
    printf("1. Buggy Sum (Data Race)     = %d (Expected: 500500)\n", sum_buggy);

    // 2. Safe version using critical directive
    int sum_safe = 0;
    #pragma omp parallel for
    for(int i = 1; i <= 1000; i++)
    {
        #pragma omp critical
        {
            sum_safe += i;
        }
    }
    printf("2. Safe Sum (Critical Section) = %d (Expected: 500500)\n", sum_safe);

    return 0;
}
