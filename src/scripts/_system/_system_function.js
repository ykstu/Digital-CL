export const $ = (el) => document.querySelector(el);
export const $$ = (el) => document.querySelectorAll(el);
export const ae = (el, ev, fn) => el.addEventListener(ev, fn);
export const re = (el, ev, fn) => el.removeEventListener(ev, fn);