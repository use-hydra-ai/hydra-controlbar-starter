"use client";
import { FormEvent, useState } from "react";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string | null>();
  const [result, setResult] = useState<string | null>();
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;

    setIsLoading(true);
    setSearch(inputValue);
    setInputValue("");
    setResult(null);
    setError(false);

    try {
      if (inputValue === "error") {
        throw new Error("Something went wrong");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setResult(`Result for: ${inputValue}`);
    } catch (err) {
      setError(true);
      setResult("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[800px] p-2 bg-black/[.05] dark:bg-white/[.06] rounded-xl mb-8">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-4 h-12 rounded-xl bg-background text-foreground border border-black/[.08] dark:border-white/[.145]"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
      {(result || isLoading) && (
        <div className="w-full p-4 border-black/[.08] dark:border-white/[.145] border rounded-xl mt-2">
          {search && (
            <div
              className={`font-bold text-sm flex flex-row items-center gap-2 ${
                error ? "text-red-500" : "text-emerald-500"
              }`}
            >
              {isLoading ? (
                <span className="animate-ping inline-flex h-1 w-1 rounded-full bg-emerald-500 opacity-90"></span>
              ) : error ? (
                <div className="inline-flex items-center justify-center p-1 rounded-full bg-red-500">
                  <ErrorIcon className="w-3 h-3 text-white" />
                </div>
              ) : (
                <div className="inline-flex items-center justify-center p-1 rounded-full bg-emerald-500">
                  <CheckIcon className="w-3 h-3 text-white" />
                </div>
              )}
              {search}
            </div>
          )}
          {result && <div className="mt-2">{result}</div>}
        </div>
      )}
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ErrorIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}
