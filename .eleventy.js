const rmj = require('render-markdown-js');
const moment = require("moment");


module.exports = function (eleventyConfig) {

    eleventyConfig.setTemplateFormats("njk,md,html");
    
    eleventyConfig.addPassthroughCopy('jsons');
    eleventyConfig.addPassthroughCopy('src');
    eleventyConfig.addPassthroughCopy('css');
    eleventyConfig.addPassthroughCopy('js');
    eleventyConfig.addPassthroughCopy('admin');
    eleventyConfig.addPassthroughCopy('assets');
    eleventyConfig.addPassthroughCopy('ELEMENTOS');
    eleventyConfig.addPassthroughCopy('_includes');

    eleventyConfig.addNunjucksFilter("rmj", function (content) {
        return rmj(content);
    });

    eleventyConfig.addNunjucksFilter("limit", function (array, limit) {
        return array.slice(0, limit);
    });

    eleventyConfig.addNunjucksFilter("limitPart", function (array, limit1, limit2) {
        return array.slice(limit1, limit2);
    });

    eleventyConfig.addFilter('log', value => {
        console.log(value)
    });

    eleventyConfig.addFilter("sub_string", function (string) {
        return string.substring(0, 150);
    })

    eleventyConfig.addCollection("propuestas", function (collectionApi) {
        return collectionApi.getFilteredByTag('propuestas');
    });

    eleventyConfig.addCollection("proyectos", function (collectionApi) {
        return collectionApi.getFilteredByTag('proyectos');
    });

    eleventyConfig.addFilter("dateFormat", function(date, format) {
        return moment(date).format(format);
    });


    eleventyConfig.addCollection("expedientes", function(collectionApi) {
        return collectionApi.getAll().filter(item => item.inputPath.startsWith('./src/expedientes/'));
    });

     // Filtro único para obtener valores únicos de una colección
    eleventyConfig.addFilter("unique", function(array, key) {
        const uniqueItems = new Set();
        return array.filter(item => {
        const keyValue = item[key];
        if (!uniqueItems.has(keyValue)) {
            uniqueItems.add(keyValue);
            return true;
        }
        return false;
        });
    });

}