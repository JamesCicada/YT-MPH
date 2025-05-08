chrome.storage.local.get('history', (data) => {
    const container = document.getElementById('history');
    if (!data.history) return;
  
    const history = data.history.slice(-10).reverse(); // Show last 10 entries
  
    history.forEach((entry) => {
      const section = document.createElement('details');
      const summary = document.createElement('summary');
      summary.textContent = new Date(entry.timestamp).toLocaleString();
      section.appendChild(summary);
  
      const grid = document.createElement('div');
      grid.className = 'video-grid';
  
      entry.videos.forEach((video) => {
        const card = document.createElement('div');
        card.className = 'video-card';
  
        const img = document.createElement('img');
        img.src = video.thumbnail;
        img.alt = video.title;
  
        const link = document.createElement('a');
        link.href = video.url;
        link.target = '_blank';
        link.textContent = video.title.length > 50
          ? video.title.slice(0, 47) + "..."
          : video.title;
  
        card.appendChild(img);
        card.appendChild(link);
        grid.appendChild(card);
      });
  
      section.appendChild(grid);
      container.appendChild(section);
    });
  });
  