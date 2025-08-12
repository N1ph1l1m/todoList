import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import store from './store.ts'
import { Provider } from 'react-redux'
import Routers from './routers.tsx'



initTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store ={store}>
      <Routers/>
    </Provider>
  </StrictMode>,
)

function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.body.dataset.theme = savedTheme;
  }
}
