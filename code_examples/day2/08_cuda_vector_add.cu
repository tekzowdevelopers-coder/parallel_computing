#include <stdio.h>
#include <stdlib.h>
#include <math.h>

/**
 * Exercise 8: GPU Programming Fundamentals (CUDA Vector Addition)
 * Analogy: 10,000 specialized line workers each adding 1 single tomato item concurrently.
 * Includes automatic CPU fallback when compiled with standard GCC.
 */

#define N 1000000

#ifdef __CUDACC__
__global__ void VectorAddKernel(const float* A, const float* B, float* C, int n)
{
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i < n) {
        C[i] = A[i] + B[i];
    }
}
#endif

int main()
{
    size_t size = N * sizeof(float);

    float* h_A = (float*)malloc(size);
    float* h_B = (float*)malloc(size);
    float* h_C = (float*)malloc(size);

    for (int i = 0; i < N; i++) {
        h_A[i] = 1.5f;
        h_B[i] = 2.5f;
    }

    #ifdef __CUDACC__
    printf("🚀 GPU DETECTED: Compiling & Executing on NVIDIA CUDA Device...\n");

    float *d_A, *d_B, *d_C;
    cudaMalloc((void**)&d_A, size);
    cudaMalloc((void**)&d_B, size);
    cudaMalloc((void**)&d_C, size);

    cudaMemcpy(d_A, h_A, size, cudaMemcpyHostToDevice);
    cudaMemcpy(d_B, h_B, size, cudaMemcpyHostToDevice);

    int threadsPerBlock = 256;
    int blocksPerGrid = (N + threadsPerBlock - 1) / threadsPerBlock;

    printf("   Grid: %d Blocks, Block: %d Threads -> Total GPU Workers: %d\n",
           blocksPerGrid, threadsPerBlock, blocksPerGrid * threadsPerBlock);

    VectorAddKernel<<<blocksPerGrid, threadsPerBlock>>>(d_A, d_B, d_C, N);
    cudaDeviceSynchronize();

    cudaMemcpy(h_C, d_C, size, cudaMemcpyDeviceToHost);

    cudaFree(d_A);
    cudaFree(d_B);
    cudaFree(d_C);
    #else
    printf("ℹ️ CPU EMULATION MODE: Running simulated vector addition across %d elements...\n", N);
    for (int i = 0; i < N; i++) {
        h_C[i] = h_A[i] + h_B[i];
    }
    #endif

    printf("✅ Verification: C[0] = %.2f, C[%d] = %.2f (Expected 4.00)\n", h_C[0], N-1, h_C[N-1]);

    free(h_A);
    free(h_B);
    free(h_C);
    return 0;
}
