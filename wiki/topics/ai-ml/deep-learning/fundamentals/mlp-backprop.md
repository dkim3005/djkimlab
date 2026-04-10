---
title: "Multi-Layer Perceptron & Backpropagation"
category: ai-ml/deep-learning/fundamentals
tags: [mlp, backpropagation, neural-network, gradient, deep-learning]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I need a neural network that can learn nonlinear patterns, not just one straight
decision boundary. This is the base pattern behind dense neural nets and the
starting point for understanding CNNs, RNNs, and Transformers.

## History

Backprop: Rumelhart, Hinton, Williams (1986). The key insight: use the chain rule to compute gradients layer by layer, from output back to input. This made deep networks trainable.

## Why It Exists

The "why" chain is:

- A single perceptron can only draw one linear boundary.
- Real patterns are often nonlinear, and XOR is the classic failure case.
- Adding hidden layers lets the model build intermediate features.
- But once many weights interact, we need a systematic way to assign blame.
- Backpropagation solves that credit-assignment problem.

So an MLP exists to represent nonlinear functions, and backprop exists to train
that representation efficiently.

## How It Works

### Visual Intuition

Imagine three stages.

- the input layer receives raw values
- a hidden layer bends or re-expresses the space
- the output layer turns that transformed representation into a prediction

When the prediction is wrong, the error is not useful unless we can trace it
back through all earlier layers. Backprop does exactly that: it sends the error
signal backward, one layer at a time, so every weight gets a gradient.

### Step by Step

1. Run a forward pass through each layer
2. Compute a loss from the final prediction
3. Differentiate that loss with respect to the output layer
4. Propagate gradients backward through each layer using the chain rule
5. Update weights with gradient descent

The key operational idea is simple: each layer reuses the gradient from the
layer after it, instead of recomputing everything from scratch.

## Code

```python
def relu(x):
    return max(0.0, x)


def relu_grad(x):
    return 1.0 if x > 0 else 0.0


# Sketch for one hidden neuron:
# z1 = w1 * x + b1
# a1 = relu(z1)
# z2 = w2 * a1 + b2
# loss = (z2 - y) ** 2
# then apply chain rule backward to get dloss/dw2, dloss/dw1, ...
```

## The Math Inside

Forward pass for layer `l`:

`z^(l) = W^(l) a^(l-1) + b^(l)`

`a^(l) = phi(z^(l))`

- `a^(l-1)`: activations from the previous layer
- `W^(l)`, `b^(l)`: weights and bias for this layer
- `phi`: activation function such as ReLU, sigmoid, or tanh

Loss:

`L = f(y, y_hat)`

Backprop idea:

`dL/dW = dL/da * da/dz * dz/dW`

That single expression is the chain rule in action. In a deep network, you keep
applying it from the output layer backward.

For each layer, the local gradient is combined with the incoming gradient from
the next layer. That is why backprop scales to large networks: gradients are
reused recursively instead of expanded manually.

## Math Prerequisites

- [Chain Rule](../../../math/calculus/chain-rule.md) - the core mechanism of backprop
- [Partial Derivatives](../../../math/calculus/partial-derivatives.md) - one gradient entry per parameter
- [Derivatives & Gradients](../../../math/calculus/derivatives-gradient.md) - local slope and gradient vectors
- [Gradient Descent](../../../math/optimization/gradient-descent.md) - how gradients become parameter updates

## Related

- [Perceptron](perceptron.md) — The single-layer predecessor
- [Chain Rule](../../../math/calculus/chain-rule.md) — The math that makes backprop work
- [Gradient Descent](../../../math/optimization/gradient-descent.md) — The optimization method
- [CNN](../architectures/cnn.md) — Backprop applied to images
- [Transformer](../architectures/transformer.md) — Modern architecture, same training principle
