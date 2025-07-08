// The prompt is written in spanish to ensure the model understands the instructions and the context of the acta and to be able to answer in spanish.

export function buildPrompt(question: string, fragments: string[]): string {
  return `
    Pregunta del usuario:
    ${question}

    Fragmentos relevantes del acta:
    ${fragments.length > 0 ? fragments.map((frag, i) => `Fragmento ${i + 1}:\n${frag}`).join('\n\n') : '[Ninguno]'}

    Respuesta:
`.trim();
}