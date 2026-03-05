import { useState, useEffect, type ReactNode } from 'react';
import { ThemeContext, type Theme } from './ThemeContextObject';

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
        const saved = localStorage.getItem('theme') as Theme | null;
        return saved || 'system';
    });

    const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() =>
        typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    );

    const resolvedTheme = theme === 'system' ? systemTheme : theme as 'light' | 'dark';

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(resolvedTheme);
        localStorage.setItem('theme', theme);
    }, [theme, resolvedTheme]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const value = { theme, setTheme, resolvedTheme };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}