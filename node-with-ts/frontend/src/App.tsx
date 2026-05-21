import { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, X, Check, Package, PackagePlus } from 'lucide-react';

interface Product {
  id: number;
  [key: string]: any;
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', price: '', description: '' });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/products');
      // Backend returns { data: { products: [...] } }
      setProducts(res.data.data.products || []);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddForm = () => {
    setFormData({ name: '', price: '', description: '' });
    setEditingId(null);
    setIsFormOpen(true);
  };

  const openEditForm = (product: Product) => {
    setFormData({
      name: product.name || '',
      price: product.price?.toString() || '',
      description: product.description || ''
    });
    setEditingId(product.id);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setFormData({ name: '', price: '', description: '' });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        price: Number(formData.price),
        description: formData.description
      };

      if (editingId) {
        await axios.put(`/api/products/${editingId}`, payload);
      } else {
        await axios.post('/api/products', payload);
      }
      
      await fetchProducts();
      closeForm();
    } catch (err: any) {
      alert(err.message || 'Failed to save product');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await axios.delete(`/api/products/${id}`);
      await fetchProducts();
    } catch (err: any) {
      alert(err.message || 'Failed to delete product');
    }
  };

  return (
    <div className="container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="page-title" style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Package size={36} color="#3b82f6" />
            Product Dashboard
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage your inventory beautifully</p>
        </div>
        <button className="btn btn-primary animate-fade-in" onClick={openAddForm}>
          <Plus size={18} />
          Add Product
        </button>
      </header>

      {error && (
        <div style={{ backgroundColor: 'var(--danger)', color: 'white', padding: '1rem', borderRadius: 'var(--radius)', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          <PackagePlus size={48} style={{ animation: 'bounce 1s infinite' }} />
        </div>
      ) : products.length === 0 ? (
        <div className="card animate-fade-in" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <Package size={48} color="var(--text-secondary)" style={{ margin: '0 auto 1rem' }} />
          <h3>No products found</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Get started by adding your first product.</p>
          <button className="btn btn-primary" onClick={openAddForm}>
            <Plus size={18} /> Add Product
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="card animate-fade-in" 
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary)' }}>
                  {product.name || `Product #${product.id}`}
                </h3>
                <span style={{ backgroundColor: 'var(--bg-main)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius)', fontSize: '0.875rem', fontWeight: 500, color: '#10b981' }}>
                  ${product.price || '0.00'}
                </span>
              </div>
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem', minHeight: '2.5rem' }}>
                {product.description || 'No description available for this product.'}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                <button 
                  className="btn-icon" 
                  onClick={() => openEditForm(product)}
                  title="Edit product"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  className="btn-icon" 
                  onClick={() => handleDelete(product.id)}
                  style={{ color: 'var(--danger)' }}
                  title="Delete product"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal / Form Overlay */}
      {isFormOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50,
          padding: '1rem'
        }}>
          <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button className="btn-icon" onClick={closeForm}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Product Name</label>
                <input 
                  type="text" 
                  name="name" 
                  className="input" 
                  value={formData.name} 
                  onChange={handleInputChange}
                  required 
                  placeholder="e.g. Mechanical Keyboard"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Price ($)</label>
                <input 
                  type="number" 
                  name="price" 
                  step="0.01"
                  className="input" 
                  value={formData.price} 
                  onChange={handleInputChange}
                  required 
                  placeholder="99.99"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea 
                  name="description" 
                  className="input" 
                  value={formData.description} 
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Brief description of the product..."
                />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn" style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-primary)' }} onClick={closeForm}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Check size={18} />
                  {editingId ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}} />
    </div>
  );
}
