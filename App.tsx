import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ScatterChart, Scatter, ZAxis, Cell
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, TrendingUp, BarChart3, Search, MessageSquare, 
  DollarSign, Award, Users, AlertCircle, ChevronRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { MOVIE_DATA, TIME_SERIES_DATA, SENTIMENT_DATA, KEYWORDS } from './data';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Card = ({ children, className, title }: { children: React.ReactNode, className?: string, title?: string }) => (
  <div className={cn("bg-[#14213D] border border-[#C9A84C]/20 rounded-xl p-6 shadow-xl", className)}>
    {title && <h3 className="text-[#C9A84C] font-serif italic text-sm uppercase tracking-wider mb-4">{title}</h3>}
    {children}
  </div>
);

const StatCard = ({ label, value, subValue, icon: Icon, color = "#C9A84C" }: any) => (
  <Card className="flex flex-col justify-between">
    <div className="flex justify-between items-start">
      <span className="text-gray-400 text-xs font-mono uppercase tracking-tighter">{label}</span>
      <Icon size={18} style={{ color }} />
    </div>
    <div className="mt-4">
      <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
      {subValue && <div className="text-xs text-gray-500 mt-1">{subValue}</div>}
    </div>
  </Card>
);

// --- Tabs ---

const OverviewTab = () => {
  const totalAudience = MOVIE_DATA.reduce((acc, m) => acc + m.audience, 0);
  const avgROI = Math.round(MOVIE_DATA.filter(m => m.group === 'A').reduce((acc, m) => acc + m.roi, 0) / 3);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="총 분석 영화" value="7편" subValue="천만 그룹 3편 포함" icon={LayoutDashboard} />
        <StatCard label="누적 관객 합계" value={`${totalAudience.toLocaleString()}만`} subValue="분석 대상 전체" icon={Users} color="#4CAF50" />
        <StatCard label="A그룹 평균 ROI" value={`${avgROI}%`} subValue="최고 2,167% (기생충)" icon={DollarSign} color="#FFD700" />
        <StatCard label="최고 관객 영화" value="명량" subValue="1,756만 명" icon={Award} color="#F44336" />
      </div>

      <Card title="영화별 종합 성과 비교">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400 font-mono text-[10px] uppercase">
                <th className="pb-3 pl-2">영화명</th>
                <th className="pb-3">개봉연도</th>
                <th className="pb-3">그룹</th>
                <th className="pb-3">총 관객</th>
                <th className="pb-3">ROI</th>
                <th className="pb-3">효율</th>
              </tr>
            </thead>
            <tbody className="text-gray-200">
              {MOVIE_DATA.map((movie) => (
                <tr key={movie.id} className={cn(
                  "border-b border-gray-800/50 hover:bg-white/5 transition-colors",
                  movie.group === 'A' ? "text-[#C9A84C]" : ""
                )}>
                  <td className="py-4 pl-2 font-medium">{movie.name}</td>
                  <td className="py-4">{movie.year}</td>
                  <td className="py-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold",
                      movie.group === 'A' ? "bg-[#C9A84C]/20 text-[#C9A84C]" : "bg-gray-700 text-gray-400"
                    )}>
                      {movie.group}그룹
                    </span>
                  </td>
                  <td className="py-4">{movie.audience}만</td>
                  <td className="py-4">{movie.roi}%</td>
                  <td className="py-4">{movie.efficiency}명/회</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-red-900/20 border border-red-900/30">
          <h4 className="text-red-400 font-bold text-xs mb-1">🔴 폭발형</h4>
          <p className="text-gray-400 text-[11px]">명량, 기생충 - 개봉 즉시 1위, 1주차 피크</p>
        </div>
        <div className="p-4 rounded-lg bg-green-900/20 border border-green-900/30">
          <h4 className="text-green-400 font-bold text-xs mb-1">🟢 역주행 장기형</h4>
          <p className="text-gray-400 text-[11px]">왕과 사는 남자 - 2주차 +99% 역주행, 롱런</p>
        </div>
        <div className="p-4 rounded-lg bg-gray-900/20 border border-gray-900/30">
          <h4 className="text-gray-400 font-bold text-xs mb-1">⚫ 단기 소진형</h4>
          <p className="text-gray-400 text-[11px]">헤어질 결심, 남산의 부장들 - 빠른 소진</p>
        </div>
      </div>
    </div>
  );
};

const TrendsTab = () => (
  <div className="space-y-6">
    <Card title="누적 관객수 시계열 추이 (D+N)">
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={TIME_SERIES_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
            <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} tickFormatter={(v) => `D+${v}`} />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#14213D', border: '1px solid #C9A84C', borderRadius: '8px' }}
              itemStyle={{ fontSize: '12px' }}
            />
            <Legend />
            <Line type="monotone" dataKey="myeongryang" name="명량" stroke="#C9A84C" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="parasite" name="기생충" stroke="#C9A84C" strokeWidth={3} dot={false} strokeDasharray="5 5" />
            <Line type="monotone" dataKey="the_kings_garden" name="왕과 사는 남자" stroke="#4CAF50" strokeWidth={4} dot={true} />
            <Line type="monotone" dataKey="sado" name="사도" stroke="#6B7280" strokeWidth={1.5} dot={false} />
            <Line type="monotone" dataKey="the_night_owl" name="올빼미" stroke="#6B7280" strokeWidth={1.5} dot={false} strokeDasharray="3 3" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card title="주차별 관객 증감률 (1주차 vs 2주차)">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOVIE_DATA}>
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} />
              <YAxis stroke="#9ca3af" fontSize={10} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="dropRate" name="증감률 (%)">
                {MOVIE_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.dropRate > 0 ? '#4CAF50' : '#F44336'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[10px] text-gray-500 mt-2 italic">* 왕과 사는 남자: +99.6% 역주행 기록</p>
      </Card>

      <Card title="흥행 패턴 인사이트">
        <ul className="space-y-4 text-sm">
          <li className="flex gap-3">
            <div className="w-1 h-10 bg-[#C9A84C] shrink-0" />
            <div>
              <span className="text-[#C9A84C] font-bold block">폭발형 (명량)</span>
              <span className="text-gray-400 text-xs">개봉 첫날 고속 상승 → 1주차 최고점 → 완만한 하강</span>
            </div>
          </li>
          <li className="flex gap-3">
            <div className="w-1 h-10 bg-[#4CAF50] shrink-0" />
            <div>
              <span className="text-[#4CAF50] font-bold block">역주행 장기형 (왕과 사는 남자)</span>
              <span className="text-gray-400 text-xs">1주차 저조 → 2주차 입소문 폭발 → 5~6주 고공행진</span>
            </div>
          </li>
          <li className="flex gap-3">
            <div className="w-1 h-10 bg-gray-500 shrink-0" />
            <div>
              <span className="text-gray-300 font-bold block">단기 소진형 (헤어질 결심)</span>
              <span className="text-gray-400 text-xs">초반 버즈 후 조기 피크 → 급감 패턴</span>
            </div>
          </li>
        </ul>
      </Card>
    </div>
  </div>
);

const ComparisonTab = () => {
  const radarData = [
    { subject: '총관객', A: 100, B: 40, fullMark: 100 },
    { subject: '상영효율', A: 90, B: 50, fullMark: 100 },
    { subject: '스크린점유', A: 85, B: 45, fullMark: 100 },
    { subject: '평점', A: 95, B: 88, fullMark: 100 },
    { subject: '검색트렌드', A: 98, B: 60, fullMark: 100 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="그룹별 5대 지표 비교 (Radar)">
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="subject" stroke="#9ca3af" fontSize={12} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#374151" />
                <Radar name="A그룹 (천만)" dataKey="A" stroke="#C9A84C" fill="#C9A84C" fillOpacity={0.6} />
                <Radar name="B그룹 (흥행)" dataKey="B" stroke="#6B7280" fill="#6B7280" fillOpacity={0.4} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="제작비 vs ROI vs 관객수 (Bubble)">
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid stroke="#1f2937" />
                <XAxis type="number" dataKey="budget" name="제작비" unit="억" stroke="#9ca3af" fontSize={10} />
                <YAxis type="number" dataKey="roi" name="ROI" unit="%" stroke="#9ca3af" fontSize={10} />
                <ZAxis type="number" dataKey="audience" range={[50, 1000]} name="관객수" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="영화 성과" data={MOVIE_DATA}>
                  {MOVIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.group === 'A' ? '#C9A84C' : '#6B7280'} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-[10px] text-gray-500 text-center">
            * 버블 크기: 누적 관객수 / 금색: A그룹, 회색: B그룹
          </div>
        </Card>
      </div>

      <Card title="상영 효율 임계값 분석">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C] font-bold">80</div>
              <div>
                <h5 className="text-white font-bold text-sm">초기 폭발 임계값 (80명/회)</h5>
                <p className="text-gray-400 text-xs">개봉 15일까지 이 수치를 유지하면 천만 가능성 90%</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 font-bold">40</div>
              <div>
                <h5 className="text-white font-bold text-sm">유지 임계값 (40명/회)</h5>
                <p className="text-gray-400 text-xs">장기 흥행을 위한 최소 효율 마지노선</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOVIE_DATA}>
                <XAxis dataKey="name" hide />
                <YAxis stroke="#9ca3af" fontSize={10} />
                <Bar dataKey="efficiency" fill="#C9A84C">
                  {MOVIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.efficiency >= 80 ? '#C9A84C' : entry.efficiency >= 40 ? '#4CAF50' : '#F44336'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </div>
  );
};

const BuzzTab = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card title="뉴스 감성 분포 (긍정/중립/부정)">
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SENTIMENT_DATA} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={10} width={80} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="positive" stackId="a" fill="#4CAF50" name="긍정" />
              <Bar dataKey="neutral" stackId="a" fill="#9E9E9E" name="중립" />
              <Bar dataKey="negative" stackId="a" fill="#F44336" name="부정" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="검색 트렌드 패턴 진단">
        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-blue-900/10 border border-blue-900/30">
            <h5 className="text-blue-400 font-bold text-sm mb-2">🟡 사전 버즈형 (명량, 기생충)</h5>
            <p className="text-gray-400 text-xs leading-relaxed">
              개봉 전 집중 마케팅으로 검색량 피크 달성. 
              강력한 IP 파워와 기대감이 초기 관객 폭발로 이어짐.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-purple-900/10 border border-purple-900/30">
            <h5 className="text-purple-400 font-bold text-sm mb-2">🟢 후발 확산형 (왕과 사는 남자)</h5>
            <p className="text-gray-400 text-xs leading-relaxed">
              개봉 시점보다 개봉 후 1~2주차에 검색량이 더 높아지는 패턴. 
              순수 입소문과 실관람객의 강력한 추천이 동력.
            </p>
          </div>
          <div className="flex justify-center pt-4">
            <div className="text-center">
              <div className="text-[#C9A84C] text-2xl font-bold">60%</div>
              <div className="text-gray-500 text-[10px] uppercase">사전 버즈 목표치</div>
            </div>
            <div className="w-px h-10 bg-gray-700 mx-8" />
            <div className="text-center">
              <div className="text-[#4CAF50] text-2xl font-bold">268만</div>
              <div className="text-gray-500 text-[10px] uppercase">유튜브 조회수 임계값</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

const ReviewsTab = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card title="핵심 키워드 빈도 (TF-IDF)">
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={KEYWORDS} layout="vertical">
              <XAxis type="number" hide />
              <YAxis dataKey="text" type="category" stroke="#9ca3af" fontSize={12} width={60} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="value" fill="#C9A84C" radius={[0, 4, 4, 0]}>
                {KEYWORDS.map((entry, index) => (
                  <Cell key={`cell-${index}`} fillOpacity={1 - index * 0.05} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="평점의 역설 분석">
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <div className="text-white font-bold">명량</div>
              <div className="text-xs text-gray-500">왓챠 평점 최하위권</div>
            </div>
            <div className="text-right">
              <div className="text-red-400 font-bold">평점 6.2</div>
              <div className="text-[#C9A84C] text-sm font-bold">흥행 1위 (1,756만)</div>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <div className="text-white font-bold">기생충</div>
              <div className="text-xs text-gray-500">평점-흥행 완벽 일치</div>
            </div>
            <div className="text-right">
              <div className="text-green-400 font-bold">평점 9.1</div>
              <div className="text-[#C9A84C] text-sm font-bold">흥행 1,031만</div>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed italic">
            * 분석 결과: 천만 영화는 '무난한 8점'보다 '열광하는 10점과 비판하는 5점'이 공존하는 
            양극단 분포에서 더 자주 발생함 (논쟁의 여지가 흥행 동력).
          </p>
        </div>
      </Card>
    </div>
  </div>
);

const InvestmentTab = () => {
  const [budget, setBudget] = useState(120);
  const ticketPrice = 15000;
  const distributionRate = 0.4;
  
  const bep = Math.round(budget * 100000000 / (ticketPrice * distributionRate));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2" title="BEP 시뮬레이터">
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs text-gray-400 uppercase">총 제작비 (억 원)</label>
                <span className="text-[#C9A84C] font-bold">{budget}억</span>
              </div>
              <input 
                type="range" min="50" max="300" step="10" 
                value={budget} onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#C9A84C]"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="text-[10px] text-gray-500 uppercase mb-1">필요 관객수 (BEP)</div>
                <div className="text-2xl font-bold text-white">{(bep / 10000).toFixed(1)}만 명</div>
              </div>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="text-[10px] text-gray-500 uppercase mb-1">투자 등급</div>
                <div className={cn(
                  "text-2xl font-bold",
                  budget <= 150 ? "text-green-400" : budget <= 230 ? "text-yellow-400" : "text-red-400"
                )}>
                  {budget <= 150 ? "A (안전)" : budget <= 230 ? "B (주의)" : "C (위험)"}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card title="72시간 EWS 지표">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">스크린 점유율 (60%)</span>
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">상영 효율 (40명/회)</span>
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">유튜브 조회수 (268만)</span>
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
            </div>
            <div className="mt-6 pt-6 border-t border-gray-800 text-center">
              <div className="text-[10px] text-gray-500 uppercase mb-2">종합 천만 가능성</div>
              <div className="text-2xl font-bold text-[#C9A84C]">85%</div>
            </div>
          </div>
        </Card>
      </div>

      <Card title="투자 전략 체크리스트">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "강력한 감성 테마 (사회적 담론/역사적 정서)",
            "개봉 3일 내 100만 관객 달성 가능성",
            "상영 효율 40명/회 이상 유지 (개봉 15일 기준)",
            "제작비 150억 이하 (최적 ROI 구간)",
            "사전 버즈 60% 또는 후발 확산 전략 보유"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded border border-white/5">
              <div className="w-4 h-4 rounded border border-[#C9A84C] flex items-center justify-center">
                <div className="w-2 h-2 bg-[#C9A84C] rounded-sm" />
              </div>
              <span className="text-xs text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
    { id: 'comparison', label: 'Comparison', icon: BarChart3 },
    { id: 'buzz', label: 'Buzz', icon: Search },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
    { id: 'investment', label: 'Investment', icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-white font-sans selection:bg-[#C9A84C]/30">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#14213D] border-r border-[#C9A84C]/10 z-50 hidden lg:block">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-8 bg-[#C9A84C] rounded-lg flex items-center justify-center">
              <LayoutDashboard size={20} className="text-[#0D1B2A]" />
            </div>
            <h1 className="text-xl font-bold tracking-tighter">K-MOVIE <span className="text-[#C9A84C]">INSIGHT</span></h1>
          </div>

          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  activeTab === tab.id 
                    ? "bg-[#C9A84C] text-[#0D1B2A] font-bold shadow-lg shadow-[#C9A84C]/20" 
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <tab.icon size={18} />
                <span className="text-sm">{tab.label}</span>
                {activeTab === tab.id && <ChevronRight size={14} className="ml-auto" />}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-8 left-8 right-8">
          <div className="p-4 rounded-xl bg-[#C9A84C]/5 border border-[#C9A84C]/10">
            <div className="flex items-center gap-2 text-[#C9A84C] mb-2">
              <AlertCircle size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Strategy Alert</span>
            </div>
            <p className="text-[10px] text-gray-400 leading-relaxed">
              왕과 사는 남자: 2주차 역주행 패턴 감지. 상영관 확대 전략 권장.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 min-h-screen">
        <header className="sticky top-0 bg-[#0D1B2A]/80 backdrop-blur-md border-b border-[#C9A84C]/10 z-40 px-8 py-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
            <p className="text-gray-500 text-xs mt-1">K-Movie 천만 흥행 성공 공식 및 투자 전략 분석</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-gray-400 font-mono uppercase">Live Data Connected</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center text-[#C9A84C]">
              <Users size={20} />
            </div>
          </div>
        </header>

        <section className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'overview' && <OverviewTab />}
              {activeTab === 'trends' && <TrendsTab />}
              {activeTab === 'comparison' && <ComparisonTab />}
              {activeTab === 'buzz' && <BuzzTab />}
              {activeTab === 'reviews' && <ReviewsTab />}
              {activeTab === 'investment' && <InvestmentTab />}
            </motion.div>
          </AnimatePresence>
        </section>

        <footer className="p-8 border-t border-[#C9A84C]/10 text-center">
          <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em]">
            © 2026 K-Movie Insight Data Strategy Team. All Rights Reserved.
          </p>
        </footer>
      </main>

      {/* Mobile Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#14213D] border-t border-[#C9A84C]/20 px-4 py-2 flex justify-around z-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1 p-2 transition-colors",
              activeTab === tab.id ? "text-[#C9A84C]" : "text-gray-500"
            )}
          >
            <tab.icon size={20} />
            <span className="text-[8px] uppercase font-bold">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
