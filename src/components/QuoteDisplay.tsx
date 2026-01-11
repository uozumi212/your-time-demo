'use client';

import { useState, useEffect } from 'react';
import { getQuotes, Quote, getSelectedQuoteId } from '@/utils/quotes';

import styles from './QuoteDisplay.module.css';

export default function QuoteDisplay () {

	const [data, setData] = useState<{
		quotes: Quote[];
		currentIndex: number;
		isLoaded: boolean;
	}>({
		quotes: [],
		currentIndex: 0,
		isLoaded: false,
	});

	useEffect(() => {
		// クライアントサイドでのみ実行
		const loadedQuotes = getQuotes();
		const selectedQuoteId = getSelectedQuoteId();

		let initialIndex = 0;

		// シャッフルしてランダムな順序にする（オプション）
		// setQuotes(loadedQuotes.sort(() => Math.random() - 0.5));
		if (selectedQuoteId) {
			const foundIndex = loadedQuotes.findIndex((q) => q.id === selectedQuoteId);

			if (foundIndex !== -1) {
				initialIndex = foundIndex;
			}
		}

		requestAnimationFrame(() => {
			setData({
				quotes: loadedQuotes,
				currentIndex: initialIndex,
				isLoaded: true,
			});
		});
	}, []);

	const handleNext = () => {
		setData((prev) => ({
			...prev,
			currentIndex: (prev.currentIndex + 1) % prev.quotes.length,
		}));
	};

	const handlePrev = () => {
				setData((prev) => ({
			...prev,
			currentIndex: (prev.currentIndex - 1 + prev.quotes.length) % prev.quotes.length,
		}));
	};

	const { quotes, currentIndex, isLoaded } = data;

	if (!isLoaded) {
		return (
			<div className={styles.container}>
				<p className={`${styles.text} text-base`}>名言を読み込んでいます...</p>
			</div>
		);
	}

	if (quotes.length === 0) {
		return (
			<div className={styles.container}>
				<p className={`${styles.text} text-base`}>名言が登録されていません。</p>
				<div className="mt-4">
					<a href="/quotes/register" className="text-blue-500 hover:underline">
						名言を登録する
					</a>
				</div>
			</div>
		);
	}

	const currentQuote = quotes[currentIndex];

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<p className={styles.text}>&quot;{currentQuote.text}&quot;</p>
				{currentQuote.author && (
					<p className={styles.author}>- {currentQuote.author}</p>
				)}
			</div>

			{quotes.length > 1 && (
				<div className={styles.controls}>
					<button onClick={handlePrev} className={styles.btn}>
						← 前へ
					</button>
					<div className="text-sm text-gray-500 self-center">
						{currentIndex + 1} / {quotes.length}
					</div>
					<button onClick={handleNext} className={styles.btn}>
						次へ →
					</button>
				</div>
			)}
		</div>
	);
}
