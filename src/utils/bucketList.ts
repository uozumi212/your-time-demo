const BUCKET_LIST_KEY = 'my-bucket-list';

export interface BucketListItem {
	id: string;
	text: string;
	isCompleted: boolean;
	createdAt: number;
}

export function getBucketList (): BucketListItem[] {
	if (typeof window === 'undefined') {
		return [];
	}
	const json = localStorage.getItem(BUCKET_LIST_KEY);
	return json ? JSON.parse(json) : [];
}

export function saveBucketList (list: BucketListItem[]) {
	if (typeof window === 'undefined') {
		return;
	}
	localStorage.setItem(BUCKET_LIST_KEY, JSON.stringify(list));
}

export function addBucketListItem (text: string): BucketListItem[] {
	if (typeof window === 'undefined') {
		return [];
	}
	const list = getBucketList();
	const newItem: BucketListItem = {
		id: Date.now().toString(),
		text,
		isCompleted: false,
		createdAt: Date.now(),
	};
	const updatedList = [newItem, ...list];
	saveBucketList(updatedList);
	return updatedList;
}

export function toggleBucketListItem (id: string): BucketListItem[] {
	if (typeof window === 'undefined') {
		return [];
	}
	const list = getBucketList();
	const updatedList = list.map((item) =>
		item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
	);
	saveBucketList(updatedList);
	return updatedList;
}

export function deleteBucketListItem (id: string): BucketListItem[] {
	if (typeof window === 'undefined') {
		return [];
	}
	const list = getBucketList();
	const updatedList = list.filter((item) => item.id !== id);
	saveBucketList(updatedList);
	return updatedList;
}
