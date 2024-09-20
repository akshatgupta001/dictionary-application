// mocks/browser.js
import { setupWorker, rest } from 'msw';

// Define mock handlers
export const worker = setupWorker(
  // Intercept GET request to fetch all words
  rest.get('http://localhost:5002/words', (req, res, ctx) => {
    return res(
      ctx.json([
        { word: 'API', fullForm: 'Application Programming Interface', description: 'A set of functions and protocols for building software.' },
        { word: 'HTML', fullForm: 'Hypertext Markup Language', description: 'The standard language for creating web pages.' }
      ])
    );
  }),

  // Intercept GET request to fetch details of a specific word
  rest.get('http://localhost:5002/words/:word', (req, res, ctx) => {
    const { word } = req.params;
    return res(
      ctx.json({
        word,
        fullForm: `Full Form of ${word}`,
        description: `Description of ${word}`
      })
    );
  }),

  // Intercept POST request to add a new word
  rest.post('http://localhost:5002/words', (req, res, ctx) => {
    const { word, fullForm, description } = req.body;
    return res(
      ctx.status(201),
      ctx.json({ message: 'Word added successfully!', word, fullForm, description })
    );
  }),

  // Intercept PUT request to update a word's details
  rest.put('http://localhost:5002/words/:word', (req, res, ctx) => {
    const { word } = req.params;
    const { description, tags } = req.body;
    return res(
      ctx.json({ message: `Word ${word} updated successfully!`, description, tags })
    );
  }),

  // Intercept GET request to fetch top N searched words
  rest.get('http://localhost:5002/words/top/:n', (req, res, ctx) => {
    const { n } = req.params;
    const topWords = Array.from({ length: n }, (_, i) => ({
      word: `Word ${i + 1}`,
      description: `Description for word ${i + 1}`
    }));
    return res(ctx.json(topWords));
  }),

  // Intercept GET request to fetch tags
  rest.get('http://localhost:5002/tags', (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'technology' },
        { name: 'software' },
        { name: 'web' },
        { name: 'markup' }
      ])
    );
  })
);
