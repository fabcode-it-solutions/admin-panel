"use client";

import React, { useEffect, useState } from "react";
import { useCopyToClipboard } from "react-use";
import type { BundledLanguage } from "shiki";
import { codeToHtml } from "shiki";

interface Props {
  children: string
  lang: BundledLanguage
}

function CodeBlockDemo({
  code,
  language,
}: {
  code: string;
  language: BundledLanguage;
}) {
  const [state, copyToClipboard] = useCopyToClipboard();

  const copyCode = () => {
    // Logic to copy `code`
    copyToClipboard(code);
  };
  return (
    <div>
      <div className="relative">
      <CodeBlock lang={language || "ts"}>
        {code}
      </CodeBlock>
        <button
          className="bg-background text-foreground rounded-full px-3.5 py-1.5 absolute top-2 right-2 text-sm font-semibold"
          onClick={copyCode}
        >
          {state.value ? "Copied!" : "Copy code"}
        </button>
      </div>
    </div>
  );
}

export default CodeBlockDemo;


function CodeBlock(props: Props) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    async function highlight() {
      try {
        const out = await codeToHtml(props.children, {
          lang: props.lang || 'ts',
          theme: 'github-dark'
        });
        if (mounted) {
          setHtml(out);
        }
      } catch (e) {
        console.error("Shiki highlight error:", e);
        // Fallback or leave empty
      }
    }
    highlight();
    return () => { mounted = false; };
  }, [props.children, props.lang]);

  if (!html) {
    // Render unhighlighted code as fallback to avoid layout shift or empty space
    return (
      <div className="shiki github-dark" style={{ backgroundColor: '#24292e', color: '#e1e4e8', padding: '1rem', borderRadius: '0.25rem', overflowX: 'auto' }}>
        <pre><code>{props.children}</code></pre>
      </div>
    );
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
