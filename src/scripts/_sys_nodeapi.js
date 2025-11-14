// In renderer modules `import { ipcRenderer } from 'electron'` is not allowed
// as a bare specifier. Use `window.require` (available when
// `nodeIntegration: true` and `contextIsolation: false`) to get ipcRenderer.


const ipcRenderer = window.require('electron').ipcRenderer

window.setMainView = async function (mode,url) {
	const res = await ipcRenderer.invoke('set-main-view', mode, url)

}

export const setMainView = window.setMainView
