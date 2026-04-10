---
title: "k-Means Clustering"
category: ai-ml/unsupervised/clustering
tags: [clustering, k-means, unsupervised, centroid]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I have unlabeled data and I want to group similar points together. k-Means is a
classic first tool for customer segments, embedding grouping, image color
compression, and quick exploratory clustering when I can guess a reasonable
number of clusters `k`.

## History

Stuart Lloyd (1957, published 1982). Originally designed for pulse-code modulation at Bell Labs. One of the most widely used algorithms in all of ML.

## Why It Exists

The "why" chain is:

- Many datasets have no labels at all.
- We still want to know whether points naturally form groups.
- We need a simple notion of a cluster center.
- We can assign each point to the nearest center, then recompute the centers.

k-Means exists because "repeat assign and update" is one of the simplest ways to
turn unlabeled geometry into clusters.

## How It Works

### Visual Intuition

Imagine dots scattered across a plane and a few centroids dropped in random
places.

- each point chooses the nearest centroid
- each centroid moves to the average of the points assigned to it
- the colored regions shift
- after several rounds, the centroids stabilize

The timeline node is already wired here:

-> [MLViz Node: k-Means](/projects/mlviz/k-means)

### Step by Step

1. Choose the number of clusters `k`
2. Initialize `k` centroids
3. Assign each point to the nearest centroid
4. Update each centroid to the mean of its assigned points
5. Repeat until assignments stop changing much

The algorithm alternates between grouping points and redefining what each group
center means.

## Code

```python
centroids = init_centroids(X, k)

for _ in range(max_iters):
    clusters = assign_to_nearest_centroid(X, centroids)
    centroids = recompute_cluster_means(X, clusters, k)
```

## The Math Inside

Objective:

`J = sum_k sum_{x in C_k} ||x - mu_k||^2`

- `C_k`: points assigned to cluster `k`
- `mu_k`: centroid of cluster `k`
- `||x - mu_k||^2`: squared distance from a point to its centroid

So k-Means minimizes within-cluster spread.

Centroid update:

`mu_k = (1 / |C_k|) * sum_{x in C_k} x`

This is why the algorithm is called k-Means: each centroid is literally the
mean of its assigned points.

The algorithm is not guaranteed to find the global optimum. It can land in a
local optimum depending on initialization, which is why k-means++ and multiple
restarts help.

## Math Prerequisites

- [Vectors & Matrices](../../../math/linear-algebra/vectors-matrices.md) - how points and datasets are represented
- [Dot Product](../../../math/linear-algebra/dot-product.md) - distance and geometric similarity
- [PCA](../dimensionality-reduction/pca.md) - often used before clustering or for visualization

## Related

- [GMM](gmm.md) — Soft/probabilistic version
- [DBSCAN](dbscan.md) — Density-based alternative
- [PCA](../dimensionality-reduction/pca.md) — Often used before k-Means
