export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'who-theme';

/** Runs in <head> before first paint so a saved light/dark choice never flashes. */
export const themeInitScript = `try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'||t==='dark')document.documentElement.dataset.colorScheme=t}catch(e){}`;
