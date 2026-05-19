const moment = require("moment");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("sub_string", function (str, start = 0, end = 50) {
    if (!str) return "";
    return str.substring(start, end);
  });

  eleventyConfig.addFilter("rmj", function (str) {
    if (!str) return "";
    return str;
  });

  eleventyConfig.addFilter("unique", function (arr, key) {
    if (!Array.isArray(arr)) return arr;
    if (!key) return [...new Set(arr)];
    const seen = new Set();
    return arr.filter((item) => {
      const val = item[key];
      if (seen.has(val)) return false;
      seen.add(val);
      return true;
    });
  });

  eleventyConfig.addFilter("dateFormat", function (date, format) {
    return moment(date).format(format || "DD/MM/YYYY");
  });

  eleventyConfig.addFilter("limit", function (arr, count) {
    if (!Array.isArray(arr)) return arr;
    return arr.slice(0, count);
  });

  eleventyConfig.addFilter("limitPart", function (arr, start, end) {
    if (!Array.isArray(arr)) return arr;
    return arr.slice(start, end);
  });

  return {
    dir: {
      input: "src",
      includes: "../_includes",
      data: "../_data",
      output: "_site",
    },
  };
};
