import React from 'react'
import { DoubleRightOutlined } from '@ant-design/icons'
import {
    InputProperties,
    InputNumberProperties,
    TextAreaProperties,
    SelectProperties,
    CheckboxProperties,
    RadioProperties,
    DatePickerProperties,
    TimePickerProperties,
    RateProperties,
    SliderProperties,
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
        'checkbox': CheckboxProperties,
        'radio': RadioProperties,
        'date': DatePickerProperties,
        'time': TimePickerProperties,
        'divider': DividerProperties,
        'rate': RateProperties,
        'slider': SliderProperties,
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
