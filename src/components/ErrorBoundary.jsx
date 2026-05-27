import React from 'react';

/**
 * React Error Boundary — catches render errors in child components.
 * Renders a minimal fallback so the rest of the page stays functional.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Silent in production; log in dev
    if (import.meta.env.DEV) {
      console.warn('[ErrorBoundary]', error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-[200px] flex items-center justify-center"
          aria-hidden="true"
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
