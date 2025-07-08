// src/services/bot.service.ts
import { search } from './search.service';
import { buildPrompt } from './prompt.service';
import { AzureOpenAI } from "openai";
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

const endpoint = process.env.AZURE_OPENAI_ENDPOINT!;
const apiKey = process.env.AZURE_OPENAI_API_KEY!;
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME!;
const apiVersion = process.env.AZURE_OPENAI_API_VERSION!;

const options = { endpoint, apiKey, deployment, apiVersion }

const client = new AzureOpenAI(options);

const getCompletionFromOpenAI = async (prompt: string): Promise<string> => {
  const messages = [
    {
      role: "system",
      content: `
        Eres un experto en gestión vecinal. Tu tarea es responder a la pregunta del usuario utilizando únicamente la información contenida en los fragmentos relevantes de actas proporcionados. Sigue estas instrucciones de manera estricta:

        - No inventes información ni hagas suposiciones. Si la respuesta no se encuentra explícitamente en los fragmentos, responde exactamente: "No se ha tratado este tema en el acta."
        - Sé claro, conciso y preciso en tu respuesta.
        - No incluyas información que no esté presente en los fragmentos.
        - Si no hay fragmentos relevantes, responde: "No se ha tratado este tema en el acta."

        Ejemplos:

        Ejemplo 1:
        Pregunta del usuario:
        ¿Qué se acordó con la piscina?

        Fragmentos relevantes del acta:
        Fragmento 1:
        Se acordó realizar el mantenimiento anual de la piscina durante el mes de junio.

        Respuesta:
        Se acordó realizar el mantenimiento anual de la piscina durante el mes de junio.

        Ejemplo 2:
        Pregunta del usuario:
        ¿La comunidad instalará paneles solares?

        Fragmentos relevantes del acta:
        Fragmento 1:
        Se discutió la posibilidad de instalar paneles solares, pero no se tomó una decisión final.

        Respuesta:
        No se ha tratado este tema en el acta.

        Ejemplo 3:
        Pregunta del usuario:
        ¿Se habló del coste eléctrico?

        Fragmentos relevantes del acta:
        Fragmento 1:
        Se mencionó que el coste eléctrico aumentó un 10% respecto al año anterior.

        Respuesta:
        Se mencionó que el coste eléctrico aumentó un 10% respecto al año anterior.
      `.trim()
    },
    {
      role: "user",
      content: prompt
    }
  ];

  try {
    const response = await client.chat.completions.create({
      model: deployment,
      messages: messages as ChatCompletionMessageParam[],
      temperature: 0.5, // Low temperature to make the model more accurate giving him less room to be creative
      max_completion_tokens: 1000,
    });

    return response.choices?.[0]?.message?.content ?? "No se pudo generar respuesta.";
  } catch (error) {
    console.error("Error asking LLM: ", error);
    return "No se pudo generar respuesta.";
  }
};

const askLLM = async (question: string): Promise<string> => {
  const fragments = await search(question);
  const prompt = buildPrompt(question, fragments);
  console.log("Prompt: ", prompt);

  const answer = await getCompletionFromOpenAI(prompt);
  return answer;
};

export { askLLM };
