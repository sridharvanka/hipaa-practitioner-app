import Anthropic from "@anthropic-ai/sdk";

let anthropicClient: Anthropic | null = null;

function getAnthropicClient(): Anthropic {
  if (!anthropicClient) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY environment variable is not set.");
    }
    anthropicClient = new Anthropic({ apiKey });
  }
  return anthropicClient;
}

const SYSTEM_INSTRUCTION = `You are a high-level HIPAA Regulatory Compliance Expert, Security Auditor, and Healthcare IT Risk Assessor.
Your target audience is healthcare administrators, compliance officers, and medical IT personnel.

Primary Directives:
1. Provide accurate, rigorously factual explanations of HIPAA regulations, citing specific sections of the Code of Federal Regulations (CFR), such as:
   - HIPAA Privacy Rule (45 CFR § 164.500 to 164.534)
   - HIPAA Security Rule (45 CFR § 164.300 to 164.318), highlighting Administrative Safeguards (§ 164.308), Physical Safeguards (§ 164.310), and Technical Safeguards (§ 164.312).
   - HIPAA Breach Notification Rule (45 CFR § 164.400 to 164.414).
   - HIPAA Transactions and Code Sets Rules (45 CFR Part 162).
2. Avoid hallucinations. If you are unsure of a compliance sub-clause, state that the administrator should consult legal counsel or direct HHS OCR bulletins.
3. Perform realistic Red Team audits of user-submitted scenarios:
   - Identify blindspots (e.g., using unauthorized cloud drives, failing to sign Business Associate Agreements (BAAs), missing tracking pixel disclosures like Meta Pixel on patient portals, inadequate disaster recovery backup isolation).
   - Point out historical breach examples where similar blindspots caused catastrophic failures (e.g., Change Healthcare in 2024, Anthem in 2015, Novant Health in 2022).
4. Outline concrete remediation steps. Always suggest specific safeguards to mitigate identified risks.
5. Keep your tone highly professional, precise, objective, and authoritative. Use clear formatting, lists, and markdown headers.`;

interface ChatTurn {
  role: string;
  text: string;
}

export async function getAdvisorReply(message: string, chatHistory?: ChatTurn[], assessmentDetails?: unknown): Promise<string> {
  const anthropic = getAnthropicClient();
  const messages: { role: "user" | "assistant"; content: string }[] = [];

  if (assessmentDetails) {
    messages.push({
      role: "user",
      content: `Here is my current HIPAA compliance self-assessment info:\n${JSON.stringify(assessmentDetails, null, 2)}`,
    });
    messages.push({
      role: "assistant",
      content: "Understood. I will use this self-assessment profile to contextualize your compliance questions and risk profile.",
    });
  }

  if (chatHistory && Array.isArray(chatHistory)) {
    chatHistory.forEach((turn) => {
      messages.push({
        role: turn.role === "user" ? "user" : "assistant",
        content: turn.text,
      });
    });
  }

  messages.push({ role: "user", content: message });

  const response = await anthropic.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 4096,
    temperature: 0.2,
    system: SYSTEM_INSTRUCTION,
    messages,
  });

  const textBlock = response.content.find((block) => block.type === "text");
  return textBlock?.text || "I was unable to formulate a compliance response. Please refine your inquiry.";
}
