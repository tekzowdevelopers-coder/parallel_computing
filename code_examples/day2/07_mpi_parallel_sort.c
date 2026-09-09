#include <mpi.h>
#include <stdio.h>
#include <stdlib.h>

void bubble_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main(int argc, char** argv)
{
    MPI_Init(&argc, &argv);
    int rank, size;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    int total_n = 16;
    int local_n = total_n / size;
    int master_arr[16] = {84, 12, 45, 99, 23, 67, 34, 11, 90, 5, 52, 78, 19, 61, 88, 3};
    int local_arr[4];
    int gathered[16];

    MPI_Scatter(master_arr, local_n, MPI_INT, local_arr, local_n, MPI_INT, 0, MPI_COMM_WORLD);
    bubble_sort(local_arr, local_n);
    MPI_Gather(local_arr, local_n, MPI_INT, gathered, local_n, MPI_INT, 0, MPI_COMM_WORLD);

    if (rank == 0) {
        bubble_sort(gathered, total_n);
        printf("✅ Globally Sorted Array: ");
        for (int i = 0; i < total_n; i++) printf("%d ", gathered[i]);
        printf("\n");
    }

    MPI_Finalize();
    return 0;
}
