const QUOTES_KEY = 'my-quotes';
const SELECTED_QUOTE_ID_KEY = 'selected_quote_id';

export interface Quote {
	id: string;
	text: string;
	author?: string;
}

const DEFAULT_QUOTES: Quote[] = [
	{ id: 'default-1', text: '同じことを繰り返して異なる結果を期待すること、それが狂気だ。', author: 'アインシュタイン' },
	{ id: 'default-2', text: '学ぶことをやめたとき、あなたは死んでいる。', author: 'アインシュタイン' },
	{ id: 'default-3', text: '楽しいから笑うのではない。笑うから楽しいのだ。', author: 'ウィリアム・ジェームズ' },
	{ id: 'default-4', text: '明日死ぬかのように生きよ。永遠に生きるかのように学べ', author: 'ガンジー' },
]

export function getQuotes (): Quote[] {
	if (typeof window === 'undefined') {
		return [];
	}
	const quotesJson = localStorage.getItem(QUOTES_KEY);
	const storedQuotes = quotesJson ? JSON.parse(quotesJson) : [];
	return storedQuotes.length > 0 ? storedQuotes : DEFAULT_QUOTES;
}

export function getSelectedQuoteId (): string | null {
	if (typeof window === 'undefined') {
		return null;
	}
	return localStorage.getItem(SELECTED_QUOTE_ID_KEY);
}

export function setSelectedQuoteId (id: string | null) {
	if (typeof window === 'undefined') {
		return;
	}
	if (id) {
		localStorage.setItem(SELECTED_QUOTE_ID_KEY, id);
	} else {
		localStorage.removeItem(SELECTED_QUOTE_ID_KEY);
	}
}

export function saveQuotes (quotes: Quote[]) {
	if (typeof window === 'undefined') {
		return;
	}
	localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
}

export function addQuote (text: string, author?: string): Quote[] {
	if (typeof window === 'undefined') {
		return [];
	}
	const quotes = getQuotes();
	const newQuote: Quote = {
		id: Date.now().toString(),
		text,
		author,
	};
	const updatedQuotes = [...quotes, newQuote];
	saveQuotes(updatedQuotes);
	return updatedQuotes;
}

export function deleteQuote (id: string): Quote[] {
	if (typeof window === 'undefined') {
		return [];
	}
	const quotes = getQuotes();
	const updatedQuotes = quotes.filter((quote) => quote.id !== id);
	saveQuotes(updatedQuotes);
	return updatedQuotes;
}