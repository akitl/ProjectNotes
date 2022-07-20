// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { NodeDependenciesProvider } from './NodeDependenciesProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "projectnotes" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('projectnotes.createNote', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user

		// Get the active editor
		let editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('No editor is active');
			return; // No open text editor
		}

		// Get the active document
		let document = editor.document;
		//get the current file
		let currentFile = document.fileName;
		//get the current file name
		let currentFileName = currentFile.split("/").pop();
		//get the current file name without path

		//get the current workspace path
		let currentWorkspace = vscode.workspace.getWorkspaceFolder(document.uri);
		//get the current workspace path
		let currentWorkspacePath = currentWorkspace?.uri.path;


		vscode.window.createTreeView('nodeDependencies', {
			treeDataProvider: new NodeDependenciesProvider(""),
		  });


		let panel = vscode.window.createWebviewPanel(
			'PageNote',
			'PageNote',
			vscode.ViewColumn.Two,
			{
				enableScripts: true,
				retainContextWhenHidden: true,
			}
		);


		// create new markdown file
		let newFile = currentWorkspacePath + "/.notes/" + currentFileName + ".md";
		//create new markdown file
		let uint = Uint8Array.from("", c => c.charCodeAt(0));
		vscode.workspace.fs.writeFile(vscode.Uri.file(newFile), uint).then(() => {
			//open new markdown file
			vscode.workspace.openTextDocument(newFile).then(doc => {

				vscode.window.showTextDocument(doc);
				vscode.window.showInformationMessage('create new note for ' + currentFileName);
			}
			);
		}
		);




		


	});


	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
