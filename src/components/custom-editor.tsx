"use client";
import React, { useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";

// const CustomEditor = dynamic(
//   () => {
//     return import("@/components/custom-editor");
//   },
//   { ssr: false }
// );

const editorConfiguration = {
  toolbar: [
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "imageUpload",
    "insertTable",
    "mediaEmbed",
    "undo",
    "redo",
  ],
};

function CustomEditor({ onChange }: { onChange: (data: string) => void }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (isMounted) return;
    setIsMounted(true);
  }, [isMounted]);

  return (
    <div className="min-h-[250px]">
      <CKEditor
        editor={Editor}
        config={editorConfiguration}
        data={""}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
}

export default CustomEditor;
