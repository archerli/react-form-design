import React, { memo, useEffect } from 'react';
import {
    InputItem,
    InputNumberItem,
    TextAreaItem,
    TextItem,
    ButtonItem,
    SwitchItem,
    HTMLItem,
    DividerItem,
    GridItem,
    CardItem,
    TabsItem,
    TableItem,
    SelectItem,
    CheckboxGroupItem,
    RadioGroupItem,
    DatePickerItem,
    TimePickerItem,
    RateItem,
    SliderItem,
    UploadFileItem,
    UploadImageItem,
    TreeSelectItem,
    CasaderItem,
    EditorItem,
    DynamicTableItem,
    AlertItem,

} from '../../LayoutFormItem'

function LayoutItem(props) {
    const { index, selectItem, handleSetSelectItem, onDelete, onCopy, hideModel, data = {} } = props

    const Component = {
        'input': InputItem,
        'number': InputNumberItem,
        'textarea': TextAreaItem,
        'select': SelectItem,
        'checkbox': CheckboxGroupItem,
        'radio': RadioGroupItem,
        'date': DatePickerItem,
        'time': TimePickerItem,
        'rate': RateItem,
        'slider': SliderItem,
        'uploadFile': UploadFileItem,
        'uploadImg': UploadImageItem,
        'treeSelect': TreeSelectItem,
        'cascader': CasaderItem,
        'editor': EditorItem,

        'alert': AlertItem,
        'text': TextItem,
        'button': ButtonItem,
        'switch': SwitchItem,
        'html': HTMLItem,
        'divider': DividerItem,
        'grid': GridItem,
        'card': CardItem,
        'tabs': TabsItem,
        'table': TableItem,
        'batch': DynamicTableItem,
    }[data.type]

    const active = data.key && data.key === (selectItem && selectItem.key)

    const onSelect = (e) => {
        e.stopPropagation()
        handleSetSelectItem && handleSetSelectItem(data)
    }

    const onItemDelte = (e) => {
        e.stopPropagation()
        onDelete && onDelete(index, data)
    }

    const onItemCopy = (e) => {
        e.stopPropagation()
        onCopy && onCopy(index, data)
    }

    return (
        <div className="drag-move" >
            {Component ? <Component {...props} active={active} onSelect={onSelect} onDelete={onItemDelte} onCopy={onItemCopy} /> : null}
        </div>
    );
}

export default LayoutItem;
