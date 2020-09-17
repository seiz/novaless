//
// LESS Extension for Nova
// main.js
//

const LessService = require('./LessService');

exports.activate = function() {
    const Less = new LessService();

    // "Compile on Save"
    nova.workspace.onDidAddTextEditor(editor => {
        return editor.onWillSave(Less.compileLessUpdate.bind(Less));
    });
};
