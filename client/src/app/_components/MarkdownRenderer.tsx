import React, { useRef, useMemo, useState } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from 'lucide-react';

interface MarkdownRendererProps {
  markdown: string;
  syntaxStyle?: any;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  markdown,
  syntaxStyle = atomDark,
}) => {
  const ref = useRef<SyntaxHighlighter>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(id);
      setTimeout(() => setCopied(null), 1500); // Reset after 1.5s
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const components = useMemo<Components>(
    () => ({
      code({ node, className, children, ...props }: any) {
        const match = /language-(\w+)/.exec(className || '');
        const language = match ? match[1] : 'text'; // Default to 'text' if language is not found
        const codeString = String(children).replace(/\n$/, '');
        const uniqueId = Math.random().toString(36).substring(7); // Unique ID for tracking copied state

        return (
          <div className="relative group">
            <button
              onClick={() => handleCopy(codeString, uniqueId)}
              className="absolute right-2 top-2 bg-gray-700 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
            >
              {copied === uniqueId ? <Check size={16}/> : <Copy size={16} />}
            </button>
            <SyntaxHighlighter
              ref={ref}
              style={syntaxStyle}
              language={language}
              PreTag="div"
              {...props}
            >
              {codeString}
            </SyntaxHighlighter>
          </div>
        );
      },
    }),
    [syntaxStyle, copied] // Recompute when syntaxStyle or copied state changes
  );

  return <ReactMarkdown className="w-[300px] xl:w-full" components={components}>{markdown}</ReactMarkdown>;
};

export default MarkdownRenderer;
