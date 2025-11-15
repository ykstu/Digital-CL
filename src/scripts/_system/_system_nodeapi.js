const ipcRenderer = window.require('electron').ipcRenderer

export const setMainView =(mode,url) => {ipcRenderer.invoke('set-main-view', mode, url).then(r => {})}