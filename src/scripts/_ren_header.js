import * as _ from './_sys_funcation.js';
import * as N from './_sys_nodeapi.js';

_.ae(_.$('#page-home'), 'click', () => {N.setMainView('url','https://ys.mihoyo.com');});
_.ae(_.$('#page-news'), 'click', () => {N.setMainView('url','https://minecraft.net');});
_.ae(_.$('#page-game'), 'click', () => {N.setMainView('url','https://zzz.mihoyo.com');});
_.ae(_.$('#page-settings'), 'click', () => {N.setMainView('url','https://bh3.mihoyo.com');});
_.ae(_.$('#page-more'), 'click', () => {N.setMainView('url','https://apple.com.cn');});

