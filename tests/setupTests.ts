// Polyfills and mocks for test environment
import { JSDOM } from "jsdom";

if (typeof window !== "undefined") {
  // noop
}

// Mock matchMedia
Object.defineProperty(globalThis, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false
  })
});

// Mock next/image to return an img tag for tests
jest.mock("next/image", () => {
  return function Image(props: any) {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  };
});
