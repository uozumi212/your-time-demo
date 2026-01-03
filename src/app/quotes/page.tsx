'use client';

import { useState, useEffect } from 'react';
import { getQuotes, deleteQuote, Quote, getSelectedQuoteId, setSelectedQuoteId } from '@/utils/quotes';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

import styles from './quotes.module.css';

export default function QuotesList () {
	const [quotes, setQuotes] = useState<Quote[]>([]);
	const [selectQuote, setSelectQuote] = useState<Quote | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadedQuotes = getQuotes();
		setQuotes(loadedQuotes);
		const selectedQuoteId = getSelectedQuoteId();
		if (selectedQuoteId) {
			const selectedQuote = loadedQuotes.find((quote) => quote.id === selectedQuoteId);
			setSelectQuote(selectedQuote || null);
		}
		setIsLoading(false);
	}, []);

	const handleDelete = (id: string) => {
		if (confirm('本当にこの名言を削除しますか？')) {
			const updatedQuotes = deleteQuote(id);
			setQuotes(updatedQuotes);
			if (selectQuote?.id === id) {
				setSelectQuote(null);
				setSelectedQuoteId(null);
			}
		}
	};

	const handleSelectQuote = (quote: Quote | null) => {
		setSelectQuote(quote);
		setSelectedQuoteId(quote ? quote.id : null);
	};

	return (
		<>
			<Navigation />
			<main className="main-container">
				<div className="content-wrapper">
					<header className="header">
						<h1 className="title">
							<span className="title-gradient">名言コレクション</span>
						</h1>
						<p className="subtitle">登録された名言の一覧</p>
					</header>

					<div className="max-w-6xl mx-auto">
						{isLoading ? (
							<div className="text-center py-12 text-gray-500">
								読み込み中...
							</div>
						) : quotes.length === 0 ? (
							<div className="text-center py-12">
								<p className="text-lg mb-6">名言がまだ登録されていません。</p>
								<Link href="/quotes/register">
									<button className="submit-button">
										最初の名言を登録する
									</button>
								</Link>
							</div>
						) : (
							<div className={styles.quoteList}>
								{quotes.map((quote) => (
									<div
										key={quote.id}
										className={`${styles.quoteListItem} ${quote.id === selectQuote?.id ? styles.selected : ''
											}`}
									>
										<div className={styles.textContainer}>
											<p className={styles.text} title={quote.text}>
												"{quote.text}"
											</p>
											{quote.author && (
												<p className={styles.author}>- {quote.author}</p>
											)}
										</div>
										<div className={styles.actions}>
											<button
												onClick={() => handleDelete(quote.id)}
												className={styles.deleteBtn}
												aria-label="削除"
											>
												削除
											</button>
											{quote.id === selectQuote?.id ? (
												<button
													onClick={() => handleSelectQuote(null)}
													className={styles.selectBtn}
													aria-label="選択"
												>
													選択解除
												</button>
											) : (
												<button
													onClick={() => handleSelectQuote(quote)}
													className={styles.selectBtn}
													aria-label="選択"
												>
													選択
												</button>
											)}
										</div>
									</div>
								))}

								<div className="mt-8 text-center">
									<Link href="/quotes/register">
										<button className="quote-btn text-base px-6 py-2">
											+ 新しい名言を追加
										</button>
									</Link>
								</div>
							</div>
						)}
					</div>
				</div>
			</main>
		</>
	);
}
