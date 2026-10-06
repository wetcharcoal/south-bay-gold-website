import { useCallback, useState } from 'react';

const STORAGE_KEY = 'south-bay-gold-theme';

export function useDarkMode() {
    const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

    const toggle = useCallback(() => {
        setIsDark((prev) => {
            const next = !prev;
            document.documentElement.classList.toggle('dark', next);
            try {
                localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
            } catch {
                /* ignore quota / private mode */
            }
            return next;
        });
    }, []);

    return { isDark, toggle };
}
