import * as _ from '../../_system/_system_function.js';
import * as N from '../../_system/_system_nodeapi.js';

_.ae(_.$('#page-home'), 'click', () => {N.setMainView('url','https://zh.minecraft.wiki/');});
_.ae(_.$('#page-news'), 'click', () => {N.setMainView('url','https://ys.mihoyo.com');});
_.ae(_.$('#page-game'), 'click', () => {N.setMainView('url','https://zzz.mihoyo.com');});
_.ae(_.$('#page-settings'), 'click', () => {N.setMainView('file','./src/pages/_page_settings/settingsPage.html');});
_.ae(_.$('#page-more'), 'click', () => {N.setMainView('file','./src/pages/morePage.html');});
