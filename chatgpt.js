require("dotenv").config();
const OpenAIApi = require("openai");
const { PROMPT_STEP1 } = require("./gpt-prompt/step1");
const { PROMPT_STEP2 } = require("./gpt-prompt/step2");

const openai = new OpenAIApi({
  api_key: "process.env.OPENAI_API_KEY",
});

// ChatGPT에 대화식으로 요청을 보내는 함수
async function callChatGPT({ userInput, gptStep }) {
  console.log("gptStep", gptStep);
  // Step에 따른 프롬프트 설정
  let gptPrompt = "";
  gptStep === "summary" && (gptPrompt = PROMPT_STEP1);
  gptStep === "details" && (gptPrompt = PROMPT_STEP2);

  if (!gptPrompt) return;

  const messages = [
    {
      role: "system",
      content: gptPrompt,
    },
    {
      role: "user",
      content: userInput, // 사용자에게 받은 커스텀 프롬프트
    },
  ];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      max_tokens: 7000, // 최대 토큰 수 설정
      temperature: 0.6, // 창의성 조절
      top_p: 0.9, // Top P 설정 (Nucleus Sampling)
      frequency_penalty: 0.4, // 빈도 페널티 설정 (반복 줄이기)
      presence_penalty: 0.2, // 등장 페널티 설정 (새로운 주제 유도)
      // stop: ["}"], // 응답 종료 조건 -> JSON 형식을 유지하기 위해 "}"로 종료
    });

    // 응답 데이터 반환
    const chatGPTRes = response.choices[0].message.content;
    console.log("Step: ", gptStep, "/ ChatGPT 답변:", chatGPTRes);
    return chatGPTRes;
  } catch (error) {
    console.error("ChatGPT 요청 중 오류:", error);
    throw error;
  }
}

module.exports = { callChatGPT };
