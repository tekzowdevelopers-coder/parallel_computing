#include <mpi.h>
#include <stdio.h>

/**
 * Exercise 3: MPI_Bcast (Broadcast)
 * Analogy: Corporate Headquarters announces today's special menu discount code to all branches.
 */

int main(int argc, char** argv)
{
    MPI_Init(&argc, &argv);

    int rank, size;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    int daily_special_code = 0;

    if (rank == 0) {
        daily_special_code = 9021; // Special Dum Biryani Promo Code
        printf("📢 [HQ - Rank 0]: Broadcasting Promo Code %d to all %d branches...\n\n",
               daily_special_code, size);
    }

    // Root (Rank 0) distributes data; all other ranks receive into their local variable
    MPI_Bcast(&daily_special_code, 1, MPI_INT, 0, MPI_COMM_WORLD);

    printf("🍛 [Branch %d]: Confirmed! Received promo code %d. Updating POS billing system.\n",
           rank, daily_special_code);

    MPI_Finalize();
    return 0;
}
