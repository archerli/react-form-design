

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Form, Input, InputNumber, Select, Slider, Checkbox, Row, Col, Button } from 'antd'
import { NormalPropertiesWrapper } from './PropCommon'
import { cloneDeep } from 'lodash-es'
import {
    DeleteOutlined
} from '@ant-design/icons';
import './index.less'

const TabsProperties = (props) => {
    const { selectItem } = props
    const { gutter } = selectItem.options || {}
    const wrapRef = useRef()

    const onAddCol = () => {
        let columns = [...selectItem.columns]
        let column = cloneDeep(columns.slice(-1)[0] || {
            type: 'col',
            span: 12
        })
        column.list = []
        columns.push(column)
        wrapRef.current.triggerFieldChange(`columns`, columns)
    }

    const onDeleteCol = (i) => {
        let columns = [...selectItem.columns]
        columns.splice(i, 1)
        wrapRef.current.triggerFieldChange(`columns`, columns)
    }

    const onColChange = (i, value) => {
        wrapRef.current.triggerFieldChange(`columns[${i}].span`, value)
    }

    return <NormalPropertiesWrapper ref={wrapRef} {...props} >
        <Form.Item label="栅格间距" name="options.gutter" initialValue={gutter} >
            <InputNumber style={{ width: '100%' }} min={0} />
        </Form.Item>
        <Form.Item label="列配置项" >
            <div >
                {selectItem.columns.map((d, i) => {
                    return <div key={`grid_col_${i}`} style={{ marginBottom: 10 }}>
                        <div className="option-change-box">
                            <Row gutter={8} align="middle">
                                <Col span={18}>
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        min={2}
                                        value={d.span}
                                        onChange={(value) => onColChange(i, value)}
                                    />
                                </Col>
                                <Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        shape="circle"
                                        danger
                                        icon={<DeleteOutlined style={{ fontSize: 14 }} />}
                                        onClick={() => onDeleteCol(i)}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </div>
                })}
                <a onClick={onAddCol}>添加</a>
            </div>
        </Form.Item>
    </NormalPropertiesWrapper>
}

export default TabsProperties;
