const react = require('react');
// polyfill React for node
global.React = react;
import('@ai-sdk/react').then(ai => {
  console.log("Exports of @ai-sdk/react:", Object.keys(ai));
  // we can't easily call useChat without a react environment, but we can look at its signature if it's a function.
  console.log("useChat string:", ai.useChat.toString().slice(0, 500));
});
