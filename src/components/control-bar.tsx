"use client";
import { GenerateComponentResponse } from "hydra-ai/dist/hydra-ai/model/generate-component-response";
import { Navigation } from "lucide-react";
import { FormEvent, ReactElement, useEffect, useState } from "react";
import hydra, { initHydraRegistration } from "../hydra-client";

export default function ControlBar() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string | null>();
  const [resultComponent, setResultComponent] = useState<ReactElement | string | null>();
  const [resultText, setResultText] = useState<string | null>();
  const [error, setError] = useState<boolean>(false);
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    initHydraRegistration();
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  useEffect(() => {

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      } else if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setIsModalOpen(true);
        setTimeout(() => {
          inputRef?.focus();
        }, 0);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [inputRef]);

  const handleProgressUpdate = (progress: GenerateComponentResponse) => {
    if (progress.component) {
      setResultComponent(progress.component);
    }
    if (progress.message) {
      setResultText(progress.message);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;

    setIsLoading(true);
    setSearch(inputValue);
    setInputValue("");
    setResultComponent(null);
    setResultText(null);
    setError(false);
    try {
      const response = await hydra.generateComponent(inputValue, handleProgressUpdate);
      if (!response) {
        setResultComponent("No result found");
      }
    } catch (err) {
      setError(true);
      console.error(err);
      setResultComponent("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full max-w-[500px] p-4 bg-white rounded-xl mb-8 flex items-center justify-between text-gray-800 hover:bg-white/[.9] transition-colors"
      >
        <div className="flex items-center">
          <Navigation className="mr-3" size={20} />
          <span className="text-md text-gray-400">What do you want to do?</span>
        </div>
        <div className="text-xs bg-gray-100 px-2 py-1 rounded">
          {isMac ? '⌘ K' : 'Ctrl K'}
        </div>
      </button>

      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 m-2"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="w-full max-w-[500px]  rounded-lg "
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit} className="relative mb-4 shadow-xl">
              <input
                type="text"
                placeholder="What do you want to do?"
                className="w-full pl-12 h-12 py-7 rounded-lg bg-background text-foreground focus:outline-none"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                ref={(el) => setInputRef(el)}
                autoFocus
              />
              <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800" size={20} />
            </form>
            <div className="w-full p-8 bg-background border-black/[.08] dark:border-white/[.145] border rounded-lg mt-4">
              {(resultComponent || resultText || isLoading) ? (
                <>
                  {search && (
                    <div
                      className={`font-medium text-md flex flex-row items-center gap-2 ${
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
                  {resultText && <div className="mt-2 text-sm text-gray-800 dark:text-gray-800">{resultText}</div>}
                  {resultComponent && <div className="mt-2">{resultComponent}</div>}
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-800 dark:text-gray-800 mb-4">
                    Describe what you want to do and I&apos;ll find the feature for you and help you use it.
                  </p>
                  
                </>
              )}
              <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
                powered by <a href="https://github.com/michaelmagan/hydraai" className="text-blue-500 hover:text-blue-900 transition-colors ">hydra-ai</a>
              </p>
            </div>
            </div>
        </div>
      )}
    </>
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
