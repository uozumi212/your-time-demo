'use client';

import { useState } from 'react';

interface InputFormProps {
	onSubmit: (birthDate: Date, lifeExpectancy: number) => void;
	initialBirthDate?: Date;
	initialLifeExpectancy?: number;
}

const formatDate = (date: Date) => {
	if (!date) return '';
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

export default function InputForm ({
	onSubmit,
	initialBirthDate,
	initialLifeExpectancy = 80,
}: InputFormProps) {
	const [birthDate, setBirthDate] = useState<string>(() => formatDate(initialBirthDate || new Date()));
	const [lifeExpectancy, setLifeExpectancy] = useState<number>(
		initialLifeExpectancy
	);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (birthDate) {
			const date = new Date(birthDate);
			onSubmit(date, lifeExpectancy);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="input-form">
			<div className="form-group">
				<label htmlFor="birthDate" className="form-label">
					生年月日
				</label>
				<input
					type="date"
					id="birthDate"
					value={birthDate}
					onChange={(e) => setBirthDate(e.target.value)}
					className="form-input"
					required
					max={new Date().toISOString().split('T')[0]}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="lifeExpectancy" className="form-label">
					予想寿命: {lifeExpectancy}歳
				</label>
				<input
					type="range"
					id="lifeExpectancy"
					min="1"
					max="120"
					value={lifeExpectancy}
					onChange={(e) => setLifeExpectancy(Number(e.target.value))}
					className="form-slider"
				/>
				<div className="slider-labels">
					<span>1歳</span>
					<span>120歳</span>
				</div>
			</div>

			<button type="submit" className="submit-button">
				計算開始
			</button>
		</form>
	);
}
