'use client';

interface ProgressBarProps {
	percentage: number;
}

export default function ProgressBar ({ percentage }: ProgressBarProps) {
	return (
		<div className="progress-container">
			<div className="progress-header">
				<h3 className="progress-title">人生の進捗</h3>
				<span className="progress-percentage">
					{percentage.toFixed(4)}%
				</span>
			</div>
			<div className="progress-bar-wrapper">
				<div
					className="progress-bar-fill"
					style={{ width: `${Math.min(100, percentage)}%` }}
				>
					<div className="progress-bar-glow"></div>
				</div>
			</div>
			<div className="progress-labels">
				<span>誕生</span>
				<span>現在</span>
				<span>終了予定</span>
			</div>
		</div>
	);
}
