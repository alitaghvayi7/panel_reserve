"use client";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";
import { ClassAttributes, LegacyRef, useRef } from "react";

const editorConfiguration = {
  toolbar: [
    "heading",
    "|",
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
    "blockQuote",
    "insertTable",
    "mediaEmbed",
    "undo",
    "redo",
  ],
};

function CustomEditor({ initialData }: { initialData?: string }) {
  return (
    <CKEditor
      editor={Editor}
      config={{
        toolbar: [
          "heading",
          "|",
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
          "blockQuote",
          "insertTable",
          "mediaEmbed",
          "undo",
          "redo",
        ],
        image: {
          upload: {
            types: ["image/png", "image/jpeg"],
          },
        },
      }}
      onChange={(event, editor) => {
        const data = editor.getData();

        console.log({ event, editor, data });
      }}
    />
  );
}

export default CustomEditor;
