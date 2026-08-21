
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, errorMessage, helperText, id, className = "", ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            "w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder-gray-400",
            "transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
            errorMessage
              ? "border-red-400 focus:ring-red-400"
              : "border-gray-300",
            className,
          ].join(" ")}
          {...props}
        />
        {errorMessage && (
          <p className="text-xs text-red-600">{errorMessage}</p>
        )}
        {helperText && !errorMessage && (
          <p className="text-xs text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
