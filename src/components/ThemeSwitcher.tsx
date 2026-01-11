'use client'

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function ThemeSwitcher () {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		requestAnimationFrame(() => {
			setMounted(true);
		});
	}, []);

	if (!mounted) return null;

	return (
		<div className="theme-switcher">
			<button
				onClick={() => setTheme("light")}
				className={`theme-btn ${theme === "light" ? "text-yellow-400" : ""}`}
				aria-label="ライトモード"
			>
				<span style={{ fontSize: '1.2rem' }}>☀️</span>
			</button>
			<button
				onClick={() => setTheme("dark")}
				className={`theme-btn ${theme === "dark" ? "text-blue-400" : ""}`}
				aria-label="ダークモード"
			>
				<span style={{ fontSize: '1.2rem' }}>🌙</span>
			</button>
		</div>
	);
}
