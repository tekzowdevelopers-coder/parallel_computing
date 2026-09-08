#include <stdio.h>
#include <omp.h>

#define N 10

int main()
{
    int A[N];

    #pragma omp parallel for
    for(int i = 0; i < N; i++)
    {
        int tid = omp_get_thread_num();
        A[i] = i * i;
        printf("Thread %d processed index %d -> %d\n", tid, i, A[i]);
    }

    printf("\nFinal Array Result:\n");
    for(int i = 0; i < N; i++) {
        printf("%d ", A[i]);
    }
    printf("\n");

    return 0;
}
