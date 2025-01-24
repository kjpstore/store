// Carregar categorias do JSON
fetch('categories.json')
    .then(response => response.json())
    .then(data => {
        const categoryGrid = document.getElementById('categoryGrid');
        const gameFilter = document.getElementById('gameFilter');

        // Adicionar opções no filtro
        const games = [...new Set(data.map(item => item.jogo))];
        games.forEach(game => {
            const option = document.createElement('option');
            option.value = game;
            option.textContent = game;
            gameFilter.appendChild(option);
        });

        // Renderizar categorias
        const renderCategories = (categories) => {
            categoryGrid.innerHTML = '';
            categories.forEach(category => {
                const item = document.createElement('div');
                item.className = 'category-item';
                item.innerHTML = `
                    <img src="${category.imagem}" alt="${category.jogo}">
                    <p>${category.jogo}</p>
                `;
                categoryGrid.appendChild(item);
            });
        };

        // Exibir todos inicialmente
        renderCategories(data);

        // Filtrar por jogo
        gameFilter.addEventListener('change', () => {
            const selectedGame = gameFilter.value;
            const filteredCategories = selectedGame === 'all'
                ? data
                : data.filter(category => category.jogo === selectedGame);
            renderCategories(filteredCategories);
        });

        // Pesquisar por nome
        document.getElementById('searchInput').addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredCategories = data.filter(category => 
                category.jogo.toLowerCase().includes(searchTerm)
            );
            renderCategories(filteredCategories);
        });
    })
    .catch(err => console.error('Erro ao carregar JSON:', err));
