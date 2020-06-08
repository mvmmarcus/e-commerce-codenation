import React from "react";

import "./loading.css";

export default function Loading() {
  return (
    <div data-testid="loading" className="loading">
      <div className="loading__indeterminate"></div>
    </div>
  );
}
