import React, { useState } from 'react';

const scenarios = [
  {
    id: 1,
    situation: 'یکی از اعضای کلیدی تیم، به‌طور ناگهانی عملکردش افت کرده و انگیزه نداره. چه کار می‌کنی؟',
    options: [
      { text: 'مستقیماً با او جلسه می‌ذاری و دلیلشو می‌پرسی.', impact: 'empathy' },
      { text: 'به HR اطلاع می‌دی و ازش می‌خوای بررسی کنه.', impact: 'delegation' },
      { text: 'منتظر می‌مونی ببینی خودش بهبود پیدا می‌کنه یا نه.', impact: 'passive' }
    ]
  },
  {
    id: 2,
    situation: 'کسب‌وکار تو دچار بحران نقدینگی شده. برای پرداخت حقوق‌ها فقط یک ماه بودجه داری.',
    options: [
      { text: 'با تیم صادقانه موضوع رو درمیون می‌ذاری و ازشون مشورت می‌گیری.', impact: 'transparency' },
      { text: 'به‌تنهایی تصمیم می‌گیری که از یک پروژه ریسک‌دار سرمایه بیاری.', impact: 'risk' },
      { text: 'دنبال جذب سرمایه فوری از طریق وام یا سرمایه‌گذار می‌ری.', impact: 'finance' }
    ]
  }
];

export default function App() {
  const [step, setStep] = useState(-1);
  const [log, setLog] = useState([]);

  const handleOption = (option) => {
    setLog([...log, { situation: scenarios[step].situation, decision: option.text, impact: option.impact }]);
    setStep(step + 1);
  };

  if (step === -1) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Welcome to the Leadership Coaching Game</h1>
        <p>You'll be presented with realistic leadership scenarios and receive coaching-style feedback based on your decisions.</p>
        <button onClick={() => setStep(0)}>Start Game</button>
      </div>
    );
  }

  if (step >= scenarios.length) {
    const impactSummary = log.reduce((acc, curr) => {
      acc[curr.impact] = (acc[curr.impact] || 0) + 1;
      return acc;
    }, {});

    return (
      <div style={{ padding: '2rem' }}>
        <h2>Your Coaching Feedback</h2>
        {log.map((entry, index) => (
          <div key={index}>
            <strong>Scenario:</strong> {entry.situation}<br />
            <strong>Your choice:</strong> {entry.decision}<br />
            <strong>Impact style:</strong> {entry.impact}<br /><br />
          </div>
        ))}
        <h3>Summary:</h3>
        <ul>
          {Object.entries(impactSummary).map(([key, value]) => (
            <li key={key}>{key}: {value} decisions</li>
          ))}
        </ul>
      </div>
    );
  }

  const current = scenarios[step];

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Scenario {step + 1}</h2>
      <p>{current.situation}</p>
      {current.options.map((opt, i) => (
        <button key={i} style={{ display: 'block', margin: '1rem 0' }} onClick={() => handleOption(opt)}>
          {opt.text}
        </button>
      ))}
    </div>
  );
}