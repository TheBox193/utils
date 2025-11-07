"use strict";

module.exports = {
  "no-to-fixed": {
    create: function (context) {
      return {
        CallExpression: function (node) {
          if (node.callee.property && node.callee.property.name === "toFixed") {
            context.report({
              node: node,
              message:
                "Using toFixed() could lead to rounding errors. Consider using Lodash.round() instead. https://www.sitepoint.com/number-tofixed-rounding-errors-broken-but-fixable/",
            });
          }
        },
      };
    },
  },
};
