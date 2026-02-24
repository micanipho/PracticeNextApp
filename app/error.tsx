"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

import { useStyles } from "./style/style";

const ErrorBoundary = ({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) => {
  const { styles } = useStyles();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={styles.container}>
      <h2>Something went wrong!</h2>
      <p className={styles.errorMessage}>{error.message || "An unexpected error occurred."}</p>
      <button
        onClick={() => reset()}
        className={styles.retryButton}
      >
        Try again
      </button>
    </div>
  );
}

export default ErrorBoundary;
