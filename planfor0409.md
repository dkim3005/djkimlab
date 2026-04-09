# Plan for 2026-04-09

## Goal

Wiki 콘텐츠를 채우고, ML/AI 역사 타임라인을 인터랙티브하게 도식화하고, 각 모델의 3B1B 스타일 시각화 데모를 만든다.

핵심 컨셉: **"이건 왜?" 를 끝까지 파고드는 흐름**
- 실사용 → 왜 쓰는지 → 어떻게 동작하는지 → 내부 수학 → 수학의 기초
- 각 단계에서 "이건 왜?"를 누르면 다음 깊이로 들어감

---

## Step 1: Wiki 콘텐츠 채우기

### 순서

역사 흐름(timeline.md)에 등장하는 ���서대로. 모델 하나 채울 때 관련 수학 문서도 같이 채운다.

```
묶음 1: Linear Regression + Gradient Descent
  채울 문서:
  - ai-ml/supervised/regression/linear-regression.md
  - math/calculus/derivatives-gradient.md
  - math/optimization/gradient-descent.md
  - ai-ml/foundations/loss-functions.md (MSE 부분)

묶음 2: Logistic Regression + Probability 기초
  채울 문서:
  - ai-ml/supervised/classification/logistic-regression.md
  - math/probability/distributions.md (Bernoulli, Gaussian)
  - math/probability/mle-map.md
  - math/information-theory/cross-entropy.md

묶음 3: Perceptron → MLP & Backprop
  채울 문서:
  - ai-ml/deep-learning/fundamentals/perceptron.md
  - ai-ml/deep-learning/fundamentals/mlp-backprop.md
  - math/calculus/chain-rule.md
  - math/calculus/partial-derivatives.md

묶음 4: Decision Tree + Entropy
  채울 문서:
  - ai-ml/supervised/classification/decision-tree.md
  - ai-ml/supervised/classification/random-forest.md
  - ai-ml/foundations/ensemble-methods.md
  - math/information-theory/entropy.md

묶음 5: SVM + Optimization
  채울 문서:
  - ai-ml/supervised/classification/svm.md
  - math/linear-algebra/dot-product.md
  - math/optimization/lagrange-multipliers.md
  - math/optimization/constrained-optimization.md

묶음 6: k-Means + PCA + Linear Algebra
  채울 문서:
  - ai-ml/unsupervised/clustering/k-means.md
  - ai-ml/unsupervised/dimensionality-reduction/pca.md
  - math/linear-algebra/vectors-matrices.md
  - math/linear-algebra/eigenvalues.md

묶음 7: CNN → Transformer → GPT
  채울 문서:
  - ai-ml/deep-learning/architectures/cnn.md
  - ai-ml/deep-learning/architectures/rnn-lstm.md
  - ai-ml/deep-learning/architectures/transformer.md
  - ai-ml/deep-learning/models/gpt.md
  - ai-ml/deep-learning/models/bert.md

묶음 8: RL → RLHF
  채울 문서:
  - ai-ml/reinforcement-learning/q-learning.md
  - ai-ml/reinforcement-learning/policy-gradient-ppo.md
  - ai-ml/reinforcement-learning/rlhf.md

묶음 9: 나머지 (GAN, Diffusion, Boosting, 기타)
  채울 문서:
  - ai-ml/supervised/classification/gradient-boosting.md
  - ai-ml/deep-learning/architectures/gan.md
  - ai-ml/deep-learning/architectures/diffusion.md
  - 나머지 math 문서들
```

### 각 ���서 작성 스타일

"이건 왜?" 질문 체인으로 작성:

```
## I Use This When...
"데이터에서 숫자를 예측하고 싶을 때"

## Why It Exists
"데이터에 패턴이 있는데, 눈으로 보면 대충 알겠지만 정확한 예측을 하려면?"
→ "선을 긋자" → "어떤 선이 제일 좋지?" → "오차를 최소화하는 선"
→ "오차를 어떻게 정의하지?" → MSE → "어떻게 최소화하지?" → gradient descent

## How It Works — Visual Intuition
3B1B 스타일 설명:
- 먼저 그림/애니메이션 묘사 (나중에 실제 시각화로 교체)
- "점들이 흩어져 있다. 선 하나를 그으면..."

## The Math Inside
수식을 쓰되, 각 기호가 뭘 의미하는지 한 줄씩 설명
→ "여기서 이건 왜 이렇게 되지?" → math wiki 링크

## Math Prerequisites
필요한 수학 개념 링크 (이미 채워진 문서로)
```

---

## Step 2: /projects/mlviz 타임라인 UI

### 라우트 구조

```
app/src/app/projects/mlviz/
  ├── page.tsx              ← 타임라인 메인 (역사 연혁)
  ├── layout.tsx            ← 공통 레이아웃
  └── [model]/
      └── page.tsx          ← 개별 모델 인터랙티브 데모
```

### 타임라인 디자인

```
데스크톱: 가로 스크롤 타임라인
┌──────────────────────────────────────────────────────────┐
│  1805      1958      1986      1992      2012      2017  │
│   │         │         │         │         │         │    │
│   ●─────────●─────────●─────────●─────────●─────────●    │
│   │         │         │         │         │         │    │
│ Least    Perceptron Backprop   SVM     AlexNet  Transformer│
│ Squares              +Tree                              │
│                                                          │
│ 노드 사이: "XOR 문제 → AI Winter" 같은 맥락 한 줄         │
│ 노��� 클릭 → /projects/mlviz/[model] 페이지               │
│ 노드 hover → 한 줄 설명 팝업                             │
└──────────────────────────────────────────────────��───────┘

모바일: 세로 스크롤 타임라인
┌──────────────┐
│ 1805         │
│ ● Least Sq.  │
│ │            │
│ │ "데이터에  │
│ │  선을 긋다"│
│ ↓            │
│ 1958         │
│ ● Perceptron │
│ │            │
│ ...          │
└──────────────┘
```

### 구현

- React + Tailwind (추가 라이��러리 최소화)
- ��임라인 노드 데이터를 상수 배열로 관리
- 각 노드: { year, title, subtitle, description, model_slug, category_color }
- 카테고리별 색상: 통계(회색), ML(파랑), DL(보라), LLM(초록)
- 반응형: `md:` breakpoint로 가로/세로 전환

---

## Step 3: 인터랙티브 데모 (3B1B 스타일)

### 첫 번째 데모: Linear Regression

```
/projects/mlviz/linear-regression

┌─────────────────────────────────────────┐
│  [산점도 캔버스]                         │
│                                         │
│     •    •                              │
│       •     •  ────── (피팅 중인 선)    │
│     •   •                               │
���   •       •                             │
│                                         │
│  Learning Rate: [====●====] 0.01        │
│  Iterations:    [====●====] 100         │
│                                         │
│  [▶ Run Gradient Descent]               │
│                                         │
│  Loss: 2.34 → 0.87 → 0.42 → ...        │
│  (loss curve 실시간 그래프)              │
│                                         │
│  ──────────────────────────────────      │
│  "이 선의 기울기는 어떻게 결정될까?"     │
│  → gradient가 loss를 줄이는 방향을 가리킨다│
│  → gradient가 뭔데? [📐 미분 보기]       │
│  → loss가 뭔데? [📊 MSE 보기]           │
│  ──────────────────────────────────      │
│  [📖 Wiki: Linear Regression]           │
│  [📖 Wiki: Gradient Descent]            │
└─────────────────────────────────────────┘
```

### 기술 스택

- D3.js — 2D 산점도, loss curve
- Three.js — 3D loss surface (나중에)
- KaTeX — 수식 렌더링 (나중에)
- Manim — GIF/영상 생성 (나중에, 별도 Python 파이프라인)

### 우선순위 데모 목록

```
1순위 (가장 기본, 시각화 효과 높음):
  - Linear Regression — 선 피팅 + gradient descent
  - k-NN — 점 찍으면 이웃 하이라이트 + boundary
  - Decision Tree — step-by-step split 애니메이션
  - k-Means — centroid 이동 애니메이션

2순위 (좀 더 복잡):
  - SVM — margin + support vector 하이라이트
  - PCA — 분산 방향 화살표 + 차원 축소
  - Logistic Regression — sigmoid curve + decision boundary
  - Perceptron — 가중치 변화에 따른 boundary 이동

3순위 (DL, 고급):
  - MLP — 신호 흐름 + backprop 역전파 시각화
  - CNN — 필터가 이미지 위를 슬라이딩하는 모습
  - Transformer Attention — 히트맵 시각화
  - Gradient Descent 3D — loss surface 위의 공
```

---

## Step 4: Wiki ↔ 시각화 상호 링크

각 Wiki 문서의 "Visual Intuition" 섹션에서 데모 링크:
```markdown
### Visual Intuition

→ [인터랙티브 데모에서 직접 확인하기](/projects/mlviz/linear-regression)
```

각 시각화 페이지 하단에서 Wiki 링크:
```
📖 더 깊이 알아보기:
- Linear Regression — 수식과 역사
- Gradient Descent — 왜 이 방향으로 가는지
- Derivatives — gradient의 수학적 의미
```

---

## 작업 예상 배분

| 작업 | 세션 수 (대략) | 비고 |
|------|---------------|------|
| Wiki 묶음 1-3 (핵��� 기초) | 2-3세션 | Linear Reg, Logistic, Perceptron+Backprop |
| 타임라인 UI | 1세션 | React + Tailwind, 데이터 정의 |
| 첫 데모 (Linear Regression) | 1세션 | D3.js 인터랙티브 |
| Wiki 묶음 4-6 | 2-3세션 | Tree, SVM, Clustering |
| 추가 데모 2-3개 | 2세션 | k-NN, Decision Tree, k-Means |
| Wiki 묶음 7-9 | 2-3세션 | DL, Transformer, RL |
| 고급 데모 | 추후 | CNN, Transformer attention 등 |

---

## 시작 명령

```
이 파일(planfor0409.md)을 읽고, Step 1 묶음 1부터 시작해.
Wiki 문서를 "이��� 왜?" 질문 체인 스타일로 채워줘.
```
