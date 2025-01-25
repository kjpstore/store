// Carregar categorias do JSON
fetch('categories.json')
    .then(response => response.json())
    .then(data => {
        const categoryGrid = document.getElementById('categoryGrid');
        const searchInput = document.getElementById('searchInput');
        const searchBar = document.getElementById('searchBar');
        const searchButton = document.getElementById('searchButton');

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

        // Pesquisar por gênero
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
