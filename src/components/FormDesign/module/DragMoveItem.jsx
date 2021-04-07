import React from 'react';
import {
    CopyOutlined,
    DeleteOutlined
} from '@ant-design/icons';

function DragMoveItem(props) {
    const { hideModel, handleSetSelectItem, onDelete, record = {}, selectItem = {} } = props
    const active = record.key && record.key === selectItem.key

    const onSelect = (e) => {
        e.stopPropagation()
        handleSetSelectItem && handleSetSelectItem(record)
    }

    return (
        <div className={`drag-move-box ${active ? 'active' : ''}`} onClick={onSelect}>
            <div className="form-item-box">{props.children}</div>
            {hideModel ? null : <div className="show-key-box"> {record.model}</div>}
            <div className={`copy ${active ? 'active' : 'unactivated'}`}>
                <CopyOutlined />
            </div>
            <div className={`delete ${active ? 'active' : 'unactivated'}`} onClick={onDelete}>
                <DeleteOutlined />
            </div>
        </div>
    );
}

export default DragMoveItem;
