// Import the global style enabling tailwind classes
import '../src/styles/base.css'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort : {
      order: ['Intro', 'components']
    }
  }
}