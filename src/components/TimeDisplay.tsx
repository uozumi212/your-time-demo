'use client';

import { TimeRemaining } from '@/utils/timeCalculations';

interface TimeDisplayProps {
	timeRemaining: TimeRemaining;
}

export default function TimeDisplay ({ timeRemaining }: TimeDisplayProps) {
	return (
		<div className="time-display-container">
			<div className="time-grid">
				<TimeUnit value={timeRemaining.years} label="年" />
				<TimeUnit value={timeRemaining.months} label="月" />
				<TimeUnit value={timeRemaining.days} label="日" />
			</div>
			<div className="time-grid">
				<TimeUnit value={timeRemaining.hours} label="時間" />
				<TimeUnit value={timeRemaining.minutes} label="分" />
				<TimeUnit value={timeRemaining.seconds} label="秒" />
			</div>
		</div>
	);
}

interface TimeUnitProps {
	value: number;
	label: string;
}

function TimeUnit ({ value, label }: TimeUnitProps) {
	return (
		<div className="time-unit">
			<div className="time-value">{value.toString().padStart(2, '0')}</div>
			<div className="time-label">{label}</div>
		</div>
	);
}
