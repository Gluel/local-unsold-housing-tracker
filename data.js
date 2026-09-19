// 출처: 부산광역시 연제구 미분양 현황 (공공데이터포털 15030310)
// 기준 시점: 2026-08-31 (수정일 2026-09-09) · 이용허락범위 제한 없음
// 수집: 2026-09-19 (docs/data_sources.md D1)
window.YEONJE_UNSOLD = {
  source: "부산광역시 연제구 미분양 현황 · 공공데이터포털",
  sourceUrl: "https://www.data.go.kr/data/15030310/fileData.do",
  period: "2026-08-31 기준",
  fetched: "2026-09-19",
  months: ["2026-05", "2026-06", "2026-07", "2026-08"],
  rows: {
    "under-60": [0, 0, 0, 0],
    "60-85": [190, 190, 189, 37],
    "over-85": [0, 0, 0, 0]
  }
};

// 출처: 국토교통부 '26년 7월 주택통계 보도자료 (공공누리)
// 기준 시점: 2026-07 말 (보도 2026-08-31)
// 수집: 2026-09-19 (docs/data_sources.md D2)
window.NATIONAL_UNSOLD = {
  source: "국토교통부 '26년 7월 주택통계",
  sourceUrl: "https://www.molit.go.kr/USR/NEWS/m_71/dtl.jsp?lcmspage=1&id=95092360",
  period: "2026-07 말 기준",
  fetched: "2026-09-19",
  totalCount: 68217,
  totalPrevMonth: 67464,
  totalChangePct: 1.1,
  byArea: {
    "under-60": 1815,
    "60-85": 46544,
    "over-85": 13747
  }
};
