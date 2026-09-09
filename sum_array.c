#include <stdio.h>
#include <omp.h>

int main() {
    int i;
    int sum = 0;
    int A[100];

    for (i = 0; i < 100; i++) A[i] = i + 1;

    #pragma omp parallel for reduction(+:sum)
    for (i = 0; i < 100; i++) {
        sum += A[i];
    }

    printf("Sum = %d\n", sum);
    return 0;
}
