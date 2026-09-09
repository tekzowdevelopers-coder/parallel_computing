#include <stdio.h>
#include <omp.h>

int main() {
    int A[1000];
    for (int i = 0; i < 1000; i++) A[i] = i;

    int max_val = A[0];

    #pragma omp parallel for reduction(max:max_val)
    for (int i = 0; i < 1000; i++) {
        if (A[i] > max_val) max_val = A[i];
    }

    printf("Maximum value = %d\n", max_val);
    return 0;
}
