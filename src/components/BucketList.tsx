'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import {
	BucketListItem,
	getBucketList,
	addBucketListItem,
	toggleBucketListItem,
	deleteBucketListItem,
} from '@/utils/bucketList';

export default function BucketList () {
	const [items, setItems] = useState<BucketListItem[]>([]);
	const [newItemText, setNewItemText] = useState('');
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setItems(getBucketList());
		setIsLoaded(true);
	}, []);

	const handleAddItem = (e: React.FormEvent) => {
		e.preventDefault();
		if (!newItemText.trim()) return;

		const updatedList = addBucketListItem(newItemText.trim());
		setItems(updatedList);
		setNewItemText('');
	};

	const handleToggleItem = (id: string) => {
		const updatedList = toggleBucketListItem(id);
		setItems(updatedList);
	};

	const handleDeleteItem = (id: string) => {
		if (confirm('このアイテムを削除してもよろしいですか？')) {
			const updatedList = deleteBucketListItem(id);
			setItems(updatedList);
		}
	};

	if (!isLoaded) {
		return <div className="p-4 text-center text-gray-500">Loading...</div>;
	}

	return (
		<div className="w-full max-w-2xl mx-auto px-4">
			<div className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl p-6 md:p-8">
				<form onSubmit={handleAddItem} className="mb-8 relative group">
					<div className="relative flex items-center pl-2">
						<input
							type="text"
							value={newItemText}
							onChange={(e) => setNewItemText(e.target.value)}
							placeholder="死ぬまでにやりたいことは？"
							className="w-full py-4 pl-4 rounded-2xl bg-white/50 dark:bg-black/20 border-2 border-transparent focus:border-purple-500/50 hover:bg-white/80 dark:hover:bg-black/30 transition-all duration-300 outline-none text-gray-800 dark:text-gray-100 placeholder:text-gray-400 text-lg shadow-inner"
						/>
						<button
							type="submit"
							disabled={!newItemText.trim()}
							className="absolute right-3 p-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/30 transform hover:scale-105 active:scale-95 flex items-center justify-center"
							aria-label="追加"
						>
							<Plus size={24} strokeWidth={2.5} />
						</button>
					</div>
				</form>

				<div className="space-y-4">
					{items.length === 0 ? (
						<div className="text-center py-16 px-4 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 bg-white/30 dark:bg-white/5 flex flex-col items-center justify-center">
							<div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
								<Plus size={32} className="text-purple-500/50" />
							</div>
							<p className="text-gray-500 dark:text-gray-400 font-medium text-lg mb-2">リストはまだ空です</p>
							<p className="text-sm text-gray-400 dark:text-gray-500 mt-2 leading-relaxed">
								心に残る夢や目標を<br />書き留めてみましょう
							</p>
						</div>
					) : (
						items.map((item) => (
							<div
								key={item.id}
								className={`group flex items-center justify-between p-4 pl-5 rounded-2xl transition-all duration-300 border ${item.isCompleted
									? 'bg-green-50/50 dark:bg-green-900/10 border-green-200/50 dark:border-green-900/30'
									: 'bg-white/40 dark:bg-gray-800/40 border-white/40 dark:border-gray-700/30 hover:bg-white/60 dark:hover:bg-gray-800/60 hover:shadow-md hover:border-purple-200/50 dark:hover:border-purple-800/30 hover:-translate-y-0.5'
									}`}
							>
								<div
									className="flex items-center gap-4 flex-1 min-w-0 cursor-pointer"
									onClick={() => handleToggleItem(item.id)}
								>
									<button
										className={`flex-shrink-0 transition-all duration-300 transform ${item.isCompleted
											? 'text-green-500 scale-110'
											: 'text-gray-400 group-hover:text-purple-500 dark:text-gray-500'
											}`}
									>
										{item.isCompleted ? (
											<CheckCircle2 size={26} className="fill-current bg-white dark:bg-transparent rounded-full" />
										) : (
											<Circle size={26} strokeWidth={2} />
										)}
									</button>
									<span
										className={`truncate select-all text-lg transition-all duration-300 ${item.isCompleted
											? 'text-gray-400 dark:text-gray-500 line-through decoration-2 decoration-green-200 dark:decoration-green-900'
											: 'text-gray-700 dark:text-gray-200'
											}`}
									>
										{item.text}
									</span>
								</div>
								<button
									onClick={() => handleDeleteItem(item.id)}
									className="ml-4 p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 focus:opacity-100 transform active:scale-90 flex-shrink-0"
									aria-label="削除"
								>
									<Trash2 size={20} />
								</button>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}
