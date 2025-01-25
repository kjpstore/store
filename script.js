// Carregar categorias do JSON
fetch('categories.json')
    .then(response => response.json())
    .then(data => {
        const categoryGrid = document.getElementById('categoryGrid');
        const searchInput = document.getElementById('searchInput');
        const searchBar = document.getElementById('searchBar');
        const searchButton = document.getElementById('searchButton');
        const categorySelect = document.getElementById('categorySelect');

        // Preencher opções no select
        const genres = [...new Set(data.map(item => item.genero))];
        genres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre.toLowerCase();
            option.textContent = genre;
            categorySelect.appendChild(option);
        });

        // Renderizar categorias
        const renderCategories = (categories) => {
            categoryGrid.innerHTML = '';
            categories.forEach(category => {
                const item = document.createElement('img');
                item.src = category.imagem;
                item.alt = category.genero;
                item.className = 'category-item';
                categoryGrid.appendChild(item);
            });
        };

        // Exibir todas as categorias inicialmente
        renderCategories(data);

        // Filtrar por gênero
        categorySelect.addEventListener('change', (e) => {
            const selectedGenre = e.target.value;
            const filteredCategories = selectedGenre === 'todos' ? data : data.filter(category => category.genero.toLowerCase() === selectedGenre);
            renderCategories(filteredCategories);
        });

        // Pesquisar por nome
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredCategories = data.filter(category => 
                category.genero.toLowerCase().includes(searchTerm)
            );
            renderCategories(filteredCategories);
        });

        // Mostrar/ocultar barra de pesquisa
        searchButton.addEventListener('click', () => {
            searchBar.style.display = searchBar.style.display === 'none' ? 'block' : 'none';
            if (searchBar.style.display === 'block') {
                searchInput.focus();
            }
        });
    })
    .catch(err => console.error('Erro ao carregar JSON:', err));
