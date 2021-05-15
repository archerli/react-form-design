import React from 'react';
import {
    CopyOutlined,
    DeleteOutlined
} from '@ant-design/icons';

export const ActionGroup = (props) => {
    const { onDelete, onCopy, active } = props
    return <>
        <div className={`copy ${active ? 'active' : 'unactivated'}`} onClick={onCopy}>
            <CopyOutlined />
        </div>
        <div className={`delete ${active ? 'active' : 'unactivated'}`} onClick={onDelete}>
            <DeleteOutlined />
        </div>
    </>
}

function FormItemDragWrap(props) {
    const { hideModel, onSelect, onDelete, onCopy, active, isEdit = true, data = {} } = props
    // 预览 
    if (!isEdit) return props.children
    
    return (
        <div
            className={`drag-move-box ${active ? 'active' : ''}`}
            onClick={onSelect}
        >
            <div className="form-item-box">{props.children}</div>
            {hideModel || data.hideModel ? null : <div className="show-key-box"> {data.model}</div>}
            <ActionGroup active={active} onDelete={onDelete} onCopy={onCopy} />
        </div>
    );
}

export default FormItemDragWrap;
