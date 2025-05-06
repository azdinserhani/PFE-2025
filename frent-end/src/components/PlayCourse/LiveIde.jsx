import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Play, RotateCcw } from "lucide-react";

const languages = [
  { id: "javascript", name: "JavaScript" },
  { id: "typescript", name: "TypeScript" },
  { id: "python", name: "Python" },
  { id: "java", name: "Java" },
  { id: "csharp", name: "C#" },
  { id: "cpp", name: "C++" },
  { id: "go", name: "Go" },
  { id: "ruby", name: "Ruby" },
  { id: "php", name: "PHP" },
  { id: "html", name: "HTML" },
  { id: "css", name: "CSS" },
];

const themes = [
  { id: "vs", name: "Light" },
  { id: "vs-dark", name: "Dark" },
  { id: "hc-black", name: "High Contrast Dark" },
  { id: "hc-light", name: "High Contrast Light" },
];

const defaultCode = {
  javascript:
    '// Write your JavaScript code here\n\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("Coder"));',
  typescript:
    '// Write your TypeScript code here\n\nfunction greet(name: string): string {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("Coder"));',
  python:
    '# Write your Python code here\n\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Coder"))',
  java: '// Write your Java code here\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(greet("Coder"));\n    }\n\n    public static String greet(String name) {\n        return "Hello, " + name + "!";\n    }\n}',
  csharp:
    '// Write your C# code here\n\nusing System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine(Greet("Coder"));\n    }\n\n    static string Greet(string name) {\n        return $"Hello, {name}!";\n    }\n}',
  cpp: '// Write your C++ code here\n\n#include <iostream>\n#include <string>\n\nstd::string greet(const std::string& name) {\n    return "Hello, " + name + "!";\n}\n\nint main() {\n    std::cout << greet("Coder") << std::endl;\n    return 0;\n}',
  go: '// Write your Go code here\n\npackage main\n\nimport "fmt"\n\nfunc greet(name string) string {\n    return fmt.Sprintf("Hello, %s!", name)\n}\n\nfunc main() {\n    fmt.Println(greet("Coder"))\n}',
  ruby: '# Write your Ruby code here\n\ndef greet(name)\n  "Hello, #{name}!"\nend\n\nputs greet("Coder")',
  php: '<?php\n// Write your PHP code here\n\nfunction greet($name) {\n    return "Hello, $name!";\n}\n\necho greet("Coder");\n?>',
  html: "<!DOCTYPE html>\n<html>\n<head>\n    <title>My Web Page</title>\n    <style>\n        body {\n            font-family: Arial, sans-serif;\n            text-align: center;\n            margin-top: 50px;\n        }\n        h1 {\n            color: #333;\n        }\n    </style>\n</head>\n<body>\n    <h1>Hello, Coder!</h1>\n    <p>Welcome to your HTML playground.</p>\n</body>\n</html>",
  css: "/* Write your CSS code here */\n\nbody {\n    font-family: Arial, sans-serif;\n    background-color: #f0f0f0;\n    margin: 0;\n    padding: 20px;\n}\n\nh1 {\n    color: #333;\n    text-align: center;\n}\n\n.container {\n    max-width: 800px;\n    margin: 0 auto;\n    background-color: white;\n    padding: 20px;\n    border-radius: 5px;\n    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\n}",
};

export default function CodePlayground() {
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [code, setCode] = useState(defaultCode.javascript);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("editor");

  useEffect(() => {
    setCode(defaultCode[language] || defaultCode.javascript);
  }, [language]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleEditorChange = (value) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput("");
    setActiveTab("output");

    // In a real implementation, you would send the code to a backend service
    // that can safely execute code in various languages.
    // For this demo, we'll simulate output for JavaScript only.

    setTimeout(() => {
      try {
        if (language === "javascript") {
          // Create a safe way to capture console.log output
          let consoleOutput = "";
          const originalConsoleLog = console.log;
          console.log = (...args) => {
            consoleOutput +=
              args
                .map((arg) =>
                  typeof arg === "object"
                    ? JSON.stringify(arg, null, 2)
                    : String(arg)
                )
                .join(" ") + "\n";
          };

          // Execute the code in a try-catch block
          try {
            // eslint-disable-next-line no-new-func
            const result = new Function(code)();
            if (result !== undefined && consoleOutput === "") {
              consoleOutput = String(result);
            }
          } catch (error) {
            consoleOutput = `Error: ${error.message}`;
          }

          // Restore the original console.log
          console.log = originalConsoleLog;
          setOutput(
            consoleOutput || "Code executed successfully with no output."
          );
        } else {
          setOutput(
            `Running ${
              languages.find((l) => l.id === language)?.name
            } code...\n\nNote: In a production environment, this would execute your ${
              languages.find((l) => l.id === language)?.name
            } code on a secure backend and return the results.`
          );
        }
      } catch (error) {
        setOutput(`Error: ${error.message}`);
      } finally {
        setIsRunning(false);
      }
    }, 1000);
  };

  const resetCode = () => {
    setCode(defaultCode[language] || defaultCode.javascript);
    setOutput("");
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Header with controls */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Code Editor
          </h2>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <select
              value={language}
              onChange={handleLanguageChange}
              className="w-full sm:w-[180px] px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
            <select
              value={theme}
              onChange={handleThemeChange}
              className="w-full sm:w-[180px] px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            >
              {themes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "editor"
              ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("editor")}
        >
          Editor
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "output"
              ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("output")}
        >
          Output
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === "editor" ? (
          <div className="border rounded-md h-[400px] overflow-hidden">
            <Editor
              height="400px"
              language={language}
              value={code}
              theme={theme}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: "on",
              }}
            />
          </div>
        ) : (
          <div className="border rounded-md h-[400px] bg-black text-white p-4 font-mono text-sm overflow-auto">
            {output || "Run your code to see the output here."}
          </div>
        )}
      </div>

      {/* Footer with action buttons */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
        <button
          onClick={resetCode}
          disabled={isRunning}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </button>
        <button
          onClick={runCode}
          disabled={isRunning}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center"
        >
          <Play className="mr-2 h-4 w-4" />
          {isRunning ? "Running..." : "Run Code"}
        </button>
      </div>
    </div>
  );
}
