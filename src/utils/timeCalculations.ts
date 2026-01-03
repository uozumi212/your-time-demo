/**
 * 時間計算のためのユーティリティ関数
 */

export interface TimeRemaining {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  totalMilliseconds: number;
}

export interface LifeStats {
  totalLifeMilliseconds: number;
  elapsedMilliseconds: number;
  remainingMilliseconds: number;
  percentage: number;
  elapsedDays: number;
  totalDays: number;
  remainingDays: number;
}

/**
 * 生年月日と寿命から残り時間を計算
 */
export function calculateRemainingTime(
  birthDate: Date,
  lifeExpectancy: number
): TimeRemaining {
  const now = new Date();
  const endDate = new Date(birthDate.getTime());
  endDate.setFullYear(birthDate.getFullYear() + lifeExpectancy);

  const diff = endDate.getTime() - now.getTime();

  if (diff <= 0) {
    return {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      totalMilliseconds: 0,
    };
  }

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44); // 平均月日数
  const years = Math.floor(days / 365.25); // 平均年日数

  return {
    years: years,
    months: months % 12,
    days: days % 30,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
    milliseconds: diff % 1000,
    totalMilliseconds: diff,
  };
}

/**
 * 人生の統計情報を計算
 */
export function calculateLifeStats(
  birthDate: Date,
  lifeExpectancy: number
): LifeStats {
  const now = new Date();
  const endDate = new Date(birthDate.getTime());
  endDate.setFullYear(birthDate.getFullYear() + lifeExpectancy);

  const totalLifeMilliseconds = endDate.getTime() - birthDate.getTime();
  const elapsedMilliseconds = now.getTime() - birthDate.getTime();
  const remainingMilliseconds = Math.max(
    0,
    endDate.getTime() - now.getTime()
  );

  const percentage = Math.min(
    100,
    (elapsedMilliseconds / totalLifeMilliseconds) * 100
  );

  const elapsedDays = Math.floor(elapsedMilliseconds / (1000 * 60 * 60 * 24));
  const totalDays = Math.floor(totalLifeMilliseconds / (1000 * 60 * 60 * 24));
  const remainingDays = Math.max(0, totalDays - elapsedDays);

  return {
    totalLifeMilliseconds,
    elapsedMilliseconds,
    remainingMilliseconds,
    percentage,
    elapsedDays,
    totalDays,
    remainingDays,
  };
}

/**
 * ミリ秒を読みやすい形式にフォーマット
 */
export function formatMilliseconds(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return `${days}日 ${hours % 24}時間 ${minutes % 60}分 ${seconds % 60}秒`;
}

/**
 * パーセンテージをフォーマット
 */
export function formatPercentage(percentage: number): string {
  return percentage.toFixed(6) + '%';
}
