import { useState } from 'react';
import {
  Calculator,
  Play,
  RotateCcw,
  Download,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  ChevronRight,
  Info,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// シミュレーション結果データ
const baseData = [
  { month: '4月', base: 480, simulated: 480 },
  { month: '5月', base: 482, simulated: 482 },
  { month: '6月', base: 485, simulated: 485 },
  { month: '7月', base: 488, simulated: 488 },
  { month: '8月', base: 490, simulated: 490 },
  { month: '9月', base: 492, simulated: 492 },
  { month: '10月', base: 495, simulated: 495 },
  { month: '11月', base: 498, simulated: 498 },
  { month: '12月', base: 500, simulated: 500 },
  { month: '1月', base: 502, simulated: 502 },
  { month: '2月', base: 505, simulated: 505 },
  { month: '3月', base: 508, simulated: 508 },
];

interface SimulationParams {
  salaryIncrease: number;
  newHires: number;
  attrition: number;
  insuranceChange: number;
  bonusChange: number;
}

export default function HRCostSimulation() {
  const [params, setParams] = useState<SimulationParams>({
    salaryIncrease: 2.5,
    newHires: 50,
    attrition: 30,
    insuranceChange: 0.3,
    bonusChange: 0,
  });

  const [hasSimulated, setHasSimulated] = useState(false);

  // シミュレーション結果を計算
  const calculateSimulation = () => {
    const multiplier =
      1 +
      params.salaryIncrease / 100 +
      params.insuranceChange / 100 +
      params.bonusChange / 100;
    const hireCost = (params.newHires * 6) / 12; // 1人あたり月6百万円想定
    const attritionSaving = (params.attrition * 5) / 12;

    return baseData.map((item, index) => ({
      ...item,
      simulated: Math.round(
        item.base * (1 + (multiplier - 1) * ((index + 1) / 12)) +
          (hireCost - attritionSaving) * ((index + 1) / 12)
      ),
    }));
  };

  const simulatedData = hasSimulated ? calculateSimulation() : baseData;

  // 年間コスト計算
  const baseAnnualCost = baseData.reduce((sum, item) => sum + item.base, 0);
  const simulatedAnnualCost = simulatedData.reduce(
    (sum, item) => sum + item.simulated,
    0
  );
  const costDifference = simulatedAnnualCost - baseAnnualCost;
  const costChangePercent = ((costDifference / baseAnnualCost) * 100).toFixed(1);

  const handleSimulate = () => {
    setHasSimulated(true);
  };

  const handleReset = () => {
    setParams({
      salaryIncrease: 2.5,
      newHires: 50,
      attrition: 30,
      insuranceChange: 0.3,
      bonusChange: 0,
    });
    setHasSimulated(false);
  };

  const aiSuggestions = [
    '昇給率を2.0%に抑えることで、年間約12百万円のコスト削減が見込めます',
    '採用計画を分散させることで、月次キャッシュフローの安定化が期待できます',
    '社会保険料率の改定は6月に予定されています。シミュレーションに反映済みです',
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            人件費シミュレーション
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            条件を変更して人件費の影響をシミュレーションできます
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="btn-secondary flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            リセット
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            エクスポート
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* シミュレーション条件 */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-6">
            <Calculator className="w-5 h-5 text-brand-500" />
            <h2 className="text-lg font-medium text-slate-900">
              シミュレーション条件
            </h2>
          </div>

          <div className="space-y-6">
            {/* 昇給率 */}
            <div>
              <label className="flex items-center justify-between text-sm font-medium text-slate-700 mb-2">
                <span>昇給率</span>
                <span className="text-brand-600">{params.salaryIncrease}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={params.salaryIncrease}
                onChange={(e) =>
                  setParams({ ...params, salaryIncrease: parseFloat(e.target.value) })
                }
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>0%</span>
                <span>10%</span>
              </div>
            </div>

            {/* 新規採用人数 */}
            <div>
              <label className="flex items-center justify-between text-sm font-medium text-slate-700 mb-2">
                <span>新規採用人数（年間）</span>
                <span className="text-brand-600">{params.newHires}名</span>
              </label>
              <input
                type="range"
                min="0"
                max="200"
                step="5"
                value={params.newHires}
                onChange={(e) =>
                  setParams({ ...params, newHires: parseInt(e.target.value) })
                }
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>0名</span>
                <span>200名</span>
              </div>
            </div>

            {/* 退職予定人数 */}
            <div>
              <label className="flex items-center justify-between text-sm font-medium text-slate-700 mb-2">
                <span>退職予定人数（年間）</span>
                <span className="text-brand-600">{params.attrition}名</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={params.attrition}
                onChange={(e) =>
                  setParams({ ...params, attrition: parseInt(e.target.value) })
                }
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>0名</span>
                <span>100名</span>
              </div>
            </div>

            {/* 社会保険料率変更 */}
            <div>
              <label className="flex items-center justify-between text-sm font-medium text-slate-700 mb-2">
                <span>社会保険料率変更</span>
                <span className="text-brand-600">{params.insuranceChange > 0 ? '+' : ''}{params.insuranceChange}%</span>
              </label>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.1"
                value={params.insuranceChange}
                onChange={(e) =>
                  setParams({
                    ...params,
                    insuranceChange: parseFloat(e.target.value),
                  })
                }
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>-2%</span>
                <span>+2%</span>
              </div>
            </div>

            {/* 賞与変更率 */}
            <div>
              <label className="flex items-center justify-between text-sm font-medium text-slate-700 mb-2">
                <span>賞与変更率</span>
                <span className="text-brand-600">{params.bonusChange > 0 ? '+' : ''}{params.bonusChange}%</span>
              </label>
              <input
                type="range"
                min="-20"
                max="20"
                step="1"
                value={params.bonusChange}
                onChange={(e) =>
                  setParams({ ...params, bonusChange: parseInt(e.target.value) })
                }
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>-20%</span>
                <span>+20%</span>
              </div>
            </div>

            <button
              onClick={handleSimulate}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              シミュレーション実行
            </button>
          </div>
        </div>

        {/* シミュレーション結果 */}
        <div className="lg:col-span-2 space-y-6">
          {/* サマリーカード */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card p-6">
              <p className="text-sm text-slate-500 mb-1">現行プラン年間コスト</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-semibold text-slate-900">
                  {(baseAnnualCost / 100).toFixed(1)}
                </span>
                <span className="text-sm text-slate-500">億円</span>
              </div>
            </div>

            <div className="card p-6 border-brand-200 bg-brand-50">
              <p className="text-sm text-brand-600 mb-1">
                シミュレーション年間コスト
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-semibold text-brand-700">
                  {(simulatedAnnualCost / 100).toFixed(1)}
                </span>
                <span className="text-sm text-brand-500">億円</span>
              </div>
            </div>

            <div
              className={`card p-6 ${
                costDifference > 0
                  ? 'border-amber-200 bg-amber-50'
                  : costDifference < 0
                  ? 'border-emerald-200 bg-emerald-50'
                  : ''
              }`}
            >
              <p
                className={`text-sm mb-1 ${
                  costDifference > 0
                    ? 'text-amber-600'
                    : costDifference < 0
                    ? 'text-emerald-600'
                    : 'text-slate-500'
                }`}
              >
                コスト変動
              </p>
              <div className="flex items-center gap-2">
                {costDifference > 0 ? (
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                ) : costDifference < 0 ? (
                  <TrendingDown className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Minus className="w-5 h-5 text-slate-400" />
                )}
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-2xl font-semibold ${
                      costDifference > 0
                        ? 'text-amber-700'
                        : costDifference < 0
                        ? 'text-emerald-700'
                        : 'text-slate-900'
                    }`}
                  >
                    {costDifference > 0 ? '+' : ''}
                    {costChangePercent}
                  </span>
                  <span
                    className={`text-sm ${
                      costDifference > 0
                        ? 'text-amber-500'
                        : costDifference < 0
                        ? 'text-emerald-500'
                        : 'text-slate-500'
                    }`}
                  >
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* グラフ */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium text-slate-900">
                  月次人件費推移
                </h3>
                <p className="text-sm text-slate-500">単位: 百万円</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-400" />
                  <span className="text-slate-600">現行プラン</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-brand-500" />
                  <span className="text-slate-600">シミュレーション</span>
                </div>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={simulatedData}>
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
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="base"
                    name="現行プラン"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    dot={{ fill: '#94a3b8', strokeWidth: 2, r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="simulated"
                    name="シミュレーション"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI提案 */}
          <div className="card p-6 border-brand-200 bg-gradient-to-br from-brand-50 to-white">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-brand-500" />
              <h3 className="text-lg font-medium text-slate-900">AI分析・提案</h3>
            </div>
            <ul className="space-y-3">
              {aiSuggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-700">{suggestion}</span>
                </li>
              ))}
            </ul>
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

