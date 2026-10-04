import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, Search, Edit2, Trash2, X, Loader2, AlertCircle } from 'lucide-react';

const CrudPage = ({ title, endpoint, fields }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const fetchData = async () => {
  setLoading(true);
  try {
    const res = await api.get(`/${endpoint}`);
    
    // Suporta resposta direta [ ... ] ou envelopada { data: [ ... ] }
    const items = Array.isArray(res.data) 
      ? res.data 
      : (Array.isArray(res.data?.data) ? res.data.data : []);

    setData(items);
  } catch (err) {
    console.error("Erro ao carregar dados:", err);
  } finally {
    setLoading(false);
  }
};

  const handleOpenModal = (item = null) => {
    setCurrentItem(item);
    if (item) {
      setFormData(item);
    } else {
      const initialForm = {};
      fields.forEach(f => initialForm[f.name] = '');
      setFormData(initialForm);
    }
    setError('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      if (currentItem) {
        await api.put(`/${endpoint}/${currentItem.id}`, formData);
      } else {
        await api.post(`/${endpoint}`, formData);
      }
      fetchData();
      handleCloseModal();
    } catch (err) {
      setError(err.response?.data?.mensagem || 'Erro ao salvar o registro.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este registro?')) return;
    try {
      await api.delete(`/${endpoint}/${id}`);
      fetchData();
    } catch (err) {
      alert('Erro ao excluir registro.');
    }
  };

  const filteredData = data.filter(item =>
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">{title}</h1>
          <p className="text-slate-400 text-sm mt-1">Gerencie os cadastros de {title.toLowerCase()}</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center space-x-2 shadow-lg shadow-orange-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Novo Cadastro</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Buscar em ${title.toLowerCase()}...`}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500"
        />
      </div>

      {/* Table Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 flex justify-center items-center text-slate-400">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          </div>
        ) : filteredData.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            Nenhum registro encontrado.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/60 text-slate-400 uppercase text-xs tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4 font-semibold">ID</th>
                  {fields.map(f => (
                    <th key={f.name} className="px-6 py-4 font-semibold">{f.label}</th>
                  ))}
                  <th className="px-6 py-4 font-semibold text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredData.map(item => (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">#{item.id}</td>
                    {fields.map(f => (
                      <td key={f.name} className="px-6 py-4 text-slate-200">
                        {item[f.name] || '-'}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 relative shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-slate-100">
                {currentItem ? 'Editar Cadastro' : 'Novo Cadastro'}
              </h3>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center space-x-2 text-red-400 text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {fields.map(f => (
                <div key={f.name}>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    {f.label}
                  </label>
                  <input
                    type={f.type || 'text'}
                    name={f.name}
                    value={formData[f.name] || ''}
                    onChange={handleInputChange}
                    required={f.required !== false}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              ))}

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-white rounded-xl text-sm font-medium flex items-center space-x-2"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  <span>{currentItem ? 'Atualizar' : 'Salvar'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrudPage;
