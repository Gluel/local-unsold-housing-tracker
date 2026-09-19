// F-01: 면적 구간 선택 → 연제구 4개월 추이 + 전국 비교 + 해석 문구
// 계산은 이 파일의 함수가 하고, 화면(app.html)은 결과만 표시합니다.

var AREA_LABEL = {
  "under-60": "60㎡이하",
  "60-85": "60~85㎡",
  "over-85": "85㎡초과"
};

// R-03(오류)에서 쓸 함수: 데이터가 정상 로드됐는지 확인
function checkDataLoaded() {
  if (typeof window.YEONJE_UNSOLD === "undefined" || typeof window.NATIONAL_UNSOLD === "undefined") {
    return "데이터를 불러오지 못했습니다. 페이지를 새로고침해 주세요.";
  }
  return null;
}

// R-01(정상): 구간별 연제구 4개월 값 + 전월 대비 변화 + 전국 값 계산
function calcChange(area) {
  var yeonje = window.YEONJE_UNSOLD;
  var national = window.NATIONAL_UNSOLD;
  if (!yeonje || !national) return null;

  var values = yeonje.rows[area];
  if (!values) return null;

  var prev = values[values.length - 2];
  var curr = values[values.length - 1];
  var changeCount = curr - prev;
  var changePct;
  if (prev === 0) {
    changePct = curr === 0 ? 0 : null;
  } else {
    changePct = Math.round((changeCount / prev) * 1000) / 10; // 소수 1자리
  }

  return {
    area: area,
    label: AREA_LABEL[area],
    months: yeonje.months,
    values: values,
    changePct: changePct,
    changeCount: changeCount,
    national: national.byArea[area],
    nationalMonth: national.period,
    yeonjeSource: yeonje.source,
    yeonjePeriod: yeonje.period,
    nationalSource: national.source
  };
}

// 화면에 R-01 결과를 그립니다.
function renderResult(area) {
  var resultEl = document.getElementById("result");
  var data = calcChange(area);
  if (!data) return;

  var changeText = data.changePct === 0
    ? "변화 없음 (0호)"
    : (data.changePct > 0 ? "+" : "") + data.changePct + "% (" + (data.changeCount > 0 ? "+" : "") + data.changeCount + "호)";

  var monthsRow = data.months.map(function (m, i) {
    return '<div class="bar-col"><div class="v">' + data.values[i] + '</div><div class="bar" style="height:' + barHeight(data.values, i) + '%"></div><small>' + m.slice(5) + '월</small></div>';
  }).join("");

  resultEl.innerHTML =
    '<div class="change">' + changeText + '</div>' +
    '<div class="note" style="margin-bottom:10px">연제구 ' + data.label + ', 전월 대비 변화</div>' +
    '<div class="bars">' + monthsRow + '</div>' +
    '<div class="note">부산 연제구 ' + data.label + ' 미분양 주택 수, 최근 4개월</div>' +
    '<div class="stat-row" style="margin-top:16px">' +
      '<div class="stat"><div class="num">' + data.national.toLocaleString() + '호</div>' +
      '<div class="lbl">전국 ' + data.label + ' 미분양 (' + data.nationalMonth + ')</div></div>' +
    '</div>' +
    '<p style="margin-top:12px"><b>해석:</b> 이 숫자는 계약되지 않은 물량(공급 신호)을 보여줄 뿐, 가격·투자 판단의 근거가 아닙니다.</p>' +
    '<p class="note">출처: ' + data.yeonjeSource + ' (' + data.yeonjePeriod + ') · ' + data.nationalSource + ' (' + data.nationalMonth + ')</p>';
}

function barHeight(values, i) {
  var max = Math.max.apply(null, values.concat([1])); // 0으로 나누기 방지
  return Math.round((values[i] / max) * 100);
}

function selectArea(area) {
  var resultEl = document.getElementById("result");
  var loadError = checkDataLoaded();
  if (loadError) {
    resultEl.innerHTML = '<p class="error">' + loadError + '</p>';
    return;
  }
  document.querySelectorAll(".area-btn").forEach(function (b) {
    b.classList.toggle("active", b.dataset.area === area);
  });
  renderResult(area);
}
