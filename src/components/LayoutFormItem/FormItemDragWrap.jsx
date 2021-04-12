import React from 'react';
import {
    CopyOutlined,
    DeleteOutlined
} from '@ant-design/icons';

export const ActionGroup = (props) => {
    const { onDelete, active } = props
    return <>
        <div className={`copy ${active ? 'active' : 'unactivated'}`}>
            <CopyOutlined />
        </div>
        <div className={`delete ${active ? 'active' : 'unactivated'}`} onClick={onDelete}>
            <DeleteOutlined />
        </div>
    </>
}

function FormItemDragWrap (props) {
    const { hideModel, onSelect, onDelete, active, data = {} } = props

    return (
        <div
            className={`drag-move-box ${active ? 'active' : ''}`}
            onClick={onSelect}
        >
            <div className="form-item-box">{props.children}</div>
            {hideModel || data.hideModel ? null : <div className="show-key-box"> {data.model}</div>}
            <ActionGroup active={active} onDelete={onDelete} />
        </div>
    );
}

export default FormItemDragWrap;
