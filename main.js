import { app, BaseWindow, WebContentsView, Menu, ipcMain } from 'electron/main'

let win,mainView,headerView,footerView;

const createWindow = () => {
  win = new BaseWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 300,
    title: 'Digital CL',
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      height: 30,
      color: '#222',
      symbolColor: '#fff'
    },
    webPreferences: {
      webSecurity: false,
      contentSecurityPolicy: `default-src 'self' 'unsafe-eval' 'unsafe-inline';script-src 'self' 'unsafe-eval' 'unsafe-inline' electron:;style-src 'self' 'unsafe-inline';img-src 'self' data:;`,
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true
    }
  })

  headerView = new WebContentsView({webPreferences: {nodeIntegration: true,contextIsolation: false}});
  headerView.setBounds({ x: 0, y: 0, width: 800, height: 100 });
  headerView.webContents.loadFile('src/pages/_/mainHeader.html').then(r => {});
  mainView = new WebContentsView({webPreferences: {nodeIntegration: true,contextIsolation: false}});
  mainView.setBounds({ x: 0, y: 100, width: 800, height: 460 });
  mainView.webContents.loadFile('src/pages/_example.html').then(r =>{} );
  footerView = new WebContentsView({webPreferences: {nodeIntegration: true,contextIsolation: false}});
  footerView.setBounds({ x: 0, y: 560, width: 800, height: 40 });
  footerView.webContents.loadFile('src/pages/_/mainFooter.html').then(r => {});
  win.contentView.addChildView(headerView);
  win.contentView.addChildView(mainView);
  win.contentView.addChildView(footerView);

  win.on('resize', () => {
    const winBounds = win.getBounds()
    headerView.setBounds({x: 0,y: 0,width: winBounds.width,height: 100})
    mainView.setBounds({x: 0,y: 100,width: winBounds.width,height: winBounds.height - 140})
    footerView.setBounds({x: 0,y: winBounds.height - 40,width: winBounds.width,height: 40})
  })
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

ipcMain.handle('set-main-view', async (event, mode,url) => {
  if (mode === 'url'){
    await mainView.webContents.loadURL(url)
  }
  else if (mode === 'file'){
    await mainView.webContents.loadFile(url)
  }
})