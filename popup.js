function renderHistory() {
    chrome.storage.local.get('history', (data) => {
        const container = document.getElementById('history');
        container.innerHTML = ''; // Clear before rendering
        const button = document.getElementById("clearBtn")
        if (!data.history) return button.setAttribute("hidden", "");

        const history = data.history.slice().reverse(); // Show newest first
        history.forEach((entry, index) => {
            const section = document.createElement('details');
            const summary = document.createElement('summary');

            const time = document.createElement('span');
            time.textContent = new Date(entry.timestamp).toLocaleString();

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.className = 'remove-btn';
            removeBtn.onclick = () => {
                const realIndex = data.history.length - 1 - index; // reverse indexing
                data.history.splice(realIndex, 1);
                chrome.storage.local.set({ history: data.history }, renderHistory);
            };

            summary.appendChild(time);
            summary.appendChild(removeBtn);
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
}

document.getElementById('clearBtn').addEventListener('click', () => {
    if (confirm("Clear all history entries?")) {
        chrome.storage.local.remove('history', renderHistory);
    }
});

renderHistory();
