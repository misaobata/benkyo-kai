import {
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

// サンプルデータ
const headcountData = [
  { month: '4月', count: 980 },
  { month: '5月', count: 985 },
  { month: '6月', count: 990 },
  { month: '7月', count: 995 },
  { month: '8月', count: 1000 },
  { month: '9月', count: 1005 },
  { month: '10月', count: 1012 },
  { month: '11月', count: 1018 },
  { month: '12月', count: 1024 },
];

const hrCostData = [
  { month: '4月', actual: 450, forecast: null },
  { month: '5月', actual: 455, forecast: null },
  { month: '6月', actual: 460, forecast: null },
  { month: '7月', actual: 468, forecast: null },
  { month: '8月', actual: 475, forecast: null },
  { month: '9月', actual: 480, forecast: null },
  { month: '10月', actual: null, forecast: 488 },
  { month: '11月', actual: null, forecast: 495 },
  { month: '12月', actual: null, forecast: 502 },
];

const departmentCostData = [
  { name: '営業部', cost: 120 },
  { name: '開発部', cost: 150 },
  { name: '管理部', cost: 80 },
  { name: '企画部', cost: 65 },
  { name: '製造部', cost: 95 },
];

const aiAlerts = [
  {
    id: 1,
    type: 'warning',
    title: '人件費予算超過の可能性',
    description: '現在のペースでは来月の人件費が予算を2.3%超過する見込みです',
    action: 'シミュレーションを確認',
  },
  {
    id: 2,
    type: 'info',
    title: '給与チェック完了',
    description: '今月の給与チェックが完了しました。異常値は3件検出されています',
    action: '詳細を確認',
  },
  {
    id: 3,
    type: 'success',
    title: '社会保険料率更新',
    description: '2026年度の社会保険料率が自動更新されました',
    action: '変更内容を確認',
  },
];

const kpiCards = [
  {
    title: '総従業員数',
    value: '1,024',
    unit: '名',
    change: '+12',
    changeType: 'positive' as const,
    icon: Users,
    description: '前月比',
  },
  {
    title: '月間人件費',
    value: '4.8',
    unit: '億円',
    change: '+3.2%',
    changeType: 'neutral' as const,
    icon: DollarSign,
    description: '前月比',
  },
  {
    title: '年間人件費予測',
    value: '58.2',
    unit: '億円',
    change: '+5.1%',
    changeType: 'warning' as const,
    icon: TrendingUp,
    description: '予算比',
  },
  {
    title: 'AIアラート',
    value: '3',
    unit: '件',
    change: '-2',
    changeType: 'positive' as const,
    icon: AlertTriangle,
    description: '前週比',
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">ダッシュボード</h1>
          <p className="mt-1 text-sm text-slate-500">
            人事データの全体状況を確認できます
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">最終更新: 2026/03/16 10:30</span>
          <button className="btn-primary flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            AIレポート生成
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => (
          <div
            key={kpi.title}
            className={`card p-6 animate-slide-up animate-stagger-${index + 1}`}
            style={{ animationFillMode: 'backwards' }}
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <kpi.icon className="w-5 h-5 text-slate-600" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  kpi.changeType === 'positive'
                    ? 'text-emerald-600'
                    : kpi.changeType === 'warning'
                    ? 'text-amber-600'
                    : 'text-slate-600'
                }`}
              >
                {kpi.changeType === 'positive' ? (
                  <ArrowDownRight className="w-4 h-4" />
                ) : kpi.changeType === 'warning' ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : null}
                {kpi.change}
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-semibold text-slate-900">{kpi.value}</span>
                <span className="text-lg text-slate-500">{kpi.unit}</span>
              </div>
              <p className="mt-1 text-sm text-slate-500">{kpi.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 社員数推移 */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium text-slate-900">社員数推移</h3>
              <p className="text-sm text-slate-500">過去9ヶ月の従業員数の推移</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={headcountData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <YAxis
                  domain={['dataMin - 20', 'dataMax + 20']}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#colorCount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 人件費予測 */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium text-slate-900">人件費予測</h3>
              <p className="text-sm text-slate-500">実績と予測（単位: 百万円）</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-500" />
                <span className="text-slate-600">実績</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-300" />
                <span className="text-slate-600">予測</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hrCostData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <YAxis
                  domain={[440, 510]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  connectNulls={false}
                />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#94a3b8', strokeWidth: 2, r: 4 }}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 部門別人件費 */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium text-slate-900">部門別人件費</h3>
              <p className="text-sm text-slate-500">月間（単位: 百万円）</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentCostData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={true} vertical={false} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  width={60}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Bar dataKey="cost" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AIアラート */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-500" />
              <h3 className="text-lg font-medium text-slate-900">AIアラート</h3>
            </div>
            <button className="text-sm text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
              すべて表示
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {aiAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-start gap-4 p-4 rounded-lg border ${
                  alert.type === 'warning'
                    ? 'bg-amber-50 border-amber-200'
                    : alert.type === 'info'
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-emerald-50 border-emerald-200'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    alert.type === 'warning'
                      ? 'bg-amber-100'
                      : alert.type === 'info'
                      ? 'bg-blue-100'
                      : 'bg-emerald-100'
                  }`}
                >
                  <Sparkles
                    className={`w-4 h-4 ${
                      alert.type === 'warning'
                        ? 'text-amber-600'
                        : alert.type === 'info'
                        ? 'text-blue-600'
                        : 'text-emerald-600'
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-slate-900">{alert.title}</h4>
                  <p className="mt-1 text-sm text-slate-600">{alert.description}</p>
                </div>
                <button
                  className={`text-sm font-medium flex-shrink-0 ${
                    alert.type === 'warning'
                      ? 'text-amber-700 hover:text-amber-800'
                      : alert.type === 'info'
                      ? 'text-blue-700 hover:text-blue-800'
                      : 'text-emerald-700 hover:text-emerald-800'
                  }`}
                >
                  {alert.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

