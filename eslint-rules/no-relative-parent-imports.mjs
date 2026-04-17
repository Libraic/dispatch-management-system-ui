import path from "path";

export const noRelativeParentImports = {
  meta: {
    type: "suggestion",
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          rootDir: { type: "string" },
          prefix: { type: "string" },
        },
      },
    ],
  },
  create(context) {
    const options = context.options[0] || {};
    const rootDir = options.rootDir || process.cwd();
    const prefix = options.prefix || "#";

    return {
      ImportDeclaration(node) {
        const source = node.source.value;

        // Only handle relative parent imports
        if (!source.startsWith("../")) return;

        const filePath = context.filename;
        const fileDir = path.dirname(filePath);
        const absoluteImport = path.resolve(fileDir, source);

        // Only rewrite if the target is inside rootDir
        const normalizedRoot = rootDir.endsWith(path.sep)
          ? rootDir
          : rootDir + path.sep;

        if (!absoluteImport.startsWith(normalizedRoot)) return;

        // Build the # path
        const relative = path.relative(rootDir, absoluteImport);
        const fixed = `${prefix}/${relative}`;

        context.report({
          node: node.source,
          message: `Use '${fixed}' instead of '${source}'`,
          fix(fixer) {
            return fixer.replaceText(node.source, `"${fixed}"`);
          },
        });
      },
    };
  },
};
