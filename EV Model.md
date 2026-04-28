## Final Model (Short)

### User inputs (per project)
- **Value** $ V \in [0,100] $  
- **Deadline** $ D $ (days from now, or ∞ if none)

### Derived parameters
- **Base value**: $ B = V / 10 $  
- **Decay rate**: $ \alpha = 0.2 + (1 - V/100) \times 0.3 $  
- **Urgency multiplier**:  
  $$
  U = \begin{cases}
  1 + \min\!\left(5,\; \frac{2}{D+0.5}\right) & \text{if deadline exists}\\
  1 & \text{otherwise}
  \end{cases}
$$
- **Cross‑effect** $ \beta_{ij} $:  
  - If $ j $ has deadline and $ i $ has none: $ \beta_{ij} = +0.2 \cdot \frac{V_j}{100} \cdot \frac{1}{D_j+0.5} $  
  - If both $ V_i, V_j > 70 $: $ \beta_{ij} = -0.1 $  
  - Else $ \beta_{ij} = 0 $  
- **Saturation function** for cross‑terms: $ g(x) = 1 - e^{-\gamma x} $ with $ \gamma = 0.5 $

### Fixed parameters
- Switching cost: $ \lambda = 0.3 $, $ \eta = 0.15 $  
- Focus bonus: $ \mu = 0.25 $

### At each block (greedy, coupled)
Let:
- $ x_i $ = blocks done on $ i $ today  
- $ c_i $ = consecutive blocks on $ i $ (cap at 6)  
- $ h $ = total switches today  
- $ prev $ = last project scheduled

**Marginal EV of next block of $ i $:**
$$
\mathrm{EV}_i = \underbrace{B_i \, e^{-\alpha_i x_i} \cdot U_i}_{\text{intrinsic urgency}} \;+\; \underbrace{\sum_{j \neq i} \beta_{ij} \, g(x_j)}_{\text{saturating cross‑pressure}} \;-\; \underbrace{\lambda \cdot \mathbf{1}_{prev \neq i} \cdot (1 + \eta h)}_{\text{switching penalty}} \;+\; \underbrace{\mu \cdot \max(0, c_i-1)}_{\text{focus bonus}}
$$

### Decision
Schedule the project with highest $ \mathrm{EV}_i $.  
Update $ x_i, c_i, h, prev $ and repeat every 10‑min block.

**No time‑based neglect** (deliberate omission), sufficient for daily use.