
document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('category-select');
    const gamesGrid = document.getElementById('games-grid');

    // Mock JSON data
    const categoriesData = [
        { id: 1, name: 'Blox Fruits', genre: 'RPG', image: 'https://raw.githubusercontent.com/kjpstore/store/refs/heads/main/assets/bloxfruits.png' },
        { id: 2, name: 'Fisch', genre: 'Luta', image: 'https://raw.githubusercontent.com/kjpstore/store/refs/heads/main/assets/fisch.png' },
    ];

    function populateCategories() {
        const genres = [...new Set(categoriesData.map(item => item.genre))];
        genres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre;
            option.textContent = genre;
            categorySelect.appendChild(option);
        });
    }

    function populateGames(genre = 'all') {
        gamesGrid.innerHTML = '';
        const filteredGames = genre === 'all' ? categoriesData : categoriesData.filter(game => game.genre === genre);
        filteredGames.forEach(game => {
            const gameItem = document.createElement('div');
            gameItem.classList.add('grid-item');
            gameItem.innerHTML = `<img src="${game.image}" alt="${game.name}">`;
            gamesGrid.appendChild(gameItem);
        });
    }

    categorySelect.addEventListener('change', () => {
        populateGames(categorySelect.value);
    });

    // Initial population
    populateCategories();
    populateGames();
});
