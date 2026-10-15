/**
 * ==========================================================================
 * 스마트 회계 마스터 - 메인 스크립트 (app.js)
 * 고등학교 3학년 상업·회계 교과용 실전 퀴즈
 * 
 * 💡 선생님을 위한 안내:
 * 아래 QUIZ_DATA 배열의 내용(질문, 보기, 정답, 해설)을 수정하시면
 * 다른 단원(원가회계, 세무회계 등)의 퀴즈로 쉽게 변경하실 수 있습니다.
 * ==========================================================================
 */

// --------------------------------------------------------------------------
// [1] 퀴즈 데이터 정의 (선생님이 쉽게 수정할 수 있는 영역)
// --------------------------------------------------------------------------
const QUIZ_DATA = [
  {
    category: "자산 분류",
    question: "다음 중 1년 이내에 현금화되기 어려운 '비유동자산'에 해당하는 계정과목은 무엇인가요?",
    options: [
      "보통예금 (당좌자산)",
      "단기대여금 (당좌자산)",
      "외상매출금 (매출채권)",
      "구축물 (유형자산)",
      "받을어음 (매출채권)"
    ],
    answer: 3, // 4번째 보기 (0부터 시작하므로 3은 '구축물')
    explanation: "구축물은 교량, 궤도, 정원 등 토지 위에 정착된 토목설비나 공작물로서 1년 이상 장기간 영업활동에 사용하는 대표적인 '비유동자산(유형자산)'입니다. 보통예금, 단기대여금, 외상매출금, 받을어음은 모두 1년 이내에 현금화되는 '유동자산(당좌자산)'입니다."
  },
  {
    category: "자산의 평가",
    question: "다음 중 자산의 원래 취득원가에서 직접 차감하여 장부금액을 나타내는 '자산의 차감적 평가계정'으로 바르게 짝지어진 것은?",
    options: [
      "대손충당금, 감가상각누계액",
      "미수금, 선급금",
      "외상매입금, 지급어음",
      "퇴직급여충당부채, 사채",
      "자본금, 주식발행초과금"
    ],
    answer: 0,
    explanation: "'대손충당금'은 매출채권 등의 회수불능 추정액을 차감하는 계정이며, '감가상각누계액'은 건물, 차량운반구 등 유형자산의 가치 감소분을 차감 표시하는 대표적인 자산의 차감적 평가계정입니다."
  },
  {
    category: "부채 분류",
    question: "다음 중 결산일(보고기간 종료일)로부터 상환 기한이 1년을 초과하여 도래하는 '비유동부채'에 해당하는 것은?",
    options: [
      "단기차입금",
      "외상매입금",
      "사채 (Corporate Bond)",
      "미지급비용",
      "선수금"
    ],
    answer: 2,
    explanation: "'사채'는 주식회사가 거액의 장기자금을 조달하기 위해 채권을 발행하여 부담하는 채무로, 대표적인 '비유동부채'입니다. 단기차입금, 외상매입금, 미지급비용, 선수금은 모두 1년 이내에 지급해야 하는 '유동부채'입니다."
  },
  {
    category: "손익의 결산정리",
    question: "당기에 이미 현금으로 지출되어 비용으로 처리하였으나, 차기(다음 회계연도)에 속하는 비용을 결산 시 자산으로 대체하는 계정과목은?",
    options: [
      "미수수익",
      "선급비용",
      "선수수익",
      "미지급비용",
      "가지급금"
    ],
    answer: 1,
    explanation: "당기에 현금으로 지급된 비용 중 차기 이후 기간에 해당하는 부분을 당기 비용에서 차감하고 다음 기로 이연시키기 위해 자산으로 계상하는 계정과목은 '선급비용(당좌자산)'입니다. (예: 1년분 화재보험료 선급 시 차기분 처리)"
  },
  {
    category: "손익의 결산정리",
    question: "당기 수익에 속하지만 아직 결산일까지 대금을 받지 못하여, 발생주의에 따라 결산 시 당기 수익에 가산하고 자산으로 계상하는 계정과목은?",
    options: [
      "미수수익",
      "선수수익",
      "선급비용",
      "미지급비용",
      "가수금"
    ],
    answer: 0,
    explanation: "용역이나 서비스를 이미 제공하여 당기에 속하는 수익이 발생하였으나 아직 돈을 받지 못한 경우, 결산 시 수익을 인식하면서 차변에 자산으로 잡는 계정과목은 '미수수익(당좌자산)'입니다. (예: 결산일 현재 발생한 미수이자)"
  },
  {
    category: "임시 계정",
    question: "실제 현금 지출은 있었으나 그 사용 목적이나 처리할 계정과목, 금액이 확정되지 않았을 때 일시적으로 차변에 처리하는 임시계정은?",
    options: [
      "가수금",
      "가지급금",
      "예수금",
      "단기차입금",
      "미지급금"
    ],
    answer: 1,
    explanation: "영업 출장비 지급 등 현금 지출은 발생했으나 계정과목이나 금액이 확정되지 않았을 때 임시로 '가지급금'으로 처리하며, 출장에서 복귀하여 정산할 때 본 계정(여비교통비 등)으로 대체합니다. 반대로 입금 원인을 알 수 없을 때는 '가수금'을 사용합니다."
  },
  {
    category: "손익계산서 항목",
    question: "다음 중 기업의 주된 영업활동과 직접적인 관련이 없는 '영업외비용'에 해당하는 것은 무엇인가요?",
    options: [
      "임직원 급여",
      "복리후생비",
      "여비교통비",
      "이자비용",
      "사업장 임차료"
    ],
    answer: 3,
    explanation: "급여, 복리후생비, 여비교통비, 임차료는 영업활동을 위해 소비되는 '판매비와관리비'입니다. 반면 자금 차입에 따른 '이자비용'이나 기부금, 재해손실 등은 영업 외적인 재무활동에서 발생하는 '영업외비용'입니다."
  },
  {
    category: "자본 거래",
    question: "신주를 발행할 때 액면금액을 초과하여 납입된 금액을 처리하는 '자본잉여금' 계정과목은 무엇인가요?",
    options: [
      "주식발행초과금",
      "이익준비금",
      "자본금",
      "주식할인발행차금",
      "당기순이익"
    ],
    answer: 0,
    explanation: "주주와의 자본거래에서 발생한 잉여금은 '자본잉여금'으로 분류되며, 주식을 액면가 이상으로 할증 발행했을 때 액면초과액은 '주식발행초과금' 계정으로 처리합니다. (이익준비금은 이익잉여금, 주식할인발행차금은 자본조정)"
  },
  {
    category: "매출채권 구분",
    question: "다음 중 회계상 '매출채권(외상매출금 또는 받을어음)' 계정으로 회계처리할 수 있는 거래는 어느 것인가요?",
    options: [
      "사무실에서 쓰던 노후 복사기를 중고 처분하고 대금을 다음 달에 받기로 한 경우",
      "의류 도소매업체가 고객에게 판매용 상품(의류)을 외상으로 판매한 경우",
      "거래처에 긴급 운영자금을 단기 대여하고 3개월 뒤 돌려받기로 한 경우",
      "보유 중이던 회사 업무용 토지를 처분하고 약속어음을 수취한 경우",
      "사무실 임대차 계약을 맺고 임대보증금을 지급한 경우"
    ],
    answer: 1,
    explanation: "매출채권(외상매출금, 받을어음)은 '일반적 상거래(주된 영업활동인 상품·제품 매매)'에서 발생한 채권에만 사용합니다. 업무용 비품이나 토지 처분 등 주된 영업 외 거래에서 발생한 외상 대금은 '미수금'으로 처리합니다."
  },
  {
    category: "대손 회계처리",
    question: "결산 시 일반적 상거래에서 발생한 매출채권의 대손(회수불능) 예상액을 보충 설정할 때 차변에 계상하는 '대손상각비'의 계정 분류는?",
    options: [
      "당좌자산",
      "유동부채",
      "판매비와관리비 (비용)",
      "영업외비용",
      "자본조정"
    ],
    answer: 2,
    explanation: "일반적 상거래인 매출채권(외상매출금, 받을어음)에 대해 설정하는 대손상각비는 주된 영업활동과 직접 관련된 비용이므로 '판매비와관리비'로 분류합니다. (참고: 미수금, 대여금 등 기타채권의 대손은 '기타의대손상각비'로서 영업외비용으로 처리)"
  }
];

// --------------------------------------------------------------------------
// [2] 웹앱 전역 상태 관리
// --------------------------------------------------------------------------
let currentQuestionIndex = 0;
let userAnswers = new Array(QUIZ_DATA.length).fill(null); // 사용자가 고른 번호 (0~4, 미선택시 null)
let timerSeconds = 0;
let timerInterval = null;
let currentFilter = 'all'; // 'all' 또는 'wrong'
let currentStudent = { id: '', name: '' }; // 학생 학번 및 이름

// --------------------------------------------------------------------------
// [3] DOM 요소 참조
// --------------------------------------------------------------------------
// 화면 섹션
const screenStart = document.getElementById('screen-start');
const screenQuiz = document.getElementById('screen-quiz');
const screenResult = document.getElementById('screen-result');

// 학생 정보 입력 요소 (앞 표지)
const studentIdInput = document.getElementById('student-id');
const studentNameInput = document.getElementById('student-name');
const studentInputError = document.getElementById('student-input-error');

// 헤더 학생 정보 및 타이머
const headerStudentTag = document.getElementById('header-student-tag');
const headerStudentText = document.getElementById('header-student-text');
const headerTimer = document.getElementById('header-timer');
const timerDisplay = document.getElementById('timer-display');

// 시작 화면 요소
const btnStart = document.getElementById('btn-start');

// 퀴즈 화면 요소
const questionIndicator = document.getElementById('question-indicator');
const progressPercent = document.getElementById('progress-percent');
const progressBar = document.getElementById('progress-bar');
const questionCategory = document.getElementById('question-category');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const answerStatusText = document.getElementById('answer-status-text');

const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnSubmit = document.getElementById('btn-submit');

// 결과 화면 요소
const resultStudentInfo = document.getElementById('result-student-info');
const resultSubmitDate = document.getElementById('result-submit-date');
const finalScore = document.getElementById('final-score');
const scoreGradeText = document.getElementById('score-grade-text');
const correctCount = document.getElementById('correct-count');
const incorrectCount = document.getElementById('incorrect-count');
const totalTimeTaken = document.getElementById('total-time-taken');
const wrongFilterCount = document.getElementById('wrong-filter-count');
const reviewList = document.getElementById('review-list');

const filterAll = document.getElementById('filter-all');
const filterWrong = document.getElementById('filter-wrong');
const btnRestart = document.getElementById('btn-restart');
const btnPrint = document.getElementById('btn-print');

// --------------------------------------------------------------------------
// [4] 타이머 유틸리티 함수
// --------------------------------------------------------------------------
function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds).padStart(2, '0');
  return `${paddedMinutes}:${paddedSeconds}`;
}

function startTimer() {
  timerSeconds = 0;
  timerDisplay.textContent = "00:00";
  headerTimer.classList.remove('hidden');

  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timerSeconds++;
    timerDisplay.textContent = formatTime(timerSeconds);
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// --------------------------------------------------------------------------
// [5] 퀴즈 진행 및 렌더링 로직
// --------------------------------------------------------------------------
function startQuiz() {
  // 학번과 이름 유효성 검사 (앞 표지 필수 입력)
  const studentId = studentIdInput.value.trim();
  const studentName = studentNameInput.value.trim();

  if (!studentId || !studentName) {
    studentInputError.classList.remove('hidden');
    if (!studentId) {
      studentIdInput.focus();
    } else {
      studentNameInput.focus();
    }
    return;
  }

  // 에러 메시지 숨김 및 학생 정보 저장
  studentInputError.classList.add('hidden');
  currentStudent = { id: studentId, name: studentName };

  // 헤더에 학생 이름 표시
  headerStudentText.textContent = `${studentId} ${studentName}`;
  headerStudentTag.classList.remove('hidden');

  currentQuestionIndex = 0;
  userAnswers = new Array(QUIZ_DATA.length).fill(null);
  
  screenStart.classList.add('hidden');
  screenResult.classList.add('hidden');
  screenQuiz.classList.remove('hidden');

  startTimer();
  renderQuestion(currentQuestionIndex);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderQuestion(index) {
  const qData = QUIZ_DATA[index];
  const total = QUIZ_DATA.length;

  // 1. 진행도 업데이트
  const currentNum = index + 1;
  const percent = Math.round((currentNum / total) * 100);
  questionIndicator.textContent = `문제 ${currentNum} / ${total}`;
  progressPercent.textContent = `${percent}%`;
  progressBar.style.width = `${percent}%`;

  // 2. 문제 및 카테고리
  questionCategory.textContent = qData.category;
  questionText.textContent = `${currentNum}. ${qData.question}`;

  // 3. 보기 렌더링
  optionsContainer.innerHTML = '';
  qData.options.forEach((optText, optIndex) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-btn';
    btn.setAttribute('data-option-index', optIndex);

    // 사용자가 이미 선택한 답이 있다면 표시
    if (userAnswers[index] === optIndex) {
      btn.classList.add('selected');
    }

    const numberBadge = document.createElement('span');
    numberBadge.className = 'option-number';
    numberBadge.textContent = optIndex + 1;

    const textSpan = document.createElement('span');
    textSpan.className = 'option-text';
    textSpan.textContent = optText;

    btn.appendChild(numberBadge);
    btn.appendChild(textSpan);

    btn.addEventListener('click', () => selectOption(optIndex));
    optionsContainer.appendChild(btn);
  });

  // 4. 상태 텍스트 갱신
  updateStatusText(index);

  // 5. 이전/다음/제출 버튼 상태 제어
  btnPrev.disabled = (index === 0);

  if (index === total - 1) {
    btnNext.classList.add('hidden');
    btnSubmit.classList.remove('hidden');
  } else {
    btnNext.classList.remove('hidden');
    btnSubmit.classList.add('hidden');
  }
}

function selectOption(optIndex) {
  userAnswers[currentQuestionIndex] = optIndex;

  // 보기 버튼 활성화 클래스 토글
  const buttons = optionsContainer.querySelectorAll('.option-btn');
  buttons.forEach((btn, idx) => {
    if (idx === optIndex) {
      btn.classList.add('selected');
    } else {
      btn.classList.remove('selected');
    }
  });

  updateStatusText(currentQuestionIndex);
}

function updateStatusText(index) {
  if (userAnswers[index] !== null) {
    answerStatusText.textContent = `✓ ${userAnswers[index] + 1}번 보기를 선택했습니다.`;
    answerStatusText.style.color = '#1E40AF';
  } else {
    answerStatusText.textContent = "보기를 선택해 주세요.";
    answerStatusText.style.color = '#64748B';
  }
}

function goToPrevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion(currentQuestionIndex);
  }
}

function goToNextQuestion() {
  if (currentQuestionIndex < QUIZ_DATA.length - 1) {
    currentQuestionIndex++;
    renderQuestion(currentQuestionIndex);
  }
}

// --------------------------------------------------------------------------
// [6] 최종 제출 및 자동 채점 로직
// --------------------------------------------------------------------------
function submitQuiz() {
  // 풀지 않은 문제가 있는지 검사
  const unAnsweredCount = userAnswers.filter(ans => ans === null).length;
  if (unAnsweredCount > 0) {
    const confirmSubmit = confirm(
      `아직 풀지 않은 문제가 ${unAnsweredCount}개 있습니다.\n그래도 시험을 제출하고 채점하시겠습니까?`
    );
    if (!confirmSubmit) return;
  }

  stopTimer();

  // 점수 계산 (문항당 10점)
  let correctTotal = 0;
  QUIZ_DATA.forEach((q, idx) => {
    if (userAnswers[idx] === q.answer) {
      correctTotal++;
    }
  });

  const wrongTotal = QUIZ_DATA.length - correctTotal;
  const score = correctTotal * 10;

  // 화면 전환
  screenQuiz.classList.add('hidden');
  headerTimer.classList.add('hidden');
  headerStudentTag.classList.add('hidden');
  screenResult.classList.remove('hidden');

  // 응시자 정보 및 제출 일시 표시
  resultStudentInfo.textContent = `${currentStudent.id} ${currentStudent.name}`;
  const now = new Date();
  const dateStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  resultSubmitDate.textContent = dateStr;

  // 요약 성적 표시
  finalScore.textContent = score;
  correctCount.textContent = `${correctTotal} / ${QUIZ_DATA.length}`;
  incorrectCount.textContent = `${wrongTotal} / ${QUIZ_DATA.length}`;
  wrongFilterCount.textContent = wrongTotal;
  totalTimeTaken.textContent = formatTime(timerSeconds);

  // 성취도 등급 문구
  if (score === 100) {
    scoreGradeText.textContent = "🏆 완벽합니다! 전산회계 마스터의 실력입니다.";
  } else if (score >= 80) {
    scoreGradeText.textContent = "🌟 훌륭합니다! 고득점으로 합격권 실력입니다.";
  } else if (score >= 60) {
    scoreGradeText.textContent = "👍 양호합니다! 틀린 문제를 복습하면 완벽해집니다.";
  } else {
    scoreGradeText.textContent = "📚 기초 복습이 필요합니다. 아래 해설을 꼼꼼히 확인해 보세요.";
  }

  // 기본적으로 전체 보기로 오답노트 렌더링
  setFilter('all');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --------------------------------------------------------------------------
// [7] 오답 노트 및 해설 렌더링
// --------------------------------------------------------------------------
function renderReviewList() {
  reviewList.innerHTML = '';

  QUIZ_DATA.forEach((qData, idx) => {
    const userChoice = userAnswers[idx];
    const isCorrect = (userChoice === qData.answer);

    // 필터링 적용 (오답만 보기 시 정답 문항 스킵)
    if (currentFilter === 'wrong' && isCorrect) {
      return;
    }

    const item = document.createElement('div');
    item.className = `review-item ${isCorrect ? 'is-correct' : 'is-incorrect'}`;

    // 사용자 선택 텍스트
    const userChoiceText = (userChoice !== null)
      ? `${userChoice + 1}. ${qData.options[userChoice]}`
      : "(미응답)";

    // 정답 텍스트
    const correctAnswerText = `${qData.answer + 1}. ${qData.options[qData.answer]}`;

    item.innerHTML = `
      <div class="review-item-header">
        <div class="review-badge-wrap">
          <span class="review-status-tag">${isCorrect ? '✓ 정답' : '✕ 오답'}</span>
          <span class="review-cat-tag">${qData.category}</span>
        </div>
        <span class="question-score">${isCorrect ? '10점 획득' : '0점 (오답)'}</span>
      </div>

      <h4 class="review-question-text">Q${idx + 1}. ${qData.question}</h4>

      <div class="review-comparison">
        <div class="comp-box user-choice ${isCorrect ? 'correct' : 'wrong'}">
          <span class="comp-title">내가 선택한 답</span>
          <div class="comp-content">${userChoiceText}</div>
        </div>
        <div class="comp-box correct-answer">
          <span class="comp-title">올바른 정답</span>
          <div class="comp-content">${correctAnswerText}</div>
        </div>
      </div>

      <div class="explanation-box">
        <div class="explanation-header">
          <span>💡</span> <strong>선생님의 회계 핵심 해설</strong>
        </div>
        <p>${qData.explanation}</p>
      </div>
    `;

    reviewList.appendChild(item);
  });

  // 오답만 보기 필터인데 오답이 하나도 없을 경우 (100점 만점인 경우)
  if (currentFilter === 'wrong' && reviewList.children.length === 0) {
    const emptyNotice = document.createElement('div');
    emptyNotice.className = 'card';
    emptyNotice.style.textAlign = 'center';
    emptyNotice.style.padding = '30px';
    emptyNotice.innerHTML = `
      <p style="font-size: 1.1rem; font-weight: 700; color: #059669;">🎉 틀린 문제가 없습니다! 모든 문제를 완벽하게 맞혔습니다.</p>
    `;
    reviewList.appendChild(emptyNotice);
  }
}

function setFilter(type) {
  currentFilter = type;
  if (type === 'all') {
    filterAll.classList.add('active');
    filterAll.setAttribute('aria-selected', 'true');
    filterWrong.classList.remove('active');
    filterWrong.setAttribute('aria-selected', 'false');
  } else {
    filterWrong.classList.add('active');
    filterWrong.setAttribute('aria-selected', 'true');
    filterAll.classList.remove('active');
    filterAll.setAttribute('aria-selected', 'false');
  }
  renderReviewList();
}

// --------------------------------------------------------------------------
// [8] 이벤트 리스너 등록
// --------------------------------------------------------------------------
btnStart.addEventListener('click', startQuiz);
btnPrev.addEventListener('click', goToPrevQuestion);
btnNext.addEventListener('click', goToNextQuestion);
btnSubmit.addEventListener('click', submitQuiz);

filterAll.addEventListener('click', () => setFilter('all'));
filterWrong.addEventListener('click', () => setFilter('wrong'));

btnRestart.addEventListener('click', () => {
  if (confirm("처음부터 다시 도전하시겠습니까?")) {
    startQuiz();
  }
});

btnPrint.addEventListener('click', () => {
  window.print();
});

// 학생 정보 입력 편의 기능 (실시간 에러 숨김 및 엔터 키 지원)
studentIdInput.addEventListener('input', () => {
  if (studentIdInput.value.trim() && studentNameInput.value.trim()) {
    studentInputError.classList.add('hidden');
  }
});

studentNameInput.addEventListener('input', () => {
  if (studentIdInput.value.trim() && studentNameInput.value.trim()) {
    studentInputError.classList.add('hidden');
  }
});

studentIdInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    studentNameInput.focus();
  }
});

studentNameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    startQuiz();
  }
});

