'use client';

import { useState, useEffect } from 'react';
import InputForm from '@/components/InputForm';
import TimeDisplay from '@/components/TimeDisplay';
import ProgressBar from '@/components/ProgressBar';
import StatCard from '@/components/StatCard';
import {
  calculateRemainingTime,
  calculateLifeStats,
  TimeRemaining,
  LifeStats,
} from '@/utils/timeCalculations';
import Navigation from '@/components/Navigation';
import QuoteDisplay from '@/components/QuoteDisplay';

const STORAGE_KEY_BIRTHDATE = 'yourtime_birthdate';
const STORAGE_KEY_LIFE_EXPECTANCY = 'yourtime_life_expectancy';

export default function Home () {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(80);
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);
  const [lifeStats, setLifeStats] = useState<LifeStats | null>(null);
  const [isClient, setIsClient] = useState(false);

  // クライアントサイドでのみ実行
  useEffect(() => {
    requestAnimationFrame(() => {
      setIsClient(true);
    });

    // LocalStorageから設定を読み込む
    const savedBirthDate = localStorage.getItem(STORAGE_KEY_BIRTHDATE);
    const savedLifeExpectancy = localStorage.getItem(STORAGE_KEY_LIFE_EXPECTANCY);

    if (savedBirthDate) {
      requestAnimationFrame(() => {
        setBirthDate(new Date(savedBirthDate));
      });
    }
    if (savedLifeExpectancy) {
      requestAnimationFrame(() => {
        setLifeExpectancy(Number(savedLifeExpectancy));
      });
    }
  }, []);

  // 時間の更新
  useEffect(() => {
    if (!birthDate || !isClient) return;

    const updateTime = () => {
      const remaining = calculateRemainingTime(birthDate, lifeExpectancy);
      const stats = calculateLifeStats(birthDate, lifeExpectancy);
      setTimeRemaining(remaining);
      setLifeStats(stats);
    };

    updateTime();
    const interval = setInterval(updateTime, 100); // 100msごとに更新

    return () => clearInterval(interval);
  }, [birthDate, lifeExpectancy, isClient]);

  const handleSubmit = (newBirthDate: Date, newLifeExpectancy: number) => {
    setBirthDate(newBirthDate);
    setLifeExpectancy(newLifeExpectancy);

    // LocalStorageに保存
    localStorage.setItem(STORAGE_KEY_BIRTHDATE, newBirthDate.toISOString());
    localStorage.setItem(STORAGE_KEY_LIFE_EXPECTANCY, String(newLifeExpectancy));
  };

  const handleReset = () => {
    setBirthDate(null);
    setLifeExpectancy(80);
    setTimeRemaining(null);
    setLifeStats(null);
    localStorage.removeItem(STORAGE_KEY_BIRTHDATE);
    localStorage.removeItem(STORAGE_KEY_LIFE_EXPECTANCY);
  };

  if (!isClient) {
    return null; // SSR時は何も表示しない
  }

  return (
    <>
      <Navigation />
      <main className="main-container">
        <div className="content-wrapper">
          <header className="header">
            <h1 className="title">
              <span className="title-gradient">Your Time</span>
            </h1>
            <p className="subtitle">あなたの残り時間を可視化する</p>
          </header>

          <QuoteDisplay />

          {!birthDate || !timeRemaining || !lifeStats ? (
            <div className="form-section">
              <InputForm
                onSubmit={handleSubmit}
                initialBirthDate={birthDate || undefined}
                initialLifeExpectancy={lifeExpectancy}
              />
            </div>
          ) : (
            <>
              <div className="timer-section">
                <TimeDisplay timeRemaining={timeRemaining} />
              </div>

              <div className="progress-section">
                <ProgressBar percentage={lifeStats.percentage} />
              </div>

              <div className="stats-section">
                <StatCard
                  title="経過日数"
                  value={lifeStats.elapsedDays.toLocaleString()}
                  subtitle="日"
                  icon="📅"
                />
                <StatCard
                  title="残り日数"
                  value={lifeStats.remainingDays.toLocaleString()}
                  subtitle="日"
                  icon="⏳"
                />
                <StatCard
                  title="人生の進捗"
                  value={lifeStats.percentage.toFixed(2)}
                  subtitle="%"
                  icon="📊"
                />
              </div>

              <div className="actions-section">
                <button onClick={handleReset} className="reset-button">
                  設定をリセット
                </button>
              </div>
            </>
          )}

          <footer className="footer">
            <p>時間は限られています。大切に使いましょう。</p>
          </footer>
        </div>
      </main>
    </>
  );
}
