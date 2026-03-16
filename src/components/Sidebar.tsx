import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Calculator,
  FileCheck,
  Search,
  Bot,
  Settings,
  HelpCircle,
  Users,
} from 'lucide-react';

const navigation = [
  { name: 'ダッシュボード', href: '/', icon: LayoutDashboard },
  { name: '人件費シミュレーション', href: '/simulation', icon: Calculator },
  { name: '給与チェック', href: '/payroll', icon: FileCheck },
  { name: '過去事例検索', href: '/cases', icon: Search },
  { name: 'AI Copilot', href: '/copilot', icon: Bot },
];

const bottomNavigation = [
  { name: '設定', href: '/settings', icon: Settings },
  { name: 'ヘルプ', href: '/help', icon: HelpCircle },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-slate-900">HR Operations</h1>
            <p className="text-xs text-slate-500">Copilot</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-brand-50 text-brand-700 border border-brand-200'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="px-3 py-4 border-t border-slate-200 space-y-1">
        {bottomNavigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all duration-150"
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* User */}
      <div className="px-3 py-4 border-t border-slate-200">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-slate-600">佐</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">佐藤 良太</p>
            <p className="text-xs text-slate-500 truncate">人事労務担当</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

