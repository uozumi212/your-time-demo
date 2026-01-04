'use client';

import { useState, useEffect } from 'react';
import { getQuotes, Quote, getSelectedQuoteId } from '@/utils/quotes';

import styles from './QuoteDisplay.module.css';

export default function QuoteDisplay () {
	const [quotes, setQuotes] = useState<Quote[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const selectedQuoteId = getSelectedQuoteId();

	useEffect(() => {
		// クライアントサイドでのみ実行
		const loadedQuotes = getQuotes();
		// シャッフルしてランダムな順序にする（オプション）
		// setQuotes(loadedQuotes.sort(() => Math.random() - 0.5));
		if (selectedQuoteId) {
			setCurrentIndex(loadedQuotes.findIndex((quote) => quote.id === selectedQuoteId));
		}
		setQuotes(loadedQuotes);
	}, [selectedQuoteId]);

	const handleNext = () => {
		setCurrentIndex((prev) => (prev + 1) % quotes.length);
	};

	const handlePrev = () => {
		setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
	};

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
				<p className={styles.text}>"{currentQuote.text}"</p>
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
