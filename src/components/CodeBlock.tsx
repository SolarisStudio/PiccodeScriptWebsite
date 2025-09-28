
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

interface CodeBlockProps {
  code: string;
  title?: string;
}

const CodeBlock = ({ code, title }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    // Register PicCode language
    hljs.registerLanguage('piccode', function(hljs) {
      return {
        name: 'PicCode',
        keywords: {
          keyword: 'catch if else import when is module let in use return',
          built_in: 'await',
          literal: 'true false'
        },
        contains: [
          hljs.COMMENT('//', '$'),
          {
            className: 'string',
            begin: '"',
            end: '"',
            contains: [hljs.BACKSLASH_ESCAPE]
          },
          {
            className: 'number',
            begin: '\\b\\d+(\\.\\d+)?\\b'
          },
          {
            className: 'function',
            beginKeywords: 'function',
            end: '=',
            contains: [
              {
                className: 'title',
                begin: '[a-zA-Z_][a-zA-Z0-9_]*'
              },
              {
                className: 'params',
                begin: '\\(',
                end: '\\)',
                contains: [
                  {
                    className: 'variable',
                    begin: '[a-zA-Z_][a-zA-Z0-9_]*'
                  }
                ]
              }
            ]
          },
          {
            className: 'operator',
            begin: '(\\|>|->|=|\\+|\\-|\\*|\\/|<|>)'
          }
        ]
      };
    });

    // Now highlight the code
    try {
      const result = hljs.highlight(code, { language: 'piccode' });
      setHighlightedCode(result.value);
    } catch (error) {
      console.error('Highlighting error:', error);
      setHighlightedCode(code);
    }
  }, [code]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <Card className="relative overflow-hidden bg-gray-900 border-0 shadow-2xl">
      {title && (
        <div className="px-6 py-3 bg-gray-800 border-b border-gray-700">
          <h3 className="text-sm font-medium text-gray-300">{title}</h3>
        </div>
      )}
      <div className="relative">
        <Button
          onClick={copyToClipboard}
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-700/50 z-10"
        >
          {copied ? 'Copied!' : 'Copy'}
        </Button>
        <pre className="p-6 overflow-x-auto text-sm leading-relaxed text-left">
          <code 
            className="text-gray-300 font-mono block text-left"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>
    </Card>
  );
};

export default CodeBlock;
