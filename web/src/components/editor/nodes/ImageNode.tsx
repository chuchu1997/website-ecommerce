// components/Lexical/nodes/ImageNode.ts
import { DecoratorNode, LexicalEditor } from "lexical";
import * as React from "react";

type ImagePayload = {
  src: string;
  altText?: string;
};

export class ImageNode extends DecoratorNode<React.JSX.Element> {
  __src: string;
  __altText: string;

  static getType(): string {
    return "image";
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__altText, node.__key);
  }

  static importJSON(serializedNode: any): ImageNode {
    return new ImageNode(serializedNode.src, serializedNode.altText);
  }

  exportJSON(): any {
    return {
      type: "image",
      src: this.__src,
      altText: this.__altText,
      version: 1,
    };
  }

  constructor(src: string, altText = "", key?: string) {
    super(key);
    this.__src = src;
    this.__altText = altText;
  }

  createDOM(): HTMLElement {
    const div = document.createElement("div");
    return div;
  }

  updateDOM(): false {
    return false;
  }

  decorate(): React.JSX.Element {
    return (
      <img
        src={this.__src}
        alt={this.__altText}
        className="rounded-md max-w-full h-auto mx-auto"
      />
    );
  }
}

export function $createImageNode({ src, altText = "" }: ImagePayload): ImageNode {
  return new ImageNode(src, altText);
}

export function $isImageNode(node: unknown): node is ImageNode {
  return node instanceof ImageNode;
}
