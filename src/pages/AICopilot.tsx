import { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  FileText,
  BarChart3,
  Search,
  ChevronRight,
  User,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  TrendingUp,
  Calculator,
} from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: Source[];
  actions?: Action[];
}

interface Source {
  title: string;
  type: 'data' | 'policy' | 'case';
}

interface Action {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const quickActions = [
  { label: '人件費が増加している理由は？', icon: TrendingUp },
  { label: '類似事例を検索', icon: Search },
  { label: '経営レポートを生成', icon: FileText },
  { label: '人員計画シミュレーション', icon: Calculator },
];

const suggestedQuestions = [
  '来期の人件費予算はどのくらいが適正ですか？',
  '今月の給与チェックで異常値はありますか？',
  '退職率が高い部門はどこですか？',
  '昇給率の業界平均と比較してください',
];

const initialMessages: Message[] = [
  {
    id: 1,
    type: 'assistant',
    content: 'こんにちは、HR Operations Copilotです。人件費シミュレーション、給与チェック、過去事例検索など、人事労務に関する判断を支援します。\n\n何かお手伝いできることはありますか？',
    timestamp: new Date(),
    actions: [
      { label: 'ダッシュボードを見る', icon: BarChart3 },
      { label: '過去事例を検索', icon: Search },
    ],
  },
];

export default function AICopilot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: generateResponse(inputValue),
        timestamp: new Date(),
        sources: [
          { title: '人件費データ (2026年3月)', type: 'data' },
          { title: '給与規程 第15条', type: 'policy' },
          { title: '類似事例: 部門統合2025', type: 'case' },
        ],
        actions: [
          { label: '詳細データを見る', icon: BarChart3 },
          { label: 'レポート生成', icon: FileText },
        ],
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (query: string): string => {
    if (query.includes('人件費') && (query.includes('増加') || query.includes('理由'))) {
      return `人件費増加の主な要因を分析しました：

**1. 人員増加 (+3.2%)**
- 新規採用: 45名（計画比+5名）
- 退職: 33名（前年同期比-8名）
- 純増: 12名

**2. 昇給・昇格 (+2.1%)**
- 定期昇給: 平均2.5%
- 昇格者: 28名
- 役職手当増加: 840万円

**3. 残業代増加 (+0.8%)**
- 開発部門で残業時間が15%増加
- プロジェクト繁忙期の影響

**総合評価**: 
人件費増加は主に計画通りの人員増と定期昇給によるものです。予算に対しては+1.2%の乖離がありますが、許容範囲内と考えられます。`;
    }

    if (query.includes('類似事例') || query.includes('検索')) {
      return `関連する過去事例を3件見つけました：

**1. 育児休業復帰後の時短勤務移行** (2025/11)
関連度: 95% | カテゴリ: 勤怠・休暇
→ 給与計算、社会保険の取り扱いについて参照できます

**2. 中途入社者の初期等級決定** (2025/10)
関連度: 88% | カテゴリ: 採用・等級
→ 等級決定の基準と例外対応を参照できます

**3. 部門統合に伴う人員再配置** (2025/09)
関連度: 76% | カテゴリ: 組織変更
→ 統合プロセスと留意点を参照できます

詳細を確認しますか？`;
    }

    if (query.includes('レポート') || query.includes('生成')) {
      return `経営レポートを生成する準備ができました。

**レポート内容プレビュー:**

📊 **人件費サマリー**
- 月間人件費: 4.8億円
- 前月比: +3.2%
- 予算消化率: 78.5%

👥 **人員動向**
- 総従業員数: 1,024名
- 今月入社: 8名
- 今月退職: 2名

⚠️ **注目ポイント**
- 開発部門の残業代が予算を超過
- 3名の昇格に伴う手当変更あり

レポートをPDF/Excelで出力しますか？`;
    }

    return `ご質問を承りました。

関連するデータを分析中です。以下の観点から回答を準備しています：

- 現在のHRデータの確認
- 関連する社内規程の参照
- 類似の過去事例の検索

より具体的な質問をいただければ、詳細な分析結果をお伝えできます。

例えば：
- 「今月の人件費が予算を超えている理由は？」
- 「育休復帰者の給与計算について教えて」
- 「来期の採用計画シミュレーションをして」`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
            <Bot className="w-7 h-7 text-brand-500" />
            AI Copilot
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            人事労務の判断を支援するAIアシスタント
          </p>
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <RotateCcw className="w-4 h-4" />
          会話をリセット
        </button>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto card p-6 mb-4">
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${
                    message.type === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user'
                        ? 'bg-slate-200'
                        : 'bg-gradient-to-br from-brand-500 to-brand-700'
                    }`}
                  >
                    {message.type === 'user' ? (
                      <User className="w-5 h-5 text-slate-600" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div
                    className={`flex-1 max-w-[80%] ${
                      message.type === 'user' ? 'text-right' : ''
                    }`}
                  >
                    <div
                      className={`inline-block text-left p-4 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-brand-600 text-white'
                          : 'bg-slate-100 text-slate-900'
                      }`}
                    >
                      <div className="text-sm whitespace-pre-wrap leading-relaxed">
                        {message.content.split('\n').map((line, i) => (
                          <p key={i} className={line.startsWith('**') ? 'font-semibold mt-2 first:mt-0' : ''}>
                            {line.replace(/\*\*/g, '')}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Sources */}
                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.sources.map((source, index) => (
                          <span
                            key={index}
                            className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                              source.type === 'data'
                                ? 'bg-blue-100 text-blue-700'
                                : source.type === 'policy'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-amber-100 text-amber-700'
                            }`}
                          >
                            {source.type === 'data' ? (
                              <BarChart3 className="w-3 h-3" />
                            ) : source.type === 'policy' ? (
                              <FileText className="w-3 h-3" />
                            ) : (
                              <Search className="w-3 h-3" />
                            )}
                            {source.title}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    {message.actions && message.actions.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.actions.map((action, index) => (
                          <button
                            key={index}
                            className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 flex items-center gap-1 transition-colors"
                          >
                            <action.icon className="w-3 h-3" />
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Feedback buttons for AI messages */}
                    {message.type === 'assistant' && message.id > 1 && (
                      <div className="mt-2 flex items-center gap-2">
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                          <ThumbsDown className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-brand-500 to-brand-700">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-slate-100 rounded-2xl p-4">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="card p-4">
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mb-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.label)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm text-slate-700 transition-colors"
                >
                  <action.icon className="w-4 h-4 text-brand-500" />
                  {action.label}
                </button>
              ))}
            </div>

            <div className="flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="質問を入力してください..."
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 resize-none"
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="btn-primary p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 flex-shrink-0 space-y-4">
          {/* Suggested Questions */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-brand-500" />
              <h3 className="font-medium text-slate-900">おすすめの質問</h3>
            </div>
            <div className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(question)}
                  className="w-full text-left p-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-sm text-slate-700 transition-colors flex items-center justify-between group"
                >
                  <span>{question}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                </button>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          <div className="card p-5">
            <h3 className="font-medium text-slate-900 mb-4">できること</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">データ分析</p>
                  <p className="text-xs text-slate-500">HRデータを分析し、傾向やインサイトを提供</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">レポート生成</p>
                  <p className="text-xs text-slate-500">経営向けレポートを自動生成</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Search className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">事例検索</p>
                  <p className="text-xs text-slate-500">過去の対応事例から類似ケースを検索</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Calculator className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">シミュレーション</p>
                  <p className="text-xs text-slate-500">人件費や人員計画のシミュレーション</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

