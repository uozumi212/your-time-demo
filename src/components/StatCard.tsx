'use client';

interface StatCardProps {
	title: string;
	value: string | number;
	subtitle?: string;
	icon?: string;
}

export default function StatCard ({ title, value, subtitle, icon }: StatCardProps) {
	return (
		<div className="stat-card">
			{icon && <div className="stat-icon">{icon}</div>}
			<div className="stat-content">
				<h4 className="stat-title">{title}</h4>
				<div className="stat-value">{value}</div>
				{subtitle && <div className="stat-subtitle">{subtitle}</div>}
			</div>
		</div>
	);
}
