"use strict";

const hasPunctuator = (node, char) => {
  return node.parent.tokens.filter(({ type, value }) => type === "Punctuator" && value === char).length > 0;
};

module.exports = {
  "lodash-import": {
    meta: {
      docs: {},
      fixable: "code",
      schema: [],
    },
    create: (context) => ({
      ImportDeclaration(node) {
        const { source } = node;
        const sourceSegments = source.value.split("/");

        // If we have two segments, we're already good.
        if (sourceSegments.length > 1) {
          return;
        }

        if (sourceSegments[0] === "lodash") {
          if (hasPunctuator(node, "{") && hasPunctuator(node, "}")) {
            const preferredImport = source.value;

            if (node.specifiers.length && node.specifiers[0].imported) {
              const moduleName = node.specifiers[0].imported.name;
              context.report({
                node,
                message: `Only default exported imports are allowed here. Try import ${moduleName} from '${preferredImport}/${moduleName}'.`,
                fix: (fixer) => {
                  const replacement = node.specifiers.map(
                    (specifier) =>
                      `import ${specifier.imported.name} from '${preferredImport}/${specifier.imported.name}'\n`,
                  );
                  return fixer.replaceText(node, replacement.join(""));
                },
              });
            }
          }
        }
      },
    }),
  },
};
