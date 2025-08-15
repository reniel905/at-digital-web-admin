"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

const toolbar = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ align: [] }],
  ["link", "blockquote"],
  ["clean"],
];

export default function RichTextEditor({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (html: string) => void;
}) {
  const [content, setContent] = useState<string>(value ?? "");

   const modules = useMemo(
    () => ({
      toolbar: toolbar,
      history: { delay: 1000, maxStack: 100, userOnly: true },
      clipboard: { matchVisual: false },
    }),
    []
  );

  const formats = useMemo(
    () => [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "color",
      "background",
      "list",
      "align",
      "link",
      "code-block",
      "blockquote",
    ],
    []
  );

  return (
    <div className="w-full">
      <ReactQuill
        value={content}
        onChange={(html) => {
          setContent(html);
          onChange?.(html);
        }}
        modules={modules}
        formats={formats}
        placeholder="Start typing…"
        className="rounded-md border border-neutral-300"
      />
    </div>
  );
}
