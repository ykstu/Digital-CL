import { app, BaseWindow, WebContentsView, Menu, ipcMain } from 'electron/main'

let win;
let mainView;
const createWindow = () => {
  win = new BaseWindow({
    width: 800,
    height: 600,
    title: 'Digital CL',
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      height: 30,
      color: '#222',
      symbolColor: '#fff'
    },
    webPreferences: {
      webSecurity: false,
      contentSecurityPolicy: `
      default-src 'self' 'unsafe-eval' 'unsafe-inline';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' electron:;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data:;
    `,
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true
    }
  })

  //头部工具栏
  const headerView = new WebContentsView({webPreferences: {nodeIntegration: true,contextIsolation: false}})
  headerView.setBounds({ x: 0, y: 0, width: 800, height: 80 })
  headerView.webContents.loadFile('src/pages/mainHeader.html')
  //中部显示栏目
  mainView = new WebContentsView({webPreferences: {nodeIntegration: true,contextIsolation: false}})
  mainView.setBounds({ x: 0, y: 80, width: 800, height: 480 })
  mainView.webContents.loadFile('src/pages/_example.html')
  //底部任务栏
  const footerView = new WebContentsView({webPreferences: {nodeIntegration: true,contextIsolation: false}})
  footerView.setBounds({ x: 0, y: 560, width: 800, height: 40 })
  footerView.webContents.loadFile('src/pages/mainFooter.html')
  
  win.contentView.addChildView(headerView)
  win.contentView.addChildView(mainView)
  win.contentView.addChildView(footerView)

  win.on('resize', () => {
    const winBounds = win.getBounds()
    headerView.setBounds({x: 0,y: 0,width: winBounds.width,height: 80})
    mainView.setBounds({x: 0,y: 80,width: winBounds.width,height: winBounds.height - 120})
    footerView.setBounds({x: 0,y: winBounds.height - 40,width: winBounds.width,height: 40})
  })


  //win.webContents.openDevTools({ mode: 'bottom' })
  //headerView.webContents.openDevTools({ mode: 'undocked' })
  mainView.webContents.openDevTools({ mode: 'undocked' })

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
    mainView.webContents.loadURL(url)
  }
  else if (mode === 'file'){
    mainView.webContents.loadFile(url)
  }
})