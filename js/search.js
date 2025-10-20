// Search functionality for Hugo blog
(function() {
    'use strict';
    
    // Search data - will be populated from Hugo
    let searchData = [];
    
    // Initialize search
    function initSearch() {
        // Get search data from the page
        const searchDataElement = document.getElementById('search-data');
        if (searchDataElement) {
            try {
                searchData = JSON.parse(searchDataElement.textContent);
            } catch (e) {
                console.error('Error parsing search data:', e);
                return;
            }
        }
        
        // Setup search input
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');
        
        if (!searchInput || !searchResults) return;
        
        // Search function
        function performSearch(query) {
            if (!query.trim()) {
                searchResults.innerHTML = '';
                searchResults.style.display = 'none';
                return;
            }
            
            const results = searchData.filter(item => {
                const searchText = query.toLowerCase();
                return item.title.toLowerCase().includes(searchText) ||
                       item.content.toLowerCase().includes(searchText) ||
                       (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchText)));
            });
            
            displayResults(results);
        }
        
        // Display search results
        function displayResults(results) {
            if (results.length === 0) {
                searchResults.innerHTML = '<div class="search-no-results">Không tìm thấy kết quả nào</div>';
                searchResults.style.display = 'block';
                return;
            }
            
            const html = results.map(item => `
                <div class="search-result-item">
                    <h3><a href="${item.url}">${item.title}</a></h3>
                    <p class="search-result-excerpt">${item.excerpt}</p>
                    <div class="search-result-meta">
                        <span class="search-result-date">${item.date}</span>
                        ${item.tags ? `<span class="search-result-tags">${item.tags.join(', ')}</span>` : ''}
                    </div>
                </div>
            `).join('');
            
            searchResults.innerHTML = html;
            searchResults.style.display = 'block';
        }
        
        // Event listeners
        searchInput.addEventListener('input', function() {
            performSearch(this.value);
        });
        
        searchInput.addEventListener('focus', function() {
            if (this.value.trim()) {
                searchResults.style.display = 'block';
            }
        });
        
        // Close search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-container')) {
                searchResults.style.display = 'none';
            }
        });
        
        // Close search results with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                searchResults.style.display = 'none';
                searchInput.blur();
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSearch);
    } else {
        initSearch();
    }
})();
