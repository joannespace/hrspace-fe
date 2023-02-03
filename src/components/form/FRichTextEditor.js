import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import RichTextEditor from "../richtexteditor/RichTextEditor";

function FRichTextEditor({ name, type, options, invisibility }) {
  const { control } = useFormContext();
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <RichTextEditor
              editorState={value}
              onChange={onChange}
              type={type}
              options={options}
              invisibility={invisibility}
            />
          );
        }}
      />
    </div>
  );
}

export default FRichTextEditor;
