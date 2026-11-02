// OMDb movie search API integration.
// 1. Request a free key at https://www.omdbapi.com/apikey.aspx
// 2. Replace the text below with your API key.
const API_KEY = 'YOUR_OMDB_API_KEY';
const form = document.querySelector('#movie-form');
const input = document.querySelector('#movie-input');
const message = document.querySelector('#movie-message');
const results = document.querySelector('#movie-results');

async function searchMovies(title) {
  if (API_KEY === 'YOUR_OMDB_API_KEY') {
    throw new Error('Add your OMDb API key in movies.js before searching.');
  }
  const url = new URL('https://www.omdbapi.com/');
  url.search = new URLSearchParams({ s: title, apikey: API_KEY, type: 'movie' });
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network error. Please try again.');
  const data = await response.json();
  if (data.Response === 'False') throw new Error(data.Error || 'No movies found.');
  return data.Search ?? [];
}

const escapeHTML = (value = '') => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));

function renderMovies(movies) {
  results.innerHTML = movies.map(({ Title, Year, Poster, imdbID }) => {
    const poster = Poster && Poster !== 'N/A'
      ? `<img src="${escapeHTML(Poster)}" alt="Poster for ${escapeHTML(Title)}" loading="lazy">`
      : '<div class="poster-placeholder" aria-label="No poster available">🎞️</div>';
    return `<article class="movie-card">${poster}<div class="movie-info"><h2>${escapeHTML(Title)}</h2><div class="movie-meta"><span>${escapeHTML(Year)}</span><span class="rating">IMDb ID: ${escapeHTML(imdbID)}</span></div></div></article>`;
  }).join('');
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) return;
  results.innerHTML = '';
  message.textContent = 'Searching movies…';
  try {
    const movies = await searchMovies(title);
    renderMovies(movies);
    message.textContent = `Found ${movies.length} result(s) for "${title}".`;
  } catch (error) {
    message.textContent = error.message;
  }
});
