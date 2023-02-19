'use client';

import { ButtonHTMLAttributes, DetailedHTMLProps, LegacyRef, MutableRefObject, useRef, useState } from 'react';

export default function Rand() {
  const [one, setOne] = useState<string>('30');
  const [two, setTwo] = useState<string>('25');
  const [three, setThree] = useState<string>('20');
  const [four, setFour] = useState<string>('8');
  const [result, setResult] = useState<number>(0);
  const [step, setStep] = useState<number>(1);
  const [target, setTarget] = useState<number>(5);
  const [continuity, setContinuity] = useState<number>(10);
  const [cost, setCost] = useState<number>(1300);
  const [total, setTotal] = useState<string>('');
  const btn = useRef<any>();

  const go = (): void => {
    let count: number = 0;
    let pay: number = 0;
    if (continuity !== 0) {
      btn.current.disabled = true;
      try {
        for (let i = 0; i < continuity; i++) {
          [count, pay] = enforce(step, target, count, pay);
        }
        count /= continuity;
        pay /= continuity;
      } catch (e) {
        btn.current.disabled = false;
      }
      btn.current.disabled = false;
    } else {
      [count, pay] = enforce(step, target, count, pay);
    }
    const resultPay = pay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    setTotal(resultPay);
    setResult(count);
  };

  //강화 로직
  const enforce = (step: number, target: number, count: number, pay: number): [number, number] => {
    //강화 횟수
    count++;
    //비용
    pay += cost;
    //새로운 랜덤 수 생성
    const rand: number = Number((Math.random() * 100).toFixed(3));

    let percentage = 0;

    switch (step) {
      case 1:
        percentage = Number(one);
        break;
      case 2:
        percentage = Number(two);
        break;
      case 3:
        percentage = Number(three);
        break;
      case 4:
        percentage = Number(four);
        break;
      default:
        percentage = 0;
    }
    //성공
    if (rand <= percentage) {
      step++;
    } else {
      if (step !== 1) step--;
    }
    if (step === target) return [count, pay];
    return enforce(step, target, count, pay);
  };
  return (
    <div>
      <p>
        {`1단계 확률 : `}
        <input value={one} onChange={(e) => setOne(e.target.value)} />
      </p>
      <p>
        {`2단계 확률 : `}
        <input value={two} onChange={(e) => setTwo(e.target.value)} />
      </p>
      <p>
        {`3단계 확률 : `}
        <input value={three} onChange={(e) => setThree(e.target.value)} />
      </p>
      <p>
        {`4단계 확률 : `}
        <input value={four} onChange={(e) => setFour(e.target.value)} />
      </p>
      <p>
        {`시도 비용 : `}
        <input value={cost} onChange={(e) => setCost(Number(e.target.value))} />
      </p>
      <p>
        {`시작 강화단계 : `}
        <input value={step} onChange={(e) => setStep(Number(e.target.value))} />
      </p>
      <p>
        {`목표 강화단계 : `}
        <input value={target} onChange={(e) => setTarget(Number(e.target.value))} />
      </p>
      <p>
        {`연속 강화 평균 : `}
        <input value={continuity} onChange={(e) => setContinuity(Number(e.target.value))} />
      </p>
      <button onClick={go} ref={btn}>
        시작
      </button>
      <p>시도 횟수 : {result}</p>
      <p>비용 : {total}</p>
    </div>
  );
}
