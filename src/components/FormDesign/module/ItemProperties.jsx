import React from 'react'
import {DoubleRightOutlined} from '@ant-design/icons'

function ItemProperties(props) {
    const { cls, onHide } = props

    return (
        <div className={`properties-centent kk-checkbox ${cls}`}>
            <div className="head-title">
                控件属性设置
            </div>
            <div className="properties-body">

            </div>
            <div className="close-box" onClick={onHide}>
                <DoubleRightOutlined />
            </div>
        </div>
    )
}

export default ItemProperties
