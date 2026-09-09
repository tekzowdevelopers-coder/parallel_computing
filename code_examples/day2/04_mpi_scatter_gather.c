#include <mpi.h>
#include <stdio.h>
#include <stdlib.h>

/**
 * Exercise 4: MPI_Scatter & MPI_Gather
 * Analogy: HQ scatters raw dough to branches. Branches bake and HQ gathers the finished breads.
 */

#define BREADS_PER_BRANCH 2

int main(int argc, char** argv)
{
    MPI_Init(&argc, &argv);

    int rank, size;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    int* master_dough_batches = NULL;
    int local_dough[BREADS_PER_BRANCH];
    int local_baked_output[BREADS_PER_BRANCH];
    int* gathered_products = NULL;

    if (rank == 0) {
        master_dough_batches = (int*)malloc(size * BREADS_PER_BRANCH * sizeof(int));
        gathered_products = (int*)malloc(size * BREADS_PER_BRANCH * sizeof(int));

        printf("🥖 [HQ]: Preparing %d dough portions for %d branches...\n",
               size * BREADS_PER_BRANCH, size);

        for (int i = 0; i < size * BREADS_PER_BRANCH; i++) {
            master_dough_batches[i] = (i + 1) * 10; // 10kg, 20kg, 30kg...
        }
    }

    // 1. Scatter slices of the master dough array to each branch
    MPI_Scatter(master_dough_batches, BREADS_PER_BRANCH, MPI_INT,
                local_dough, BREADS_PER_BRANCH, MPI_INT,
                0, MPI_COMM_WORLD);

    // 2. Each branch bakes the dough (value doubled after baking)
    for (int i = 0; i < BREADS_PER_BRANCH; i++) {
        local_baked_output[i] = local_dough[i] * 2;
    }
    printf("🔥 [Branch %d]: Baked [%d, %d] units of artisanal bread.\n",
           rank, local_baked_output[0], local_baked_output[1]);

    // 3. Gather baked results back to HQ
    MPI_Gather(local_baked_output, BREADS_PER_BRANCH, MPI_INT,
               gathered_products, BREADS_PER_BRANCH, MPI_INT,
               0, MPI_COMM_WORLD);

    if (rank == 0) {
        printf("\n🧺 [HQ]: All branches reported in! Total inventory assembled:\n   [ ");
        for (int i = 0; i < size * BREADS_PER_BRANCH; i++) {
            printf("%d ", gathered_products[i]);
        }
        printf("] bread units ready for sale.\n");

        free(master_dough_batches);
        free(gathered_products);
    }

    MPI_Finalize();
    return 0;
}
