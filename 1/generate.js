const fs = require('fs');
const path = require('path');

String.prototype.removeAcento = function () {
    var text = this.toLowerCase();
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    return text;
};

String.prototype.slugify = function () {
    return this.toString().toLowerCase().removeAcento().trim()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
};

const dir = path.join(__dirname, 'ideas');

const read_directory = async dir =>
    fs.readdirSync(dir).reduce((api, file) => {
        filePath = path.join(dir, file);
        console.log(`Arquivo "${filePath}" adicionado a api com sucesso!`);
        const content = require(filePath);
        api.ideas = api.ideas.concat(content);
        api.count++;
        return api;
    }, { "ideas": [], "count": 0 });

read_directory(dir).then(data => {
    fs.writeFileSync(path.join(__dirname, 'ideias.json'), JSON.stringify(data));
});