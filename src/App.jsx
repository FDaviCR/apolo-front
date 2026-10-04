import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CrudPage from './pages/CrudPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Rotas Protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout><Dashboard /></Layout>} />
            
            {/* Clientes */}
            <Route
              path="/clientes"
              element={
                <Layout>
                  <CrudPage
                    title="Clientes"
                    endpoint="clientes"
                    fields={[
                      { name: 'nome', label: 'Nome / Razão Social' },
                      { name: 'email', label: 'E-mail', type: 'email' },
                      { name: 'telefone', label: 'Telefone' },
                      { name: 'documento', label: 'CPF / CNPJ' }
                    ]}
                  />
                </Layout>
              }
            />

            {/* Empresas */}
            <Route
              path="/empresas"
              element={
                <Layout>
                  <CrudPage
                    title="Empresas"
                    endpoint="empresas"
                    fields={[
                      { name: 'empresa', label: 'Nome da Empresa' },
                      { name: 'cnpj', label: 'CNPJ' },
                      { name: 'email', label: 'E-mail', type: 'email' },
                      { name: 'telefone', label: 'Telefone' },
                      { name: 'endereco', label: 'Endereço' }
                    ]}
                  />
                </Layout>
              }
            />

            {/* Funcionários */}
            <Route
              path="/funcionarios"
              element={
                <Layout>
                  <CrudPage
                    title="Funcionários"
                    endpoint="funcionarios"
                    fields={[
                      { name: 'nome', label: 'Nome Completo' },
                      { name: 'email', label: 'E-mail', type: 'email' },
                      { name: 'cpf', label: 'CPF' },
                      { name: 'telefone', label: 'Telefone' },
                      { name: 'cargo', label: 'Cargo' }
                    ]}
                  />
                </Layout>
              }
            />

            {/* Cargos */}
            <Route
              path="/cargos"
              element={
                <Layout>
                  <CrudPage
                    title="Cargos"
                    endpoint="cargos"
                    fields={[
                      { name: 'nome', label: 'Nome do Cargo' },
                      { name: 'descricao', label: 'Descrição' },
                      { name: 'salario', label: 'Salário Base', type: 'number' }
                    ]}
                  />
                </Layout>
              }
            />

            {/* Potenciais Clientes */}
            <Route
              path="/potenciais-clientes"
              element={
                <Layout>
                  <CrudPage
                    title="Potenciais Clientes"
                    endpoint="potenciais-clientes"
                    fields={[
                      { name: 'nome', label: 'Nome do Contacto' },
                      { name: 'empresa', label: 'Empresa' },
                      { name: 'email', label: 'E-mail', type: 'email' },
                      { name: 'telefone', label: 'Telefone' },
                      { name: 'status', label: 'Status' }
                    ]}
                  />
                </Layout>
              }
            />

            {/* Logs */}
            <Route
              path="/logs"
              element={
                <Layout>
                  <CrudPage
                    title="Logs do Sistema"
                    endpoint="logs"
                    fields={[
                      { name: 'acao', label: 'Ação' },
                      { name: 'usuario', label: 'Usuário' },
                      { name: 'createdAt', label: 'Data / Hora' }
                    ]}
                  />
                </Layout>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;