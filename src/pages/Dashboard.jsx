import React from 'react';
import { Users, Building2, UserCheck, Briefcase, Target, ArrowUpRight } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Clientes Ativos', value: '124', icon: Users, color: 'from-blue-600 to-cyan-500' },
    { title: 'Empresas Parceiras', value: '38', icon: Building2, color: 'from-emerald-600 to-teal-500' },
    { title: 'Funcionários', value: '86', icon: UserCheck, color: 'from-amber-600 to-orange-500' },
    { title: 'Cargos Registrados', value: '14', icon: Briefcase, color: 'from-purple-600 to-indigo-500' },
    { title: 'Potenciais Clientes', value: '52', icon: Target, color: 'from-rose-600 to-pink-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Painel Principal</h1>
        <p className="text-slate-400 text-sm mt-1">Visão geral do sistema de gestão Olympus</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-400 text-sm font-medium">{stat.title}</span>
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-extrabold text-slate-100">{stat.value}</span>
                <span className="text-emerald-400 text-xs font-semibold flex items-center">
                  +12% <ArrowUpRight className="h-3 w-3 ml-0.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
