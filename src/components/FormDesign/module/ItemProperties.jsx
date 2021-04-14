import React from 'react'
import { DoubleRightOutlined } from '@ant-design/icons'
import { InputProperties, TextAreaProperties, DividerProperties, GridProperties, CardProperties } from '../../LayoutProperties'

function ItemProperties(props) {
    const { cls, selectItem, list, setList, onHide, handleSetSelectItem } = props

    const Component = {
        'input': InputProperties,
        'textarea': TextAreaProperties,
        'divider': DividerProperties,
        'grid': GridProperties,
        'card': CardProperties,
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
