import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Building2, 
  UserCheck, 
  Briefcase, 
  Target, 
  FileText, 
  LogOut, 
  Menu, 
  X, 
  Flame,
  LayoutDashboard
} from 'lucide-react';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Clientes', href: '/clientes', icon: Users },
    { name: 'Empresas', href: '/empresas', icon: Building2 },
    { name: 'Funcionários', href: '/funcionarios', icon: UserCheck },
    { name: 'Cargos', href: '/cargos', icon: Briefcase },
    { name: 'Potenciais Clientes', href: '/potenciais-clientes', icon: Target },
    { name: 'Logs do Sistema', href: '/logs', icon: FileText },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-tr from-amber-600 to-orange-500 p-2 rounded-lg text-white">
            <Flame className="h-6 w-6" />
          </div>
          <span className="font-bold text-lg text-slate-100 tracking-wide">Olympus CRM</span>
        </div>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-slate-400 hover:text-slate-100 focus:outline-none"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:inset-auto flex flex-col justify-between
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          {/* Logo Brand */}
          <div className="hidden md:flex items-center space-x-3 p-6 border-b border-slate-800">
            <div className="bg-gradient-to-tr from-amber-600 to-orange-500 p-2 rounded-xl text-white shadow-lg shadow-orange-500/20">
              <Flame className="h-7 w-7" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-slate-100 tracking-wider">Olympus</h1>
              <p className="text-xs text-orange-400 font-medium">CRM</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-orange-400' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center justify-between mb-3 px-2">
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-slate-200 truncate">{user?.usuario || 'Usuário'}</p>
              <p className="text-xs text-slate-400 truncate">{user?.email || 'usuario@apolo.com'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-red-500/10 hover:text-red-400 border border-slate-700 hover:border-red-500/30 text-slate-300 rounded-lg text-sm transition-all"
          >
            <LogOut className="h-4 w-4" />
            <span>Sair do Sistema</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <main className="p-6 md:p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
