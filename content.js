function getHomepageVideos() {
    const videos = [];
    document.querySelectorAll('ytd-rich-item-renderer').forEach((el) => {
        const titleEl = el.querySelector('#video-title');
        const thumbEl = el.querySelector('img');
        const link = el.querySelector("a")
        if (titleEl && thumbEl) {
            videos.push({
                title: titleEl.textContent.trim(),
                url: 'https://www.youtube.com' + link.getAttribute('href'),
                thumbnail: thumbEl.src
            });
        }
    });

    if (videos.length > 0) {
        chrome.storage.local.get({ history: [] }, (data) => {
            const newEntry = {
                timestamp: new Date().toISOString(),
                videos: videos.slice(0, 18)
            };
            const updatedHistory = [...data.history, newEntry];
            chrome.storage.local.set({ history: updatedHistory });
        });
    }
}

window.addEventListener('load', () => {
    setTimeout(getHomepageVideos, 3000);
});
