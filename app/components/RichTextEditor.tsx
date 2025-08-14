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
  ["link", "image", "code-block", "blockquote"],
  ["clean"],
];

export default function RichTextEditor({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (html: string) => void;
}) {
  const [local, setLocal] = useState<string>(value ?? "");
  const [editor, setEditor] = useState<any>(null);

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (!input.files) return;
      const file = input.files[0];

      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch("http://localhost:8080/upload-image", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();

        if (!editor) return;

        const range = editor.getSelection(true);
        editor.insertEmbed(range.index, "image", data.url);
        editor.setSelection(range.index + 1);
      } catch (err) {
        console.error("Image upload failed:", err);
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: toolbar,
        handlers: {
          image: handleImageUpload,
        },
      },
      history: { delay: 1000, maxStack: 100, userOnly: true },
      clipboard: { matchVisual: false },
    }),
    [editor]
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
      "image",
      "code-block",
      "blockquote",
    ],
    []
  );

  return (
    <div className="w-full">
      <ReactQuill
        value={local}
        onChange={(html) => {
          setLocal(html);
          onChange?.(html);
        }}
        onFocus={(range, source, editorInstance) => {
          // store the editor instance when first focused
          if (!editor) {
            setEditor(editorInstance);
          }
        }}
        modules={modules}
        formats={formats}
        placeholder="Start typing…"
        className="rounded-md border border-neutral-300"
      />
    </div>
  );
}
