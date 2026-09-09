#include <mpi.h>
#include <stdio.h>

int main(int argc, char** argv)
{
    MPI_Init(&argc, &argv);

    int rank;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    int promo_code = 0;

    if (rank == 0) {
        promo_code = 9021;
        printf("📢 [HQ]: Broadcasting secret promo code %d to all branches...\n", promo_code);
    }

    MPI_Bcast(&promo_code, 1, MPI_INT, 0, MPI_COMM_WORLD);
    printf("🍛 [Branch %d]: Confirmed promo code %d\n", rank, promo_code);

    MPI_Finalize();
    return 0;
}
