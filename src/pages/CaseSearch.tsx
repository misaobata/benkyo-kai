import { useState } from 'react';
import {
  Search,
  FileText,
  Clock,
  Tag,
  ChevronRight,
  BookOpen,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Filter,
  Calendar,
} from 'lucide-react';

interface CaseItem {
  id: number;
  title: string;
  category: string;
  date: string;
  summary: string;
  tags: string[];
  relevance: number;
  hasPolicy: boolean;
}

interface PolicyItem {
  id: number;
  title: string;
  category: string;
  lastUpdated: string;
  section: string;
}

const searchSuggestions = [
  '育休復帰後の時短勤務',
  '中途入社の等級決定',
  '退職金計算',
  '海外赴任手当',
  '副業許可申請',
];

const recentSearches = [
  '産休・育休',
  '昇格基準',
  '異動',
];

const sampleCases: CaseItem[] = [
  {
    id: 1,
    title: '育児休業復帰後の時短勤務移行ケース',
    category: '勤怠・休暇',
    date: '2025/11/15',
    summary: '育児休業から復帰した社員が時短勤務へ移行する際の給与計算、社会保険料、各種手当の取り扱いについて対応した事例。',
    tags: ['育休', '時短勤務', '給与変更'],
    relevance: 95,
    hasPolicy: true,
  },
  {
    id: 2,
    title: '中途入社者の初期等級決定プロセス',
    category: '採用・等級',
    date: '2025/10/22',
    summary: '前職の経験を考慮した中途入社者の等級決定について、基準と例外対応を行った事例。',
    tags: ['中途採用', '等級', '評価'],
    relevance: 88,
    hasPolicy: true,
  },
  {
    id: 3,
    title: '組織変更に伴う部門統合と人員再配置',
    category: '組織変更',
    date: '2025/09/05',
    summary: '部門統合に伴い、複数部署の社員を再配置した際の対応プロセスと留意点。',
    tags: ['組織変更', '人員配置', '部門統合'],
    relevance: 76,
    hasPolicy: false,
  },
  {
    id: 4,
    title: '海外赴任者の給与・手当設計',
    category: '報酬',
    date: '2025/08/18',
    summary: '海外赴任者への特別手当、税金、社会保険の取り扱いに関する対応事例。',
    tags: ['海外赴任', '手当', '税金'],
    relevance: 72,
    hasPolicy: true,
  },
];

const relatedPolicies: PolicyItem[] = [
  {
    id: 1,
    title: '育児・介護休業規程',
    category: '就業規則',
    lastUpdated: '2025/04/01',
    section: '第3章 育児休業',
  },
  {
    id: 2,
    title: '短時間勤務規程',
    category: '就業規則',
    lastUpdated: '2025/04/01',
    section: '第2条 適用対象',
  },
  {
    id: 3,
    title: '給与規程',
    category: '賃金規程',
    lastUpdated: '2026/01/01',
    section: '第15条 時間短縮者の取扱い',
  },
];

const responseHistory = [
  {
    id: 1,
    date: '2025/11/15',
    action: '時短勤務申請受理',
    user: '佐藤 良太',
    note: '産休明けの時短勤務申請を受理。給与改定手続きを開始。',
  },
  {
    id: 2,
    date: '2025/11/18',
    action: '給与計算変更',
    user: '田中 美咲',
    note: '基本給を75%に変更。各種手当を再計算。',
  },
  {
    id: 3,
    date: '2025/11/20',
    action: '社会保険手続き',
    user: '佐藤 良太',
    note: '標準報酬月額の改定届を提出。',
  },
];

export default function CaseSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowResults(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">過去事例検索</h1>
          <p className="mt-1 text-sm text-slate-500">
            過去の対応事例や関連規程を検索できます
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="card p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="事例を検索... (例: 育休復帰、昇格基準、退職金計算)"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-lg"
            />
          </div>
          <button onClick={handleSearch} className="btn-primary px-6 py-3">
            検索
          </button>
        </div>

        {/* Search Suggestions */}
        {!showResults && (
          <div className="mt-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock className="w-4 h-4" />
                最近の検索
              </div>
              <div className="flex items-center gap-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(search);
                      setShowResults(true);
                    }}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-sm text-slate-700 transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Sparkles className="w-4 h-4 text-brand-500" />
                おすすめ
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setShowResults(true);
                    }}
                    className="px-3 py-1.5 bg-brand-50 hover:bg-brand-100 rounded-full text-sm text-brand-700 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Section */}
      {showResults && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 検索結果 */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                <span className="font-medium text-slate-900">{sampleCases.length}件</span>
                の事例が見つかりました
              </p>
              <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
                <Filter className="w-4 h-4" />
                フィルター
              </button>
            </div>

            <div className="space-y-4">
              {sampleCases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  onClick={() => setSelectedCase(caseItem)}
                  className={`card p-5 cursor-pointer transition-all hover:shadow-md ${
                    selectedCase?.id === caseItem.id
                      ? 'border-brand-300 bg-brand-50'
                      : 'hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="badge-blue">{caseItem.category}</span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {caseItem.date}
                        </span>
                      </div>
                      <h3 className="font-medium text-slate-900 mb-2">
                        {caseItem.title}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {caseItem.summary}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        {caseItem.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full"
                          >
                            <Tag className="w-3 h-3 inline mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-1">
                        <Sparkles className="w-4 h-4 text-brand-500" />
                        <span className="text-sm font-medium text-brand-600">
                          {caseItem.relevance}%
                        </span>
                      </div>
                      {caseItem.hasPolicy && (
                        <span className="text-xs text-emerald-600 flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          規程あり
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* サイドパネル */}
          <div className="space-y-6">
            {/* 関連規程 */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-brand-500" />
                <h3 className="text-lg font-medium text-slate-900">関連規程</h3>
              </div>
              <div className="space-y-3">
                {relatedPolicies.map((policy) => (
                  <div
                    key={policy.id}
                    className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {policy.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {policy.section}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 対応履歴 */}
            {selectedCase && (
              <div className="card p-6 animate-slide-in-right">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-brand-500" />
                  <h3 className="text-lg font-medium text-slate-900">対応履歴</h3>
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200" />
                  <div className="space-y-4">
                    {responseHistory.map((item, index) => (
                      <div key={item.id} className="relative pl-10">
                        <div
                          className={`absolute left-2.5 w-3 h-3 rounded-full ${
                            index === 0 ? 'bg-brand-500' : 'bg-slate-300'
                          }`}
                        />
                        <div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                            <span>{item.date}</span>
                            <span>·</span>
                            <span>{item.user}</span>
                          </div>
                          <p className="text-sm font-medium text-slate-900">
                            {item.action}
                          </p>
                          <p className="text-sm text-slate-600 mt-1">{item.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* AI提案 */}
            <div className="card p-6 border-brand-200 bg-gradient-to-br from-brand-50 to-white">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-brand-500" />
                <h3 className="text-lg font-medium text-slate-900">AI類似事例分析</h3>
              </div>
              <p className="text-sm text-slate-700 mb-4">
                検索キーワードに基づき、最も関連性の高い事例を表示しています。
                類似ケースのパターンから、以下の点に留意することをお勧めします：
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 flex-shrink-0" />
                  時短勤務移行時は社会保険の標準報酬月額改定が必要
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 flex-shrink-0" />
                  各種手当の再計算と本人への説明
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 flex-shrink-0" />
                  関連規程への参照を記録として残す
                </li>
              </ul>
              <button className="mt-4 text-sm text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
                AIに詳しく聞く
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

