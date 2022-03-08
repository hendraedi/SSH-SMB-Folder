// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "ssh-smb-folder" is now active!');

	let config = vscode.workspace.getConfiguration('sshSmbFolder.connection');
	const name = String (config.get('name'));
	const user = String (config.get('user'));
	const password = String (config.get('password'));
	const host = String (config.get('host'));
	const port = String (config.get('port'));
	const enableKeyFile = Boolean (config.get('enableKeyFile'));
	const keyFile = String (config.get('keyFile'));
	const prefixPath = String (config.get('prefixPath'));
	const delayEx = Number (config.get('delay'));
	let pathFolder = "";

	if(vscode.workspace.workspaceFolders !== undefined) {
		let full = vscode.workspace.workspaceFolders[0].uri.path ;

		let fPath = full.substring(4);
		pathFolder = fPath;
		console.log(" | fspath: " + fPath);
	}
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('ssh-smb-folder.connect', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Start connecting to remote SMB Folder via SSH, Please wait..!');
		createTermina(name, user, password, host, port, enableKeyFile, keyFile, prefixPath, delayEx, pathFolder);
	});
	context.subscriptions.push(disposable);
}

function createTermina(name:string, user: string, password:string, host: string, port: string, enableKeyFile:boolean, keyFile:string, prefixPath:string, delayEx: number, pathFolder:string){
	const terminal = vscode.window.createTerminal(name);
	if(enableKeyFile === true){
		let command = "ssh " + "-i " + keyFile + " " + user + "@" + host + " -p " + port;
		terminal.sendText(command);
	} else {
		let command = "ssh " + user + "@" + host + " -p " + port;
		terminal.sendText(command);
	}
	inPass(delayEx, terminal,password, prefixPath, pathFolder);
}

async function inPass(second: number, terminal: vscode.Terminal, password: String, prefixPath:string, pathFolder:string) {
	for (let index = 0; index < second; index++) {
		console.log(index);
		await sleep(1000);
		if(index === (second - 1)){
			terminal.sendText(""+password);
			inDir(second, terminal, prefixPath, pathFolder);
		}
	}
}

async function inDir(second: number, terminal: vscode.Terminal, prefixPath: String, pathFolder: String) {
	for (let index = 0; index < second; index++) {
		console.log(index);
		await sleep(1000);
		if(index === (second - 1)){
			terminal.sendText("cd "+ prefixPath + "/" + pathFolder);
			terminal.sendText("clear");
			terminal.show();
		}
	}
}

function sleep(ms: number | undefined) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

// this method is called when your extension is deactivated
export function deactivate() {}