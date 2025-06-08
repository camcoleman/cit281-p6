document.getElementById('songForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const artist = document.getElementById('artist').value;
    const instruments = document.getElementById('instruments').value.split(',').map(i => i.trim());
  
    const response = await fetch('/songs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, artist, instruments })
    });
  
    if (response.ok) {
      loadSongs();
    }
  });
  
  async function loadSongs() {
    const res = await fetch('/songs');
    const data = await res.json();
    const container = document.getElementById('songsContainer');
    container.innerHTML = '';
    data.data.forEach(song => {
      const div = document.createElement('div');
      div.innerHTML = `<h3>${song.title} by ${song.artist}</h3><p>Instruments: ${song.instruments.join(', ')}</p>`;
      container.appendChild(div);
    });
  }
  
  window.onload = loadSongs;
  