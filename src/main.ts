import { App } from './ui/app';

document.addEventListener('DOMContentLoaded', () => {
  const appElement = document.getElementById('app');
  if (appElement) {
    const app = new App(appElement);
    app.render();
  }
});
