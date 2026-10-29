const {app,BrowserWindow,shell}=require('electron');
const path=require('path');
function create(){
  const w=new BrowserWindow({width:1280,height:800,title:'SAMTECH ELECTRONICS',icon:path.join(__dirname,'icon-512.png'),autoHideMenuBar:true,webPreferences:{contextIsolation:true}});
  w.setMenuBarVisibility(false);
  w.webContents.setWindowOpenHandler(({url})=>{if(/^(https?|sms|tel|mailto):/.test(url))shell.openExternal(url);return{action:'deny'}});
  w.webContents.on('will-navigate',(e,url)=>{if(!url.startsWith('file:')){e.preventDefault();shell.openExternal(url)}});
  w.loadFile('index.html');
}
app.whenReady().then(()=>{create();app.on('activate',()=>{if(!BrowserWindow.getAllWindows().length)create()})});
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit()});
