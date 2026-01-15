"use client";
import { CodeBlock } from "react-code-block";
import { useCopyToClipboard } from "react-use";

function CodeBlockDemo({ code, language }: { code: string; language: string }) {
  const [state, copyToClipboard] = useCopyToClipboard();

  const copyCode = () => {
    // Logic to copy `code`
    copyToClipboard(code);
  };

  return (
    <CodeBlock code={code} language={language}>
      <div className="relative">
        <CodeBlock.Code className="bg-accent p-6! pt-12! rounded-xl shadow-lg">
          <div className="table-row">
            <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-accent-foreground text-right select-none" />
            <CodeBlock.LineContent className="table-cell ">
              <CodeBlock.Token className="text-accent-foreground" />
            </CodeBlock.LineContent>
          </div>
        </CodeBlock.Code>

        <button
          className="bg-background text-foreground rounded-full px-3.5 py-1.5 absolute top-2 right-2 text-sm font-semibold"
          onClick={copyCode}
        >
          {state.value ? "Copied!" : "Copy code"}
        </button>
      </div>
    </CodeBlock>
  );
}

export default CodeBlockDemo;
