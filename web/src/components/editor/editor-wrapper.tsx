/** @format */

"use client";

import dynamic from "next/dynamic";
import CircleLoading from "@/components/ui/circle-loading"; // sửa đường dẫn nếu cần

const LexicalViewer = dynamic(
  () => import("@/components/LoadLexicalJsonString"),
  {
    loading: () => <CircleLoading />,
    ssr: false,
  }
);

interface EditorClientProps {
  jsonString: string;
}

const EditorClientWrapper = ({ jsonString }: EditorClientProps) => {
  return <LexicalViewer jsonContent={jsonString} />;
};

export default EditorClientWrapper;
