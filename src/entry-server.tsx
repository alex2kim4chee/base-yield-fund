import ReactDOMServer from 'react-dom/server';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';

export function render(lang: 'ru' | 'en') {
  return ReactDOMServer.renderToString(
    <LanguageProvider initialLanguage={lang}>
      <App />
    </LanguageProvider>
  );
}
