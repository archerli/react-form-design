import React from 'react';
import ReactQuill from 'react-quill'
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import './index.less'

function RichEditor(props) {
  const { data, config, form, dynamicData = {} } = props
  const { defaultValue, dynamic, dynamicKey, chinesization, placeholder, width, height } = data.options || {}

  return (
    <ReactQuill
      className={`ql-editor-class ${chinesization ? 'chinesization' : ''}`}
      style={{ ...props.style, height: `${height}px` }}
      disabled={props.disabled}
      options={{
        placeholder
      }}
    />
  );
}

export default RichEditor;
