/** @format */

"use client";

import {
  LexicalComposer,
  InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useEffect, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { editorConfig } from "./editor/config/editor-config";

interface LexicalViewerProps {
  jsonContent: string;
}

export default function LexicalViewer({ jsonContent }: LexicalViewerProps) {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <ContentLoader jsonContent={jsonContent} />
    </LexicalComposer>
  );
}

function ContentLoader({ jsonContent }: { jsonContent: string }) {
  const [editor] = useLexicalComposerContext();
  const loaded = useRef(false);

  useEffect(() => {
    if (!loaded.current && jsonContent) {
      try {
        const parsed = JSON.parse(jsonContent);
        const newEditorState = editor.parseEditorState(parsed);
        editor.update(() => {
          editor.setEditorState(newEditorState);
          loaded.current = true;
        });
      } catch (err) {
        console.error("Failed to parse editor content", err);
      }
    }
  }, [jsonContent, editor]);

  return (
    <RichTextPlugin
      contentEditable={
        <ContentEditable className="prose dark:prose-invert max-w-none outline-none" />
      }
      placeholder={null}
      ErrorBoundary={LexicalErrorBoundary}
    />
  );
}
