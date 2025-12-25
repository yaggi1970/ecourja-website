document.addEventListener('DOMContentLoaded', function() {
    // Category management
    const editCategoryBtns = document.querySelectorAll('.edit-category');
    const deleteCategoryBtns = document.querySelectorAll('.delete-category');
    
    editCategoryBtns.forEach(btn => {
        btn.addEventListener('click', async function() {
            const categoryId = this.dataset.id;
            try {
                const response = await fetch(`/api/categories/${categoryId}`);
                const category = await response.json();
                
                document.getElementById('editCategoryId').value = category._id;
                document.getElementById('editName').value = category.name;
                document.getElementById('editDescription').value = category.description;
                
                const modal = new bootstrap.Modal(document.getElementById('editCategoryModal'));
                modal.show();
            } catch (error) {
                console.error('Error fetching category:', error);
                alert('Error loading category details');
            }
        });
    });

    deleteCategoryBtns.forEach(btn => {
        btn.addEventListener('click', async function() {
            if (confirm('Are you sure you want to delete this category? All products in this category will also be deleted.')) {
                const categoryId = this.dataset.id;
                try {
                    const response = await fetch(`/admin/categories/${categoryId}`, {
                        method: 'DELETE'
                    });
                    
                    if (response.ok) {
                        window.location.reload();
                    } else {
                        alert('Error deleting category');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Error deleting category');
                }
            }
        });
    });

    // Product management
    const editProductBtns = document.querySelectorAll('.edit-product');
    const deleteProductBtns = document.querySelectorAll('.delete-product');
    const categoryFilter = document.getElementById('categoryFilter');

    editProductBtns.forEach(btn => {
        btn.addEventListener('click', async function() {
            const productId = this.dataset.id;
            try {
                const response = await fetch(`/api/products/${productId}`);
                const product = await response.json();
                
                document.getElementById('editProductId').value = product._id;
                document.getElementById('editName').value = product.name;
                document.getElementById('editCategory').value = product.category;
                document.getElementById('editDescription').value = product.description;
                document.getElementById('editStatus').value = product.status;
                document.getElementById('editFeatures').value = product.features.join('\n');
                
                const modal = new bootstrap.Modal(document.getElementById('editProductModal'));
                modal.show();
            } catch (error) {
                console.error('Error fetching product:', error);
                alert('Error loading product details');
            }
        });
    });

    deleteProductBtns.forEach(btn => {
        btn.addEventListener('click', async function() {
            if (confirm('Are you sure you want to delete this product?')) {
                const productId = this.dataset.id;
                try {
                    const response = await fetch(`/admin/products/${productId}`, {
                        method: 'DELETE'
                    });
                    
                    if (response.ok) {
                        window.location.reload();
                    } else {
                        alert('Error deleting product');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Error deleting product');
                }
            }
        });
    });

    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            const selectedCategory = this.value;
            window.location.href = `/admin/products${selectedCategory ? `?category=${selectedCategory}` : ''}`;
        });
    }
});

// Form submission handling
document.getElementById('editCategoryForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const categoryId = document.getElementById('editCategoryId').value;
    
    try {
        const response = await fetch(`/admin/categories/${categoryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: document.getElementById('editName').value,
                description: document.getElementById('editDescription').value
            })
        });
        
        if (response.ok) {
            window.location.reload();
        } else {
            alert('Error updating category');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error updating category');
    }
});

document.getElementById('editProductForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const productId = document.getElementById('editProductId').value;
    
    try {
        const response = await fetch(`/admin/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: document.getElementById('editName').value,
                category: document.getElementById('editCategory').value,
                description: document.getElementById('editDescription').value,
                status: document.getElementById('editStatus').value,
                features: document.getElementById('editFeatures').value
            })
        });
        
        if (response.ok) {
            window.location.reload();
        } else {
            alert('Error updating product');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error updating product');
    }
});