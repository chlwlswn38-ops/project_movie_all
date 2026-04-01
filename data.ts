import React from 'react';

// Mock Data for the Dashboard
export const MOVIE_DATA = [
  { id: 'myeongryang', name: '명량', year: 2014, group: 'A', audience: 1761, budget: 190, revenue: 1357, roi: 714, dropRate: -22, efficiency: 85, buzz: 95, rating: 8.2 },
  { id: 'parasite', name: '기생충', year: 2019, group: 'A', audience: 1031, budget: 135, revenue: 858, roi: 635, dropRate: -15, efficiency: 78, buzz: 98, rating: 9.1 },
  { id: 'the_kings_garden', name: '왕과 사는 남자', year: 2026, group: 'A', audience: 1372, budget: 120, revenue: 1100, roi: 916, dropRate: 99.6, efficiency: 92, buzz: 88, rating: 8.9 },
  { id: 'sado', name: '사도', year: 2015, group: 'B', audience: 624, budget: 95, revenue: 480, roi: 505, dropRate: -35, efficiency: 45, buzz: 65, rating: 8.5 },
  { id: 'the_night_owl', name: '올빼미', year: 2022, group: 'B', audience: 332, budget: 90, revenue: 260, roi: 288, dropRate: -28, efficiency: 42, buzz: 55, rating: 8.7 },
  { id: 'the_man_standing_next', name: '남산의 부장들', year: 2020, group: 'B', audience: 475, budget: 155, revenue: 410, roi: 264, dropRate: -42, efficiency: 38, buzz: 70, rating: 8.4 },
  { id: 'decision_to_leave', name: '헤어질 결심', year: 2022, group: 'B', audience: 189, budget: 135, revenue: 150, roi: 111, dropRate: -30, efficiency: 35, buzz: 80, rating: 8.9 },
];

export const TIME_SERIES_DATA = [
  { day: 1, myeongryang: 68, parasite: 56, the_kings_garden: 12, sado: 25, the_night_owl: 10, the_man_standing_next: 25, decision_to_leave: 8 },
  { day: 3, myeongryang: 220, parasite: 190, the_kings_garden: 45, sado: 80, the_night_owl: 35, the_man_standing_next: 85, decision_to_leave: 25 },
  { day: 7, myeongryang: 660, parasite: 514, the_kings_garden: 116, sado: 180, the_night_owl: 80, the_man_standing_next: 220, decision_to_leave: 60 },
  { day: 14, myeongryang: 1100, parasite: 820, the_kings_garden: 232, sado: 350, the_night_owl: 150, the_man_standing_next: 380, decision_to_leave: 110 },
  { day: 21, myeongryang: 1400, parasite: 950, the_kings_garden: 480, sado: 480, the_night_owl: 220, the_man_standing_next: 440, decision_to_leave: 150 },
  { day: 28, myeongryang: 1600, parasite: 1000, the_kings_garden: 850, sado: 550, the_night_owl: 280, the_man_standing_next: 465, decision_to_leave: 175 },
  { day: 35, myeongryang: 1700, parasite: 1020, the_kings_garden: 1150, sado: 600, the_night_owl: 310, the_man_standing_next: 472, decision_to_leave: 185 },
  { day: 42, myeongryang: 1756, parasite: 1031, the_kings_garden: 1372, sado: 624, the_night_owl: 332, the_man_standing_next: 475, decision_to_leave: 189 },
];

export const SENTIMENT_DATA = [
  { name: '명량', positive: 65, neutral: 25, negative: 10 },
  { name: '기생충', positive: 88, neutral: 10, negative: 2 },
  { name: '왕과 사는 남자', positive: 82, neutral: 12, negative: 6 },
  { name: '사도', positive: 70, neutral: 20, negative: 10 },
  { name: '올빼미', positive: 75, neutral: 20, negative: 5 },
  { name: '남산의 부장들', positive: 68, neutral: 22, negative: 10 },
  { name: '헤어질 결심', positive: 85, neutral: 12, negative: 3 },
];

export const KEYWORDS = [
  { text: '연기', value: 95 },
  { text: '이순신', value: 88 },
  { text: '감동', value: 82 },
  { text: '스토리', value: 78 },
  { text: '최민식', value: 75 },
  { text: '유아인', value: 70 },
  { text: '연출', value: 68 },
  { text: '몰입감', value: 65 },
  { text: '역사', value: 62 },
  { text: '긴장감', value: 60 },
];
