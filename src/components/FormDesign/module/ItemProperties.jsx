import React from 'react'
import { DoubleRightOutlined } from '@ant-design/icons'
import { InputProps } from '../../LayoutFormItem/properties'

function ItemProperties(props) {
    const { cls, selectItem, list, setList, onHide } = props

    const Component = {
        'input': InputProps
    }[selectItem.type] || function () { return <></> }

    return (
        <div className={`properties-centent kk-checkbox ${cls}`}>
            <div className="head-title">控件属性设置</div>
            <div className="properties-body">
                <Component selectItem={selectItem} list={list} setList={setList} />
            </div>
            <div className="close-box" onClick={onHide}>
                <DoubleRightOutlined />
            </div>
        </div>
    )
}

export default ItemProperties
