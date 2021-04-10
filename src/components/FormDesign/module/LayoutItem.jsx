import React, { memo, useEffect } from 'react';
import { InputItem, TextAreaItem, TextItem, ButtonItem, SwitchItem, HTMLItem, DividerItem, GridItem } from '../../LayoutFormItem'
import DragMoveItem from './DragMoveItem'

function LayoutItem(props) {
    const { index, selectItem, handleSetSelectItem, hideModel, data = {} } = props

    const Component = {
        'input': InputItem,
        'textarea': TextAreaItem,
        'text': TextItem,
        'button': ButtonItem,
        'switch': SwitchItem,
        'html': HTMLItem,
        'divider': DividerItem,
        'grid': GridItem,
    }[data.type] || function () { return <></> }

    const onDelete = (ev) => {
        ev.stopPropagation()
        props.onDelete && props.onDelete(index, data)
    }

    return (
        <div className="drag-move" >
            <DragMoveItem
                record={data}
                selectItem={selectItem}
                hideModel={hideModel}
                handleSetSelectItem={handleSetSelectItem}
                onDelete={onDelete}
            >
                <Component {...props} />
            </DragMoveItem>
        </div>
    );
}

export default LayoutItem;
