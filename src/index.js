
async function getCatFacts(count) {
  const resultsDiv = document.getElementById('cats-results');
  const errorDiv = document.getElementById('error-message');
  const loadingDiv = document.getElementById('loading');
  resultsDiv.innerHTML = '';
  errorDiv.textContent = '';

  if (isNaN(count) || count < 1 || count > 50) {
    errorDiv.textContent = 'Enter a number between 1 and 50 for cat facts.';
    return;
  }

  loadingDiv.style.display = 'flex'; 

  try {
    for (let i = 0; i < count; i++) {
      const response = await axios.get('https://meowfacts.herokuapp.com/');
      const fact = response.data.data[0];
      const p = document.createElement('p');
      p.textContent = `${i + 1}. ${fact}`;
      resultsDiv.appendChild(p);
    }
  } catch (error) {
    errorDiv.textContent = 'Failed to load cat facts.';
  } finally {
    loadingDiv.style.display = 'none'; 
  }
}

async function getCatPhotos(count) {
  const resultsDiv = document.getElementById('cats-results');
  const errorDiv = document.getElementById('error-message');
  const loadingDiv = document.getElementById('loading');
  resultsDiv.innerHTML = '';
  errorDiv.textContent = '';

  if (isNaN(count) || count < 1 || count > 10) {
    errorDiv.textContent = 'Enter a number between 1 and 10 for cat photos.';
    return;
  }

  loadingDiv.style.display = 'flex'; 

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
  } finally {
    loadingDiv.style.display = 'none'; 
  }
}

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
