// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "ssh-smb-folder" is now active!');
	
	const terminal = vscode.window.createTerminal();
	let config = vscode.workspace.getConfiguration('sshSmbFolder.connection');
	// let delayEx = 0;
	const name = config.get('name');
	const user = config.get('user');
	const password = config.get('password');
	const host = config.get('host');
	const port = config.get('port');
	const enableKeyFile = config.get('enableKeyFile');
	const keyFile = config.get('keyFile');
	const prefixPath = config.get('prefixPath');
	const delayEx = Number (config.get('delay'));
	let connecting = false;
	console.log('Data: '+ JSON.stringify(config));
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

		if(!connecting){
			terminal.show();
			if(enableKeyFile === true){
				let command = "ssh " + "-i " + keyFile + " " + user + "@" + host + " -p " + port;
				terminal.sendText(command);
			} else {
				let command = "ssh " + user + "@" + host + " -p " + port;
				terminal.sendText(command);
			}
			
			inPass(delayEx);
			async function inPass(second: number) {
				for (let index = 0; index < second; index++) {
					console.log(index);
					await sleep(1000);
					if(index === (second - 1)){
						terminal.sendText(""+password);
						inDir(delayEx);
					}
				}
			}
			
			async function inDir(second: number) {
				for (let index = 0; index < second; index++) {
					console.log(index);
					await sleep(1000);
					if(index === (second - 1)){
						terminal.sendText("cd "+ prefixPath + "/" + pathFolder);
					}
				}
			}

			function sleep(ms: number | undefined) {
				return new Promise((resolve) => {
					setTimeout(resolve, ms);
				});
			}
		}
	});
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
