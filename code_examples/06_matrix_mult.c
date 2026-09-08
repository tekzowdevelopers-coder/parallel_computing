#include <stdio.h>
#include <omp.h>

#define N 3

int main()
{
    int A[N][N] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    int B[N][N] = {
        {9, 8, 7},
        {6, 5, 4},
        {3, 2, 1}
    };

    int C[N][N] = {0};

    // collapse(2) flattens outer 2 loops into one large N*N loop
    #pragma omp parallel for collapse(2)
    for(int i = 0; i < N; i++)
    {
        for(int j = 0; j < N; j++)
        {
            int sum = 0;
            for(int k = 0; k < N; k++)
            {
                sum += A[i][k] * B[k][j];
            }
            C[i][j] = sum;
        }
    }

    printf("Result Matrix C (3x3):\n");
    for(int i = 0; i < N; i++)
    {
        for(int j = 0; j < N; j++)
        {
            printf("%4d ", C[i][j]);
        }
        printf("\n");
    }

    return 0;
}
