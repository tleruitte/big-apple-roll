export default {
  extends: ["stylelint-config-standard"],
  plugins: ["stylelint-selector-bem-pattern"],
  rules: {
    "selector-class-pattern": null,
    "custom-property-pattern": null,
    "plugin/selector-bem-pattern": {
      implicitComponents: ["src/components/**/*.css", "src/pages/**/*.css"],
      componentName: /^[a-z][a-zA-Z0-9]+$/,
      componentSelectors: (componentName) => {
        const WORD = "[a-z0-9][a-zA-Z0-9]*";
        const descendant = `(?:-${WORD})?`;
        const modifier = `(?:--${WORD}(?:\\.${componentName}${descendant}--${WORD})*)?`;
        const attribute = String.raw`(?:\[.+\])?`;
        const state = `(?:\\.is-${WORD})*`;
        const body = descendant + modifier + attribute + state;
        return new RegExp(`^\\.${componentName}\\b${body}$`);
      },
      utilitySelectors: /^\.u-(sm-|md-|lg-)?(?:[a-z0-9][a-zA-Z0-9]*)+$/,
    },
  },
};
