import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Modal } from 'antd';
import FormBuild from '../FormBuild';

function PreviewForm(props) {
    return (
        <FormBuild {...props} />
    );
}

export const PreviewFormModal = forwardRef((props, ref) => {
    const [data, setData] = useState('')
    const [visible, setVisible] = useState(false)

    useEffect(() => {
    }, [])

    useImperativeHandle(ref, () => ({
        open: (data) => {
            setVisible(true)
            setData(data)
        }
    }))

    const onCancel = () => setVisible(false)

    return <Modal
        title="预览"
        footer={null}
        visible={visible}
        onCancel={onCancel}
        destroyOnClose={true}
        style={{ top: '20px' }}
        width="850px"
    >
        <PreviewForm value={data} />
    </Modal>
})

export default PreviewForm;
