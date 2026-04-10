export type MlvizCategory = "statistics" | "ml" | "dl" | "llm";

export interface MlvizResourceLink {
  label: string;
  href: string;
  description: string;
}

export interface MlvizNode {
  year: number;
  title: string;
  subtitle: string;
  description: string;
  bridge: string;
  modelSlug: string;
  category: MlvizCategory;
  wikiHref: string;
  demoStatus: "live" | "planned";
  resourceLinks?: MlvizResourceLink[];
}

export const MLVIZ_CATEGORY_META: Record<
  MlvizCategory,
  {
    label: string;
    badgeClass: string;
    dotClass: string;
  }
> = {
  statistics: {
    label: "Statistics",
    badgeClass:
      "border-zinc-400/30 bg-zinc-300/10 text-zinc-200",
    dotClass: "border-zinc-200 bg-zinc-300 shadow-[0_0_0_6px_rgba(212,212,216,0.12)]",
  },
  ml: {
    label: "Classical ML",
    badgeClass:
      "border-sky-400/30 bg-sky-400/10 text-sky-200",
    dotClass: "border-sky-200 bg-sky-400 shadow-[0_0_0_6px_rgba(56,189,248,0.12)]",
  },
  dl: {
    label: "Deep Learning",
    badgeClass:
      "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-200",
    dotClass:
      "border-fuchsia-200 bg-fuchsia-400 shadow-[0_0_0_6px_rgba(232,121,249,0.12)]",
  },
  llm: {
    label: "LLM Era",
    badgeClass:
      "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
    dotClass:
      "border-emerald-200 bg-emerald-400 shadow-[0_0_0_6px_rgba(52,211,153,0.12)]",
  },
};

export const MLVIZ_TIMELINE: MlvizNode[] = [
  {
    year: 1805,
    title: "Least Squares",
    subtitle: "Linear Regression",
    description:
      "Turn a cloud of noisy points into a predictive line by minimizing squared error.",
    bridge:
      "Prediction was not enough. The next question was whether a machine could separate classes too.",
    modelSlug: "linear-regression",
    category: "statistics",
    wikiHref: "/wiki/topics/ai-ml/supervised/regression/linear-regression",
    demoStatus: "live",
    resourceLinks: [
      {
        label: "Wiki: Linear Regression",
        href: "/wiki/topics/ai-ml/supervised/regression/linear-regression",
        description: "Why a line is a model and where least squares came from.",
      },
      {
        label: "Wiki: Gradient Descent",
        href: "/wiki/topics/math/optimization/gradient-descent",
        description: "Why repeated small downhill steps train a model.",
      },
      {
        label: "Wiki: Derivatives and Gradients",
        href: "/wiki/topics/math/calculus/derivatives-gradient",
        description: "How slope becomes a direction in parameter space.",
      },
      {
        label: "Wiki: Loss Functions",
        href: "/wiki/topics/ai-ml/foundations/loss-functions",
        description: "Why MSE is the score this demo is trying to shrink.",
      },
    ],
  },
  {
    year: 1901,
    title: "PCA",
    subtitle: "Project to directions of variance",
    description:
      "Principal Component Analysis compresses high-dimensional data by projecting it onto the directions that preserve the most variance.",
    bridge:
      "Compression and visualization mattered, but many unlabeled problems still needed a way to discover groups without any targets.",
    modelSlug: "pca",
    category: "statistics",
    wikiHref: "/wiki/topics/ai-ml/unsupervised/dimensionality-reduction/pca",
    demoStatus: "planned",
  },
  {
    year: 1957,
    title: "k-Means",
    subtitle: "Cluster around centroids",
    description:
      "k-Means finds groups in unlabeled data by alternating between cluster assignment and centroid updates.",
    bridge:
      "Unsupervised structure discovery mattered even before neural networks, especially when labels did not exist at all.",
    modelSlug: "k-means",
    category: "ml",
    wikiHref: "/wiki/topics/ai-ml/unsupervised/clustering/k-means",
    demoStatus: "planned",
  },
  {
    year: 1958,
    title: "Perceptron",
    subtitle: "One neuron, one boundary",
    description:
      "A single weighted sum plus threshold showed that machines could learn a classifier directly from data.",
    bridge:
      "One neuron hits the XOR wall. Depth needs a way to assign credit through multiple layers.",
    modelSlug: "perceptron",
    category: "ml",
    wikiHref: "/wiki/topics/ai-ml/deep-learning/fundamentals/perceptron",
    demoStatus: "planned",
  },
  {
    year: 1967,
    title: "k-NN",
    subtitle: "Classify by neighborhood",
    description:
      "k-Nearest Neighbors skips parameter fitting and predicts from the labels of nearby examples instead.",
    bridge:
      "Local voting was intuitive, but later models tried to learn more global representations and decision rules from data.",
    modelSlug: "knn",
    category: "ml",
    wikiHref: "/wiki/topics/ai-ml/supervised/classification/knn",
    demoStatus: "planned",
  },
  {
    year: 1986,
    title: "Backpropagation",
    subtitle: "MLP and chain rule",
    description:
      "Backprop made deep networks trainable by pushing error signals backward through each layer.",
    bridge:
      "Neural nets came back, but many teams still needed models that were easier to explain and debug.",
    modelSlug: "mlp-backprop",
    category: "dl",
    wikiHref: "/wiki/topics/ai-ml/deep-learning/fundamentals/mlp-backprop",
    demoStatus: "planned",
  },
  {
    year: 1986,
    title: "Decision Trees",
    subtitle: "Split by questions",
    description:
      "Instead of weights, learn a sequence of human-readable if/then splits that reduce uncertainty.",
    bridge:
      "Greedy rules were practical, but researchers wanted stronger geometry and cleaner optimization theory.",
    modelSlug: "decision-tree",
    category: "ml",
    wikiHref: "/wiki/topics/ai-ml/supervised/classification/decision-tree",
    demoStatus: "planned",
  },
  {
    year: 1989,
    title: "Q-Learning",
    subtitle: "Learn from reward, not labels",
    description:
      "Q-Learning estimates how valuable each action is in each state and improves behavior through trial, error, and delayed reward.",
    bridge:
      "Reinforcement learning opened a second path beyond labeled supervision, while classical ML still pushed toward cleaner geometric classifiers.",
    modelSlug: "q-learning",
    category: "ml",
    wikiHref: "/wiki/topics/ai-ml/reinforcement-learning/q-learning",
    demoStatus: "planned",
  },
  {
    year: 1992,
    title: "SVM",
    subtitle: "Maximum margin geometry",
    description:
      "Support Vector Machines look for the widest possible separating boundary, not just any boundary.",
    bridge:
      "Classical ML sharpened geometry, but sequence problems still needed models that could carry context over time.",
    modelSlug: "svm",
    category: "ml",
    wikiHref: "/wiki/topics/ai-ml/supervised/classification/svm",
    demoStatus: "planned",
  },
  {
    year: 1997,
    title: "LSTM",
    subtitle: "Sequence memory with gates",
    description:
      "LSTM made recurrent networks much better at carrying information across long sequences by controlling what to keep, write, and forget.",
    bridge:
      "Sequence models finally had memory, while tree ensembles were about to become the strongest default weapon for structured tabular problems.",
    modelSlug: "rnn-lstm",
    category: "dl",
    wikiHref: "/wiki/topics/ai-ml/deep-learning/architectures/rnn-lstm",
    demoStatus: "planned",
  },
  {
    year: 1999,
    title: "Gradient Boosting",
    subtitle: "Fix the previous tree",
    description:
      "Gradient boosting builds trees sequentially so each new learner focuses on the residual mistakes of the current ensemble.",
    bridge:
      "Structured data kept rewarding smarter tree ensembles, while deep learning was about to explode in vision at scale.",
    modelSlug: "gradient-boosting",
    category: "ml",
    wikiHref: "/wiki/topics/ai-ml/supervised/classification/gradient-boosting",
    demoStatus: "planned",
  },
  {
    year: 2012,
    title: "AlexNet",
    subtitle: "Deep learning wins at scale",
    description:
      "Convolutional nets plus GPU training shattered ImageNet benchmarks and reset the field.",
    bridge:
      "Deep learning was now winning perception, and the next question was whether neural nets could generate convincingly from scratch.",
    modelSlug: "alexnet-resnet",
    category: "dl",
    wikiHref: "/wiki/topics/ai-ml/deep-learning/models/alexnet-resnet",
    demoStatus: "planned",
  },
  {
    year: 2014,
    title: "GAN",
    subtitle: "Generate by adversarial play",
    description:
      "GANs trained a generator and discriminator in opposition, making neural generation vivid but notoriously unstable.",
    bridge:
      "Adversarial generation was powerful, but sequence modeling was about to be reorganized around attention instead of recurrence.",
    modelSlug: "gan",
    category: "dl",
    wikiHref: "/wiki/topics/ai-ml/deep-learning/architectures/gan",
    demoStatus: "planned",
  },
  {
    year: 2017,
    title: "Transformer",
    subtitle: "Attention replaces recurrence",
    description:
      "Self-attention made long-range context easier to model and training much more parallel.",
    bridge:
      "Once attention scaled, the next move was to pretrain giant language models and reuse them everywhere.",
    modelSlug: "transformer",
    category: "llm",
    wikiHref: "/wiki/topics/ai-ml/deep-learning/architectures/transformer",
    demoStatus: "planned",
  },
  {
    year: 2018,
    title: "BERT",
    subtitle: "Pretrain understanding",
    description:
      "Bidirectional pretraining changed NLP from task-specific models to one large reusable foundation.",
    bridge:
      "Understanding was powerful, but generation at scale ended up reshaping the user interface of AI.",
    modelSlug: "bert",
    category: "llm",
    wikiHref: "/wiki/topics/ai-ml/deep-learning/models/bert",
    demoStatus: "planned",
  },
  {
    year: 2020,
    title: "GPT",
    subtitle: "Next-token prediction at scale",
    description:
      "Scaling a simple objective on huge text corpora produced flexible general-purpose behavior.",
    bridge:
      "Language took off first. Generative image models soon followed with a very different training story.",
    modelSlug: "gpt",
    category: "llm",
    wikiHref: "/wiki/topics/ai-ml/deep-learning/models/gpt",
    demoStatus: "planned",
  },
  {
    year: 2020,
    title: "Diffusion",
    subtitle: "Generate by denoising",
    description:
      "Learn how to reverse noise, then turn that reverse process into image generation.",
    bridge:
      "Generation spread beyond text, but language models still needed preference shaping to become useful assistants.",
    modelSlug: "diffusion",
    category: "llm",
    wikiHref: "/wiki/topics/ai-ml/deep-learning/architectures/diffusion",
    demoStatus: "planned",
  },
  {
    year: 2022,
    title: "RLHF",
    subtitle: "Align models to human preference",
    description:
      "Reinforcement Learning from Human Feedback reshaped pretrained language models into instruction-following assistants by optimizing against learned human preferences.",
    bridge:
      "Once alignment entered the loop, the frontier shifted toward multimodality, tool use, and agent behavior on top of large pretrained models.",
    modelSlug: "rlhf",
    category: "llm",
    wikiHref: "/wiki/topics/ai-ml/reinforcement-learning/rlhf",
    demoStatus: "planned",
  },
];

export function getMlvizNode(modelSlug: string) {
  return MLVIZ_TIMELINE.find((node) => node.modelSlug === modelSlug);
}
