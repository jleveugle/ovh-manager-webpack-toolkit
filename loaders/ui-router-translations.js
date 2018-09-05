const { getOptions } = require('loader-utils');
const _ = require('lodash');
const fs = require("fs");

module.exports = function (source) {

    let options = getOptions(this);

    let translations = _.get(source.match(/translations\s*:\s*\[([^\]]+)\]/), 1);

    if (translations) {

        translations = translations.split(",").map(x => x.replace(/('|"|\s)/g, "")).filter(x => x);
        translations = translations.filter(t => fs.existsSync(`${options.root}/${t}/translations`))

        let s = `dynamicTranslations($q, $translate, asyncLoader) { const imports = [`;

        translations.forEach((translation) => {
            s += ` import(\`${options.root}/${translation}/translations/Messages_\${$translate.use()}.xml\`).then(i => i.default),`;
        });


        s += `]; imports.forEach(p => asyncLoader.addTranslations(p)); return $q.all(imports).then(() => $translate.refresh()); }`

        if (/resolve\s*:\s*{/.test(source)) {
            source = source.replace(/resolve\s*:\s*{/, `resolve: {\n${s},`);
        } else {
            source = source.replace(/(translations\s*:\s*\[[^\]]+\]\s*,)/, `$1 \nresolve: {\n${s}},`);
        }
    }

    return source;
};
