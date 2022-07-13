import React, { useState, useRef } from "react";
import { Editor, EditorState } from "draft-js";

function MyEditor() {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const editor = React.useRef(null);

  //   function focusEditor() {
  //     if (editor.current) {
  //       return editor.current.focus();
  //     }

  //     return;
  //   }

  //   React.useEffect(() => {
  //     focusEditor();
  //   }, []);

  return (
    // <div onClick={focusEditor}>
    <div>
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={(editorState) => setEditorState(editorState)}
      />
    </div>
  );
}

export default MyEditor;
