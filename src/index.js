// Make sure Axios is included in your HTML before this script:
// <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

async function getCatFacts(count) {
  const resultsDiv = document.getElementById('cats-results');
  const errorDiv = document.getElementById('error-message');
  resultsDiv.innerHTML = '';
  errorDiv.textContent = '';

  if (isNaN(count) || count < 1 || count > 50) {
    errorDiv.textContent = 'Enter a number between 1 and 50 for cat facts.';
    return;
  }

  try {
    for (let i = 0; i < count; i++) {
      const response = await axios.get('https://meowfacts.herokuapp.com/');
      const fact = response.data.data[0];
      const p = document.createElement('p');
      p.textContent = ` - ${fact}`;
      resultsDiv.appendChild(p);
    }
  } catch (error) {
    errorDiv.textContent = 'Failed to load cat facts.';
  }
}

async function getCatPhotos(count) {
  const resultsDiv = document.getElementById('cats-results');
  const errorDiv = document.getElementById('error-message');
  resultsDiv.innerHTML = '';
  errorDiv.textContent = '';

  if (isNaN(count) || count < 1 || count > 10) {
    errorDiv.textContent = 'Enter a number between 1 and 10 for cat photos.';
    return;
  }

  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=${count}`);
    response.data.forEach(photo => {
      const img = document.createElement('img');
      img.src = photo.url;
      img.alt = 'A cat';
      img.style.width = '200px';
      img.style.margin = '10px';
      resultsDiv.appendChild(img);
    });
  } catch (error) {
    errorDiv.textContent = 'Failed to load cat photos.';
  }
}

// DOM interaction (trigger async functions)
document.addEventListener('DOMContentLoaded', () => {
  const catFactsBtn = document.querySelectorAll('.btn')[0];
  const catPhotosBtn = document.querySelectorAll('.btn')[1];
  const factsInput = document.querySelectorAll('input')[0];
  const photosInput = document.querySelectorAll('input')[1];

  catFactsBtn.addEventListener('click', () => {
    const count = parseInt(factsInput.value);
    getCatFacts(count);
  });

  catPhotosBtn.addEventListener('click', () => {
    const count = parseInt(photosInput.value);
    getCatPhotos(count);
  });
});
