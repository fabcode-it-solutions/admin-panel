"use client";

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
      <CodeBlock lang="ts">
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


async function CodeBlock(props: Props) {
  const out = await codeToHtml(props.children, {
    lang: props.lang || 'ts',
    theme: 'github-dark'
  })

  return <div dangerouslySetInnerHTML={{ __html: out }} />
}
