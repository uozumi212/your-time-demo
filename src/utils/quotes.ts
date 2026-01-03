const QUOTES_KEY = 'my-quotes';
const SELECTED_QUOTE_ID_KEY = 'selected_quote_id';

export interface Quote {
	id: string;
	text: string;
	author?: string;
}

export function getQuotes (): Quote[] {
	if (typeof window === 'undefined') {
		return [];
	}
	const quotesJson = localStorage.getItem(QUOTES_KEY);
	return quotesJson ? JSON.parse(quotesJson) : [];
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