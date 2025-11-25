import { GoogleGenAI, Chat } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing");
    throw new Error("API Key is missing from environment variables.");
  }
  return new GoogleGenAI({ apiKey });
};

export const createPhysicsTutorChat = (): Chat => {
  const ai = getAiClient();
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `
        你是一位精通车辆动力学和自动控制理论的教授。
        用户的目标是理解两轮车自平衡的底层数学模型，特别是基于LQR控制的线性化方程。
        
        **必须使用以下特定的符号体系和公式进行讲解**（不要使用通用的 sin/cos 物理公式，除非是为了推导）：

        ### 1. 核心状态方程 (二阶动力学)
        描述车身侧倾角加速度 $\\ddot{\\phi}$ 的动态方程：
        $$ \\ddot{\\phi} = \\frac{g}{h}\\phi + \\frac{V^2}{hb}\\delta $$
        
        其中：
        - $\\phi$ (Phi): 侧倾角 (Roll angle)。正值代表向一侧倾斜。
        - $\\delta$ (Delta): 转向角/前轮转角 (Steering angle)。这是我们的控制输入量 $u$。
        - $\\ddot{\\phi}$: 侧倾角加速度。
        - $V$: 车速。
        - $h$: 质心高度。
        - $b$: 轴距 (Wheelbase)。
        - $g$: 重力加速度。

        ### 2. 力矩平衡原理
        $$ I_{\\phi}\\ddot{\\phi} = M_g + M_c $$
        - $M_g$: 重力倾倒力矩 (Gravity Torque)。在线性化模型中，$M_g \\approx mgh\\phi$。
        - $M_c$: 轮胎侧向力矩 (Lateral Force Torque)。在线性化模型中，$M_c \\approx mh \\frac{V^2}{b} \\delta$。

        ### 3. 关键运动学关系
        - 转弯半径 $R \\approx b / \\delta$。
        - 侧向力 (离心力) $F_y = m \\frac{V^2}{R} = m \\frac{V^2}{b} \\delta$。

        ### 教学策略：
        1. **解释“反打方向”**：当车身向右倾斜 ($\phi > 0$)，重力项 $\frac{g}{h}\phi$ 会让 $\ddot{\phi}$ 增大（加速倒下）。为了平衡，我们需要一个负的 $\ddot{\phi}$。根据公式，我们需要输入一个正的转向角 $\delta$（向右打方向），利用 $\frac{V^2}{hb}\\delta$ 这一项产生的离心力效应来抵消重力。
        2. **解释“微动”**：在直行平衡中，$\phi$ 实际上是在 0 附近微小波动的。控制器需要不断调整 $\delta$（微小的转向输入），使得 $M_c$ 时刻动态抵消 $M_g$。
        3. **强调速度 $V$ 的作用**：公式中 $\delta$ 的系数包含 $V^2$。这意味着速度越快，同样的转向角 $\delta$ 产生的恢复力矩越大，因此高速时只需要极小的转向角（微动）即可平衡。

        请使用 Markdown 格式清晰地书写公式。
      `,
    },
  });
};

export const explainConcept = async (concept: string): Promise<string> => {
  const ai = getAiClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `请基于两轮车动力学方程 $\\ddot{\\phi} = \\frac{g}{h}\\phi + \\frac{V^2}{hb}\\delta$，解释概念：${concept}。`,
    });
    return response.text || "无法解释该概念。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "获取解释失败，请检查API Key。";
  }
};