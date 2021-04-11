module.exports = {
    "stories": [
      // Paths to the story files
      "../src/**/*.stories.@(js|tsx|mdx)",
    ],
    "addons": [
      "@storybook/addon-links",
      "@storybook/addon-essentials",
    ],
    typescript: {
      reactDocgen: 'react-docgen-typescript',
      reactDocgenTypescriptOptions: {
        compilerOptions: {
          allowSyntheticDefaultImports: false,
          esModuleInterop: false,
        },
      }
    }
  }