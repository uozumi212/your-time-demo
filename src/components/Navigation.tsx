'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navigation () {
	const pathname = usePathname();

	return (
		<nav className="nav-container">
			<div className="nav-content">
				<div className="flex items-center gap-6">
					<div className="nav-links">
						<Link
							href="/"
							className={`nav-link ${pathname === '/' ? 'active' : ''}`}
						>
							ホーム
						</Link>
						<Link
							href="/quotes"
							className={`nav-link ${pathname === '/quotes' ? 'active' : ''}`}
						>
							名言一覧
						</Link>
						<Link
							href="/quotes/register"
							className={`nav-link ${pathname === '/quotes/register' ? 'active' : ''}`}
						>
							名言登録
						</Link>
					</div>
				</div>
				<ThemeSwitcher />
			</div>
		</nav>
	);
}
