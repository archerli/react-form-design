import React, { memo, useEffect } from 'react';
import { TempItem, TextItem, ButtonItem, SwitchItem, HTMLItem } from '../../LayoutFormItem'

function LayoutItem(props) {
    const { index, data = {} } = props

    let RenderItem = () => <></>

    if (data.state === 'temp') {
        RenderItem = TempItem
    } else {
        switch (data.type) {
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

    return (
        <div  >
            <RenderItem {...props} />
        </div>
    );
}

export default LayoutItem;
