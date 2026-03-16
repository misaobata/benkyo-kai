import { useState } from 'react';
import {
  FileCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronRight,
  Filter,
  Download,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from 'lucide-react';

interface PayrollItem {
  id: number;
  employeeId: string;
  name: string;
  department: string;
  previousSalary: number;
  currentSalary: number;
  difference: number;
  status: 'normal' | 'warning' | 'error';
  flags: string[];
  lastComment?: string;
}

const payrollData: PayrollItem[] = [
  {
    id: 1,
    employeeId: 'EMP001',
    name: '山田 太郎',
    department: '営業部',
    previousSalary: 450000,
    currentSalary: 465000,
    difference: 15000,
    status: 'normal',
    flags: ['昇給'],
  },
  {
    id: 2,
    employeeId: 'EMP002',
    name: '鈴木 花子',
    department: '開発部',
    previousSalary: 520000,
    currentSalary: 520000,
    difference: 0,
    status: 'normal',
    flags: [],
  },
  {
    id: 3,
    employeeId: 'EMP003',
    name: '田中 一郎',
    department: '管理部',
    previousSalary: 380000,
    currentSalary: 428000,
    difference: 48000,
    status: 'warning',
    flags: ['大幅変動', '役職手当追加'],
    lastComment: '課長昇進に伴う給与改定',
  },
  {
    id: 4,
    employeeId: 'EMP004',
    name: '佐々木 美咲',
    department: '企画部',
    previousSalary: 410000,
    currentSalary: 410000,
    difference: 0,
    status: 'normal',
    flags: [],
  },
  {
    id: 5,
    employeeId: 'EMP005',
    name: '高橋 健太',
    department: '製造部',
    previousSalary: 350000,
    currentSalary: 420000,
    difference: 70000,
    status: 'error',
    flags: ['異常値検知', '会社ルール違反の可能性'],
  },
  {
    id: 6,
    employeeId: 'EMP006',
    name: '渡辺 優子',
    department: '営業部',
    previousSalary: 480000,
    currentSalary: 456000,
    difference: -24000,
    status: 'warning',
    flags: ['減額', '時短勤務変更'],
    lastComment: '育休復帰後の時短勤務移行',
  },
  {
    id: 7,
    employeeId: 'EMP007',
    name: '伊藤 大輔',
    department: '開発部',
    previousSalary: 580000,
    currentSalary: 595000,
    difference: 15000,
    status: 'normal',
    flags: ['定期昇給'],
  },
];

const companyRules = [
  { id: 1, rule: '月額給与変動が10%を超える場合は要確認', status: 'warning', count: 2 },
  { id: 2, rule: '残業代が基本給の30%を超える場合は要確認', status: 'normal', count: 0 },
  { id: 3, rule: '新規手当追加時は承認フロー必須', status: 'normal', count: 1 },
  { id: 4, rule: '等級と給与の整合性チェック', status: 'error', count: 1 },
];

const summaryStats = [
  { label: 'チェック対象', value: '1,024', unit: '名' },
  { label: '正常', value: '1,018', unit: '名', color: 'text-emerald-600' },
  { label: '要確認', value: '5', unit: '名', color: 'text-amber-600' },
  { label: '異常', value: '1', unit: '名', color: 'text-red-600' },
];

export default function PayrollCheck() {
  const [selectedItem, setSelectedItem] = useState<PayrollItem | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredData =
    filterStatus === 'all'
      ? payrollData
      : payrollData.filter((item) => item.status === filterStatus);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">給与チェック</h1>
          <p className="mt-1 text-sm text-slate-500">
            先月との差分を確認し、異常値を検知します
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="badge-blue">
            <Clock className="w-3 h-3 mr-1" />
            2026年3月分
          </span>
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            レポート出力
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryStats.map((stat) => (
          <div key={stat.label} className="card p-5">
            <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-semibold ${stat.color || 'text-slate-900'}`}>
                {stat.value}
              </span>
              <span className="text-sm text-slate-500">{stat.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 給与チェックリスト */}
        <div className="lg:col-span-2 space-y-4">
          {/* フィルター */}
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900"
                >
                  <Filter className="w-4 h-4" />
                  フィルター
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      showFilters ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  すべて
                </button>
                <button
                  onClick={() => setFilterStatus('warning')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === 'warning'
                      ? 'bg-amber-500 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  要確認
                </button>
                <button
                  onClick={() => setFilterStatus('error')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === 'error'
                      ? 'bg-red-500 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  異常
                </button>
              </div>
            </div>
          </div>

          {/* リスト */}
          <div className="card divide-y divide-slate-200">
            {filteredData.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`p-4 cursor-pointer transition-colors hover:bg-slate-50 ${
                  selectedItem?.id === item.id ? 'bg-brand-50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        item.status === 'error'
                          ? 'bg-red-100'
                          : item.status === 'warning'
                          ? 'bg-amber-100'
                          : 'bg-emerald-100'
                      }`}
                    >
                      {item.status === 'error' ? (
                        <XCircle className="w-5 h-5 text-red-600" />
                      ) : item.status === 'warning' ? (
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900">{item.name}</span>
                        <span className="text-xs text-slate-500">{item.employeeId}</span>
                      </div>
                      <p className="text-sm text-slate-500">{item.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-slate-500">差分</p>
                      <div className="flex items-center gap-1">
                        {item.difference > 0 ? (
                          <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                        ) : item.difference < 0 ? (
                          <ArrowDownRight className="w-4 h-4 text-red-600" />
                        ) : null}
                        <span
                          className={`font-medium ${
                            item.difference > 0
                              ? 'text-emerald-600'
                              : item.difference < 0
                              ? 'text-red-600'
                              : 'text-slate-600'
                          }`}
                        >
                          {item.difference > 0 ? '+' : ''}
                          {formatCurrency(item.difference)}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
                {item.flags.length > 0 && (
                  <div className="mt-3 flex items-center gap-2">
                    {item.flags.map((flag, index) => (
                      <span
                        key={index}
                        className={`text-xs px-2 py-1 rounded-full ${
                          flag.includes('異常') || flag.includes('違反')
                            ? 'bg-red-100 text-red-700'
                            : flag.includes('大幅') || flag.includes('減額')
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {flag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* サイドパネル */}
        <div className="space-y-6">
          {/* 会社ルールチェック */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileCheck className="w-5 h-5 text-brand-500" />
              <h3 className="text-lg font-medium text-slate-900">会社ルールチェック</h3>
            </div>
            <div className="space-y-3">
              {companyRules.map((rule) => (
                <div
                  key={rule.id}
                  className={`p-3 rounded-lg border ${
                    rule.status === 'error'
                      ? 'bg-red-50 border-red-200'
                      : rule.status === 'warning'
                      ? 'bg-amber-50 border-amber-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm text-slate-700">{rule.rule}</p>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${
                        rule.status === 'error'
                          ? 'bg-red-100 text-red-700'
                          : rule.status === 'warning'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {rule.count}件
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 選択された項目の詳細 */}
          {selectedItem && (
            <div className="card p-6 border-brand-200 animate-slide-in-right">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-slate-900">詳細情報</h3>
                <button className="text-slate-400 hover:text-slate-600">
                  <MessageSquare className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500">社員情報</p>
                  <p className="font-medium text-slate-900">{selectedItem.name}</p>
                  <p className="text-sm text-slate-600">{selectedItem.department}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">前月給与</p>
                    <p className="font-medium text-slate-900">
                      {formatCurrency(selectedItem.previousSalary)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">今月給与</p>
                    <p className="font-medium text-slate-900">
                      {formatCurrency(selectedItem.currentSalary)}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-500">変動率</p>
                  <p
                    className={`font-medium ${
                      selectedItem.difference > 0
                        ? 'text-emerald-600'
                        : selectedItem.difference < 0
                        ? 'text-red-600'
                        : 'text-slate-900'
                    }`}
                  >
                    {((selectedItem.difference / selectedItem.previousSalary) * 100).toFixed(1)}%
                  </p>
                </div>
                {selectedItem.lastComment && (
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-500 mb-1">コメント</p>
                    <p className="text-sm text-slate-700">{selectedItem.lastComment}</p>
                  </div>
                )}
                <button className="w-full btn-secondary flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  コメントを追加
                </button>
              </div>
            </div>
          )}

          {/* AI分析 */}
          <div className="card p-6 border-brand-200 bg-gradient-to-br from-brand-50 to-white">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-brand-500" />
              <h3 className="text-lg font-medium text-slate-900">AI分析</h3>
            </div>
            <div className="space-y-3 text-sm text-slate-700">
              <p>
                今月の給与データを分析した結果、1件の異常値と5件の要確認項目を検出しました。
              </p>
              <p>
                特に<span className="font-medium text-slate-900">高橋 健太</span>さんの給与変動（+20%）は、
                通常の昇給範囲を超えています。等級との整合性を確認してください。
              </p>
            </div>
            <button className="mt-4 text-sm text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
              詳細分析を見る
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

