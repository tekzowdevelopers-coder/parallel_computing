#include <mpi.h>
#include <stdio.h>
#include <stdlib.h>

/**
 * Exercise 7: Parallel Distributed Order Priority Sorting
 * Analogy: 1000 orders arrive with priority numbers. Each branch sorts its slice; HQ merges results.
 */

// Simple bubble sort for local slice
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

    int total_elements = 16;
    int local_n = total_elements / size;

    int* full_array = NULL;
    int* local_array = (int*)malloc(local_n * sizeof(int));
    int* gathered_array = NULL;

    if (rank == 0) {
        full_array = (int*)malloc(total_elements * sizeof(int));
        gathered_array = (int*)malloc(total_elements * sizeof(int));

        int sample[16] = {84, 12, 45, 99, 23, 67, 34, 11, 90, 5, 52, 78, 19, 61, 88, 3};
        for (int i = 0; i < 16; i++) full_array[i] = sample[i];

        printf("📋 [HQ]: Unsorted Order Tickets (16 items):\n   [ ");
        for (int i = 0; i < total_elements; i++) printf("%d ", full_array[i]);
        printf("]\n\n");
    }

    // 1. Scatter slices
    MPI_Scatter(full_array, local_n, MPI_INT, local_array, local_n, MPI_INT, 0, MPI_COMM_WORLD);

    // 2. Local branch sort
    bubble_sort(local_array, local_n);

    printf("📍 [Branch %d]: Sorted local chunk -> [ ", rank);
    for (int i = 0; i < local_n; i++) printf("%d ", local_array[i]);
    printf("]\n");

    // 3. Gather sorted chunks
    MPI_Gather(local_array, local_n, MPI_INT, gathered_array, local_n, MPI_INT, 0, MPI_COMM_WORLD);

    if (rank == 0) {
        printf("\n🧺 [HQ]: Gathered pre-sorted segments. Performing final multi-way merge...\n");
        bubble_sort(gathered_array, total_elements);

        printf("✅ [HQ]: Globally Sorted Tickets:\n   [ ");
        for (int i = 0; i < total_elements; i++) printf("%d ", gathered_array[i]);
        printf("]\n");

        free(full_array);
        free(gathered_array);
    }

    free(local_array);
    MPI_Finalize();
    return 0;
}
