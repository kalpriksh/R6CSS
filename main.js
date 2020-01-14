const electron = require('electron');
const url = require('url');
const path = require('path');
const  {app, BrowserWindow, Menu, ipcMain} = electron;


//set env
process.env.NODE_ENV = '';

let mainWindow;
let newWindow;

app.on('ready', async () => {
    mainWindow = new BrowserWindow({
        webPreferences:{
            nodeIntegration:true
        },
        frame:false
    });

    //loading html
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'mainWindow.html'),
        protocol:'file:',
        slashes:true
    }));

    //quit from main window
    mainWindow.on('close',()=>{
        app.quit();
    })

    //building menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    //insert menu
    Menu.setApplicationMenu(mainMenu);
})


addNewWindow = () =>{
    newWindow = new BrowserWindow({
        height:200,
        width:200,
        title:'add item',
        webPreferences:{
            nodeIntegration:true
        },
        frame:false
    });

    //loading html
    newWindow.loadURL(url.format({
        pathname: path.join(__dirname,'addWindow.html'),
        protocol:'file:',
        slashes:true
    }));

    //building menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    //insert menu
    Menu.setApplicationMenu(mainMenu);
}

//catch item:add
ipcMain.on('item:add',(e,item) =>{
    console.log(item);
    mainWindow.webContents.send('item:add',item);
    newWindow.close();
})

const mainMenuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label:'Add Item',
                click(){
                    addNewWindow();
                }
            },
            {
                label:'Clear Items',
                click(){
                    mainWindow.webContents.send('app:init',"nope");
                }
            },
            {
                label:'Quit',
                accelerator: process.platform ==  "darwin" ? 'Command+Q' : 'Ctrl+Q',//to add shortcuts
                click(){
                    app.quit();
                }
            }
        ]
    }
];

// if mac, add empty object to menu
if(process.platform == "darwin") {
    mainMenuTemplate.unshift({});
}

//add dev tools if not in production
if(process.env.NODE_ENV != 'production'){
    mainMenuTemplate.push({
        label:'Developer Tools',
        submenu:[
            {
                label:'toggle DevTools',
                accelerator: process.platform ==  "darwin" ? 'Command+I' : 'F12',//to add shortcuts
                click(item,focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            // {
            //     label:'Inspect element',
            //     accelerator: process.platform ==  "darwin" ? 'Command+I' : 'Ctrl+Shift+I',
            //     click(item,focusedWindow){
            //         focusedWindow.();
            //     }
            // },
            {
                role: 'reload'
            }
        ]
    })
}