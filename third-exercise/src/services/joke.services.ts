import { InferenceClient } from '@huggingface/inference';
import axios from 'axios';

interface ChuckNorrisJoke {
    categories: string[];
    created_at: string;
    icon_url: string;
    id: string;
    updated_at: string;
    url: string;
    value: string;
}

const CHUCK_NORRIS_API = 'https://api.chucknorris.io/jokes/random';
const DAD_JOKE_API = 'https://icanhazdadjoke.com/';

const getChuckNorrisJoke = async (): Promise<string> => {
    const response = await axios.get<ChuckNorrisJoke>(CHUCK_NORRIS_API);
    return response.data.value;
}

const getDadJoke = async (): Promise<string> => {
    const response = await axios.get(DAD_JOKE_API, {
        headers: { Accept: 'text/plain' }
    });
    return response.data as string;
}

const combineJokesUsingLLM = async (chuckJokes: string[], dadJokes: string[]) => {
    if (chuckJokes.length !== dadJokes.length) {
      throw new Error('Chuck and Dad jokes arrays must have the same length.');
    }
  
    let prompt = `You are a witty comedian. For each pair of jokes below, write a new joke that creatively combines both ideas into a single, funny, and coherent joke.\n\n`;
  
    chuckJokes.forEach((chuck, idx) => {
      prompt += `Pair ${idx + 1}:\nChuck Norris Joke: "${chuck}"\nDad Joke: "${dadJokes[idx]}"\nCombined Joke:\n`;
    });
  
    prompt += `\nPlease provide one combined joke per pair, separated by newlines.\n`;
  
    const client = new InferenceClient(process.env.LLM_API_KEY!);

    const response = await client.chatCompletion({
      provider: "groq",
      model: "meta-llama/Llama-3.3-70B-Instruct",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 700,
    });
  
    const combinedText = response.choices?.[0]?.message?.content?.trim();
  
    if (!combinedText) {
      throw new Error('LLM did not return a valid response.');
    }
  
    const combinedJokes = combinedText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  
    if (combinedJokes.length !== chuckJokes.length) {
      console.warn('Mismatch between requested and returned jokes. Falling back to basic combination.');
      return chuckJokes.map((chuck, index) => ({
        chuck,
        dad: dadJokes[index],
        combinado: `${chuck} Also, ${dadJokes[index]}`
      }));
    }
  
    return chuckJokes.map((chuck, index) => ({
      chuck,
      dad: dadJokes[index],
      combinado: combinedJokes[index]
    }));
  };

export const getCombinedJokes = async (useLLM: boolean = false) => {
    try {
        const chuckPromises = Array.from({ length: 5 }, () => getChuckNorrisJoke());

        const dadPromises = Array.from({ length: 5 }, () =>
            getDadJoke().then(joke => joke.charAt(0).toLowerCase() + joke.slice(1))
        );

        const [chuckJokes, dadJokes] = await Promise.all([
            Promise.all(chuckPromises),
            Promise.all(dadPromises)
        ]);

        if (useLLM) {
            try {
                return await combineJokesUsingLLM(chuckJokes, dadJokes);
            } catch (error) {
                console.error('Error combining jokes using LLM:', error);
                // Fallback to basic combination
            }
        }

        return chuckJokes.map((chuck, index) => ({
            chuck,
            dad: dadJokes[index],
            combinado: `${chuck} Also, ${dadJokes[index]}`
        }));

    } catch (error) {
        console.error('Error fetching jokes:', error);
        throw error;
    }
};

export { ChuckNorrisJoke, getChuckNorrisJoke, getDadJoke };
