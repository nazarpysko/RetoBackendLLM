import Joke from "../models/Joke";

const clearAndPopulateDatabase = async () => {
    await Joke.deleteMany({});
  
    await Promise.all([
      Joke.create({ text: 'Test joke 1' }),
      Joke.create({ text: 'Test joke 2' }),
      Joke.create({ text: 'Test joke 3' }),
    ]);

    return (await Joke.find({})).map(joke => joke.id);
  };

export default clearAndPopulateDatabase;
