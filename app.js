// --- Mon-Sou 16 Types Data ---
const typesData = {
    // 肛門相をMBTIの16タイプに準えつつ、独自の名称と解説を設定
    "AS-DR": { id: "AS-DR", name: "飛龍相（Dragon）", title: "カリスマ的先駆者", desc: "力強い放射状のシワと、引き締まった筋肉が特徴の相。持って生まれたカリスマ性と決断力で周囲を引っ張ります。", health: "エネルギーに満ち溢れていますが、ストレスを腸に溜め込みやすい傾向。温かい飲み物と食物繊維を意識して。" },
    "AS-OW": { id: "AS-OW", name: "賢フクロウ相（Owl）", title: "冷静なる観察者", desc: "規則正しく整った浅いシワが特徴の相。論理的で分析力に優れ、物事の本質を見抜く知性を持っています。", health: "自律神経が乱れやすく、便秘や下痢を繰り返すサインが出やすい相。睡眠リズムを整えることが健康の鍵です。" },
    "AS-PF": { id: "AS-PF", name: "孔雀相（Peacock）", title: "天性のエンターテイナー", desc: "色彩が明るく、華やかな印象を与える相。自己表現力が高く、常に人々の中心で輝きたいという欲求を持っています。", health: "暴飲暴食のツケが痔として現れやすい傾向。華やかな生活の裏で、胃腸を休める「休肝日」ならぬ「休腸日」が必要です。" },
    "AS-TU": { id: "AS-TU", name: "玄武相（Turtle）", title: "不動の守護者", desc: "厚みがあり、シワが深く刻まれている相。忍耐力があり、一度決めたことは最後までやり遂げる不屈の精神の持ち主。", health: "頑丈なほうですが、座りっぱなしによる鬱血リスクが最も高いタイプ。定期的に立ち上がり、軽いストレッチングを。" },
    
    // 省略せずに16タイプ風に4要素×2のバリエーションとして簡略化して実装（今回はデモとして8タイプを用意）
    "AS-FX": { id: "AS-FX", name: "霊狐相（Fox）", title: "臨機応変な戦略家", desc: "繊細でアシンメトリーな相。状況に合わせて柔軟に対応できる適応力があり、人の心を読むことに長けています。", health: "精神的なプレッシャーがすぐにお腹にくるタイプ。乳酸菌や発酵食品を取り入れ、腸内環境からメンタルケアを。" },
    "AS-BE": { id: "AS-BE", name: "大熊相（Bear）", title: "包容力ある庇護者", desc: "全体的に丸みを帯び、穏やかな表情を持つ相。他者への思いやりに溢れ、コミュニティの調和を大切にします。", health: "消化吸収が良い反面、溜め込みやすい体質。適度な運動と、水分補給を怠らないことで健やかな状態を保てます。" },
    "AS-CA": { id: "AS-CA", name: "見守り猫相（Cat）", title: "マイペースな芸術家", desc: "きめ細やかで柔らかな相。独自の美学と強いこだわりを持ち、束縛を嫌う自由な精神の持ち主です。", health: "冷えに弱いため、下半身を冷やさないことが重要。温浴や半身浴で血流を良くすることで、相の血色も高まります。" },
    "AS-WO": { id: "AS-WO", name: "銀狼相（Wolf）", title: "孤高の探求者", desc: "直線的でシャープなシワが特徴。独立心が強く、自らの信念に基づいて行動する誠実さと情熱を秘めています。", health: "疲れを感じにくく無理をしてしまいがち。相に弾力がなくなってきたら、それは身体が切実に休息を求めているサインです。" }
};

// 質問データ（4問で擬似的にタイプを決定）
const questions = [
    {
        q: "日常生活で、予期せぬトラブルが起きたとき、あなたは...",
        answers: [
            { text: "すぐに論理的な解決策を考える", value: "T" },
            { text: "まずは周囲の人々の感情や状況を気に掛ける", value: "F" }
        ]
    },
    {
        q: "休日、リフレッシュするために行きたい場所は？",
        answers: [
            { text: "活気のあるイベントや、友人が集まる場所", value: "E" },
            { text: "静かで落ち着ける自然の中や、自宅の自室", value: "I" }
        ]
    },
    {
        q: "何か新しいことを始める時、大切にするのは？",
        answers: [
            { text: "過去の経験や実績、具体的なデータ", value: "S" },
            { text: "直感やひらめき、将来の可能性", value: "N" }
        ]
    },
    {
        q: "あなたのお腹の調子（排便の傾向）で多いのは？",
        answers: [
            { text: "どちらかというと緊張するとすぐ痛くなる・緩くなる", value: "J" },
            { text: "どちらかというと溜め込みがちで便秘気味だ", value: "P" }
        ]
    }
];

let currentQuestion = 0;
let userAnswers = [];

// =========================================
// UI要素の取得
// =========================================
const introScreen = document.getElementById('intro-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const retakeBtn = document.getElementById('retake-btn');
const progressBar = document.getElementById('progress');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');

// 相性占い用
const myTypeSelect = document.getElementById('my-type');
const partnerTypeSelect = document.getElementById('partner-type');
const checkCompaBtn = document.getElementById('check-compa-btn');
const compaResult = document.getElementById('compa-result');

// =========================================
// 初期化
// =========================================
function init() {
    // セレクトボックスのオプション生成
    Object.values(typesData).forEach(type => {
        const option1 = document.createElement('option');
        option1.value = type.id;
        option1.textContent = type.name;
        myTypeSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = type.id;
        option2.textContent = type.name;
        partnerTypeSelect.appendChild(option2);
    });

    // イベントリスナー
    startBtn.addEventListener('click', startQuiz);
    retakeBtn.addEventListener('click', resetQuiz);
    myTypeSelect.addEventListener('change', checkSelects);
    partnerTypeSelect.addEventListener('change', checkSelects);
    checkCompaBtn.addEventListener('click', calcCompatibility);
}

// =========================================
// 診断ロジック
// =========================================
function startQuiz() {
    introScreen.classList.remove('active');
    questionScreen.classList.add('active');
    currentQuestion = 0;
    userAnswers = [];
    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestion];
    questionText.textContent = `Q${currentQuestion + 1}. ${q.q}`;
    progressBar.style.width = `${((currentQuestion) / questions.length) * 100}%`;
    
    optionsContainer.innerHTML = '';
    q.answers.forEach(ans => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = ans.text;
        btn.addEventListener('click', () => selectAnswer(ans.value));
        optionsContainer.appendChild(btn);
    });
}

function selectAnswer(val) {
    userAnswers.push(val);
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        progressBar.style.width = '100%';
        setTimeout(showResult, 500);
    }
}

function determineType() {
    // 簡易的なロジックで8タイプにマッピング
    const ansStr = userAnswers.join('');
    // ansStrは例: "TE SJ"みたいな組み合わせ
    const keys = Object.keys(typesData);
    // ランダムではなく、回答パターンのハッシュ的なもので一意に決める
    let hash = 0;
    for(let i=0; i<ansStr.length; i++) hash += ansStr.charCodeAt(i);
    return typesData[keys[hash % keys.length]];
}

function showResult() {
    questionScreen.classList.remove('active');
    resultScreen.classList.add('active');
    
    const resultType = determineType();
    
    document.getElementById('result-title').textContent = resultType.id;
    document.getElementById('result-type-name').textContent = `${resultType.name}：${resultType.title}`;
    document.getElementById('result-desc').textContent = resultType.desc;
    document.getElementById('result-health').textContent = resultType.health;

    // 診断終わったら自分のタイプとして自動選択しておく
    myTypeSelect.value = resultType.id;
    checkSelects();
}

function resetQuiz() {
    resultScreen.classList.remove('active');
    introScreen.classList.add('active');
}

// =========================================
// 相性チェックロジック
// =========================================
function checkSelects() {
    if(myTypeSelect.value && partnerTypeSelect.value) {
        checkCompaBtn.disabled = false;
    } else {
        checkCompaBtn.disabled = true;
    }
}

function calcCompatibility() {
    const myId = myTypeSelect.value;
    const partnerId = partnerTypeSelect.value;
    
    // IDの組み合わせで固定スコアを生成（擬似相性）
    const combinedStr = [myId, partnerId].sort().join('-');
    let hash = 0;
    for(let i=0; i<combinedStr.length; i++) {
        hash = (hash * 31 + combinedStr.charCodeAt(i)) % 100;
    }
    
    let score = hash + 20; // 20 ~ 100
    if(score > 100) score = 100;
    if(myId === partnerId) score = 85; // 同じタイプはそこそこ良い
    
    document.getElementById('compa-score').textContent = score;
    
    let title = "";
    let txt = "";
    
    if(score >= 90) {
        title = "魂の双子！";
        txt = "Mon-Souの波長が完璧に一致しています。言葉を交わさずともお互いの腹の底が理解できる究極の相性です。";
    } else if (score >= 70) {
        title = "とても良い相性です";
        txt = "お互いの性質を補い合える関係性。共に過すことで、より健やかに過ごすことができるでしょう。";
    } else if (score >= 50) {
        title = "努力次第で深まる絆";
        txt = "異なる相の持ち主。最初は戸惑うかもしれませんが、違いを受け入れることで強力なパートナーになれます。";
    } else {
        title = "刺激的な関係";
        txt = "全く異なる価値観を持つため摩擦の多い相性ですが、だからこそ思いがけない成長を促してくれる相手でもあります。";
    }
    
    document.getElementById('compa-title').textContent = title;
    document.getElementById('compa-text').textContent = txt;
    
    compaResult.classList.remove('hidden');
    
    // スクロール
    compaResult.scrollIntoView({behavior: "smooth", block: "center"});
}

// 初期化実行
document.addEventListener('DOMContentLoaded', init);
