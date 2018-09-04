const eau = require('esprima-ast-utils');

const { getOptions } = require('loader-utils');
const fs = require('fs');
const _ = require('lodash');

const acorn = require("acorn")
const walk = require("acorn/dist/walk");

const babelParser = require('@babel/parser');

module.exports = function (source) {
    // const options = getOptions(this);

    // const ast = eau.parse(source);
    // let translationNode, resolveNode;

    babelParser.parse(source, {
        allowImportExportEverywhere: true
    });

    // eau.traverse(ast, (node) => {
    //     if (node.type === 'Property' && node.key.name === 'translations') {
    //         translationNode = node.value;
    //     }

    //     if (node.type === 'Property' && node.key.name === 'resolve') {
    //         resolveNode = node.value;
    //     }
    // });

    // if(translationNode && resolveNode) {
    //     const translationsStr = eau.getCode(translationNode);
    //     const regExpExtractTranslations = /'(.*?)'/gm;

    //     let translations = translationsStr.match(regExpExtractTranslations);

    //     if(translations) {
    //         translations = _.chain(translations)
    //                             .map(path => path.replace(/'/g, ""))
    //                             .filter(translation => fs.existsSync(`${options.root}/${translation}/translations`))
    //                             .value();
            
    //         console.log(translations);
    //     }

    //     if(translations.length > 0) {
    //         let s = `dynamicTranslations($q, $translate, asyncLoader) {
    //             return $q.all(`;

    //         translations.forEach((translation, index) => {
    //             s += `\nimport(\`${options.root}/${translation}/translations/Messages_\${$translate.use()}.xml\`)
    //                 .then(module => asyncLoader.addTranslations(module.default))${ index === translations.length - 1 ? '' : ','}`;
    //         });

    //         s += `)
    //             .then(() => $translate.refresh()).then(() => true)
    //         }`

    //         const searchCode = eau.getCode(resolveNode);
    //         const code = searchCode.replace(/\}$/, `${s}}`);

    //         return source.replace(searchCode, code);
    //     }
    // }

    return source;    
};