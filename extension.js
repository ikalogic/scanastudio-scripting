// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
var fs = require('fs');
const { time } = require('console');
//
//const data = require('');
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    //"editor.suggest.showWords": false

    vscode.workspace.getConfiguration()
        .update('editor.suggest.showWords', false, vscode.ConfigurationTarget.Global);

    var obj = JSON.parse(fs.readFileSync(context.extensionPath + '/resources/scanastudio.templates.json', 'utf8'));
    //console.log(obj);
    for (var i = 0; i < obj.length; i++) {
        //console.log(obj[i].body[0]);
    }

    const provider1 = vscode.languages.registerCompletionItemProvider('javascript', {

        provideCompletionItems(document, position, token, context) {

            // a simple completion item which inserts `Hello World!`
            //const simpleCompletion = new vscode.CompletionItem('Hello World!');

            // a completion item that inserts its text as snippet,
            // the `insertText`-property is a `SnippetString` which will be
            // honored by the editor.
            // const snippetCompletion = new vscode.CompletionItem('Good part of the day');
            // snippetCompletion.insertText = new vscode.SnippetString('Good ${1|morning,afternoon,evening|}. It is ${1}, right?');
            // snippetCompletion.detail = "documention for good day";


            // const docs = new vscode.MarkdownString("Inserts a snippet that lets you select [link](x.ts).");
            // snippetCompletion.documentation = docs;
            // docs.baseUri = vscode.Uri.parse('http://example.com/a/b/c/');

            // a completion item that can be accepted by a commit character,
            // the `commitCharacters`-property is set which means that the completion will
            // be inserted and then the character will be typed.
            const commitCharacterCompletion = new vscode.CompletionItem('ScanaStudio');
            commitCharacterCompletion.detail = "Global ScanaStudio object";
            commitCharacterCompletion.kind = vscode.CompletionItemKind.Class;
            commitCharacterCompletion.commitCharacters = ['.'];
            commitCharacterCompletion.documentation = new vscode.MarkdownString('Access all methods related to ScanaStudio.');
            commitCharacterCompletion.sortText = '0';

            // a completion item that retriggers IntelliSense when being accepted,
            // the `command`-property is set which the editor will execute after 
            // completion has been inserted. Also, the `insertText` is set so that 
            // a space is inserted after `new`
            // const commandCompletion = new vscode.CompletionItem('new');
            // commandCompletion.kind = vscode.CompletionItemKind.Keyword;
            // commandCompletion.insertText = 'new ';
            // commandCompletion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };

            // return all completion items as array
            var completion_items = [];
            completion_items.push(commitCharacterCompletion);



            for (var i = 0; i < obj.length; i++) {
                //console.log(obj[i].body[0]);
                var itm = new vscode.CompletionItem(obj[i].prefix);
                itm.detail = obj[i].desc;
                itm.kind = vscode.CompletionItemKind.Snippet;
                var snip_string = obj[i].body[0];
                for (var b = 1; b < obj[i].body.length; b++) {
                    snip_string += "\n" + obj[i].body[b];
                }
                itm.insertText = new vscode.SnippetString(snip_string);
                itm.documentation = new vscode.MarkdownString(obj[i].desc);
                completion_items.push(itm)
            }


            return completion_items;

        }
    });

    const provider2 = vscode.languages.registerCompletionItemProvider('javascript', {
        provideCompletionItems(document, position) {

            // get all text until the `position` and check if it reads `console.`
            // and if so then complete if `log`, `warn`, and `error`
            const linePrefix = document.lineAt(position).text.substr(0, position.character);
            if ((linePrefix.toLowerCase().indexOf("scanastudio.") >= 0)) {

                var completion_items = [];
                var obj = JSON.parse(fs.readFileSync(context.extensionPath + '/resources/scanastudio.snippets.json', 'utf8'));
                for (var i = 0; i < obj.length; i++) {
                    //console.log(obj[i].body[0]);
                    var itm = new vscode.CompletionItem(obj[i].prefix);
                    itm.preselect = true;

                    itm.detail = "Context: " + obj[i].context;
                    itm.kind = vscode.CompletionItemKind.Method;
                    var snip_string = obj[i].body[0];
                    for (var b = 1; b < obj[i].body.length; b++) {
                        snip_string += "\n" + obj[i].body[b];
                    }

                    itm.insertText = new vscode.SnippetString(snip_string);
                    itm.documentation = new vscode.MarkdownString(obj[i].desc);
                    itm.sortText = '00';
                    completion_items.push(itm)
                }

                return completion_items;
            }
            else {
                return undefined;
            }
        }
    },
        '.', // triggered whenever a '.' is being typed
    );

    context.subscriptions.push(provider1, provider2);
}



// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
    activate,
    deactivate
}
