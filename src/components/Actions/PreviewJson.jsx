import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Modal } from 'antd';
import CodeMirror from 'react-codemirror'
import 'codemirror/mode/javascript/javascript';

function PreviewJson(props) {
    const { editorJson } = props
    return (
        <div>
            <div className="json-box-9136076486841527">
                <CodeMirror
                    // style={{ height: '100%' }}
                    className="json-code-mirror"
                    value={editorJson}
                    options={{
                        mode: 'javascript',
                        // theme: 'material',
                        lineNumbers: true
                    }}
                />
            </div>
            <div className="copy-btn-box-9136076486841527">

            </div>
        </div>
    );
}

export const PreviewJsonModal = forwardRef((props, ref) => {
    const [editorJson, setEditorJson] = useState('')
    const [visible, setVisible] = useState(false)

    useEffect(() => {
    }, [])

    useImperativeHandle(ref, () => ({
        open: (data) => {
            setVisible(true)
            setEditorJson(JSON.stringify(data, null, "\t"))
        }
    }))

    const onCancel = () => setVisible(false)

    return <Modal
        title="JSON数据"
        footer={null}
        visible={visible}
        onCancel={onCancel}
        destroyOnClose={true}
        wrapClassName="code-modal-9136076486841527"
        style={{ top: '20px' }}
        width="850px"
    >
        <PreviewJson
            editorJson={editorJson}
        />
    </Modal>
})

export default PreviewJson;
