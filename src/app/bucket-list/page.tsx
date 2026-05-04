'use client';

import BucketList from '@/components/BucketList';
import Navigation from '@/components/Navigation';

export default function BucketListPage () {
	return (
		<>
			<Navigation />
			<main className="main-container">
				<div className="content-wrapper">
					<header className="header">
						<h1 className="title">
							<span className="title-gradient">Bucket List</span>
						</h1>
						<p className="subtitle">
							死ぬまでにやりたいことリスト
						</p>
					</header>
					<BucketList />
				</div>
			</main>
		</>
	);
}
