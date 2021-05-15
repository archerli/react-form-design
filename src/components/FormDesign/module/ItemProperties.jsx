import React from 'react'
import { DoubleRightOutlined } from '@ant-design/icons'
import {
    InputProperties,
    InputNumberProperties,
    TextAreaProperties,
    SelectProperties,
    TreeSelectProperties,
    CascaderProperties,
    CheckboxProperties,
    RadioProperties,
    DatePickerProperties,
    TimePickerProperties,
    RateProperties,
    SliderProperties,
    UploadFileProperties,
    UploadImageProperties,
    EditorProperties,
    ButtonProperties,
    SwitchProperties,
    AlertProperties,
    TextProperties,
    HTMLProperties,

    DividerProperties,
    GridProperties,
    CardProperties,
    TabsProperties,
} from '../../LayoutProperties'

function ItemProperties(props) {
    const { cls, selectItem, list, setList, onHide, handleSetSelectItem } = props

    const Component = {
        'input': InputProperties,
        'number': InputNumberProperties,
        'textarea': TextAreaProperties,
        'select': SelectProperties,
        'treeSelect': TreeSelectProperties,
        'cascader': CascaderProperties,
        'checkbox': CheckboxProperties,
        'radio': RadioProperties,
        'date': DatePickerProperties,
        'time': TimePickerProperties,
        'divider': DividerProperties,
        'rate': RateProperties,
        'slider': SliderProperties,
        'uploadFile': UploadFileProperties,
        'uploadImg': UploadImageProperties,
        'editor': EditorProperties,
        'button': ButtonProperties,
        'switch': SwitchProperties,
        'alert': AlertProperties,
        'text': TextProperties,
        'html': HTMLProperties,

        'grid': GridProperties,
        'card': CardProperties,
        'tabs': TabsProperties,
    }[selectItem.type]

    return (
        <div className={`properties-centent kk-checkbox ${cls}`}>
            <div className="head-title">控件属性设置</div>
            <div className="properties-body">
                {Component ? <Component
                    selectItem={selectItem}
                    list={list}
                    setList={setList}
                    handleSetSelectItem={handleSetSelectItem}
                /> : null}
            </div>
            <div className="close-box" onClick={onHide}>
                <DoubleRightOutlined />
            </div>
        </div>
    )
}

export default ItemProperties
