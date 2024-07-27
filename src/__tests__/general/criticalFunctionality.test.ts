import { test, expect } from 'vitest';
import axios from 'axios';

const API_BASE_URL = 'https://swapi.dev/api/';

test('Regression: Verify critical functionality', async () => {
  const response = await axios.get(`${API_BASE_URL}people?search=Luke`);
  expect(response.data.results.length).toBeGreaterThan(0);
  expect(response.data.results[0].name).toContain('Luke');
});
