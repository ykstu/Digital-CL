import * as _ from './_system/_system_function.js';
import * as N from './_system/_system_nodeapi.js';

_.ae(_.$('#page-home'), 'click', () => {N.setMainView('url','https://zh.minecraft.wiki/');});
_.ae(_.$('#page-news'), 'click', () => {N.setMainView('file','./src/pages/newsPage.html');});
_.ae(_.$('#page-game'), 'click', () => {N.setMainView('file','./src/pages/gamePage.html');});
_.ae(_.$('#page-settings'), 'click', () => {N.setMainView('file','./src/pages/settingsPage.html');});
_.ae(_.$('#page-more'), 'click', () => {N.setMainView('file','./src/pages/morePage.html');});

window.require('electron').ipcRenderer.on('main-view-url-changed', (e, url) => {
    const el = document.getElementById('url')
    if (el) el.textContent = url
  })