import { app, BaseWindow, WebContentsView, Menu, ipcMain } from 'electron/main'

let win, mainView, headerView, footerView;

const createWindow = () => {
  win = new BaseWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 300,
    title: 'Digital CL',
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      height: 50,
      color: '#111',
      symbolColor: 'white'
    },
    webPreferences: {
      webSecurity: false,
      contentSecurityPolicy: `default-src 'self' 'unsafe-eval' 'unsafe-inline';script-src 'self' 'unsafe-eval' 'unsafe-inline' electron:;style-src 'self' 'unsafe-inline';img-src 'self' data:;`,
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true
    }
  })
  /**上侧标题栏 */
  headerView = new WebContentsView();
  headerView.setBounds({ x: 0, y: 0, width: 800, height: 50 });
  headerView.webContents.loadFile('src/pages/_/mainHeader.html').then(r => { });
  /**右侧显示栏 */
  mainView = new WebContentsView({ webPreferences: { nodeIntegration: true, contextIsolation: false } });
  mainView.setBounds({ x: 50, y: 50, width: 750, height: 600 });
  mainView.webContents.loadFile('src/pages/_example.html').then(r => { });
  /**左侧工具栏 */
  footerView = new WebContentsView({ webPreferences: { nodeIntegration: true, contextIsolation: false } });
  footerView.setBounds({ x: 0, y: 50, width: 50, height: 600 });
  footerView.webContents.loadFile('src/pages/_/mainFooter.html').then(r => { });

  win.contentView.addChildView(headerView);
  win.contentView.addChildView(mainView);
  win.contentView.addChildView(footerView);

  win.on('resize', () => {
    const winBounds = win.getBounds()
    headerView.setBounds({ x: 0, y: 0, width: winBounds.width, height: 50 })
    mainView.setBounds({ x: 50, y: 50, width: winBounds.width - 50, height: winBounds.height - 50 })
    footerView.setBounds({ x: 0, y: 50, width: 50, height: winBounds.height - 50 })
  })
  //headerView.webContents.openDevTools({ mode: 'undocked' })
  //footerView.webContents.openDevTools({ mode: 'undocked' })
  //mainView.webContents.openDevTools({ mode: 'bottom' })
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  createWindow();
  app.on('activate', () => {
    if (BaseWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.handle('set-main-view', async (event, mode, url) => {
  if (mode === 'url') {
    await mainView.webContents.loadURL(url)
  }
  else if (mode === 'file') {
    await mainView.webContents.loadFile(url)
  }
})