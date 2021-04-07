import React, { memo, useEffect } from 'react';
import { TempItem, InputItem, TextAreaItem, TextItem, ButtonItem, SwitchItem, HTMLItem } from '../../LayoutFormItem'
import DragMoveItem from './DragMoveItem'

function LayoutItem(props) {
    const { index, selectItem, handleSetSelectItem, hideModel, data = {} } = props

    let RenderItem = () => <></>

    if (data.state === 'temp') {
        RenderItem = TempItem
    } else {
        switch (data.type) {
            case 'input':
                RenderItem = InputItem
                break           
            case 'textarea':
                RenderItem = TextAreaItem
                break           
            case 'text':
                RenderItem = TextItem
                break
            case 'button':
                RenderItem = ButtonItem
                break
            case 'switch':
                RenderItem = SwitchItem
                break
            case 'html':
                RenderItem = HTMLItem
                break
        }
    }

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
                <RenderItem {...props} />
            </DragMoveItem>
        </div>
    );
}

export default LayoutItem;
