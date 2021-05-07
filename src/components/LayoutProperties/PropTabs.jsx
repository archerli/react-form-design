

import React, { useRef } from 'react';
import { Form, Input, InputNumber, Row, Col, Button } from 'antd'
import { NormalPropertiesWrapper } from './PropCommon'
import {
    DeleteOutlined
} from '@ant-design/icons';
import './index.less'

const GridProperties = (props) => {
    const { selectItem } = props
    const { gutter } = selectItem.options || {}
    const wrapRef = useRef()

    const onAddCol = () => {
        let columns = [...selectItem.columns]
        let column = {
            value: columns.length + 1,
            label: '选项' + (columns.length + 1),
            list: []
        }
        column.list = []
        columns.push(column)
        wrapRef.current.triggerFieldChange(`columns`, columns)
    }

    const onDeleteCol = (i) => {
        let columns = [...selectItem.columns]
        columns.splice(i, 1)
        wrapRef.current.triggerFieldChange(`columns`, columns)
    }

    const onColChange = (i, value, key) => {
        wrapRef.current.triggerFieldChange(`columns[${i}][${key}]`, value)
    }

    return <NormalPropertiesWrapper ref={wrapRef} {...props} >
        <Form.Item label="标签间距" name="options.tabBarGutter" initialValue={gutter} >
            <InputNumber style={{ width: '100%' }} min={0} />
        </Form.Item>
        <Form.Item label="列配置项" >
            <div >
                {selectItem.columns.map((d, i) => {
                    return <div key={`grid_col_${i}`} style={{ marginBottom: 10 }}>
                        <div className="option-change-box">
                            <Row gutter={8} align="middle">
                                <Col span={9}>
                                    <Input
                                        style={{ width: '100%' }}
                                        min={2}
                                        value={d.label}
                                        placeholder="名称"
                                        onChange={(value) => onColChange(i, value, 'label')}
                                    />
                                </Col>
                                <Col span={9}>
                                    <Input
                                        style={{ width: '100%' }}
                                        min={2}
                                        value={d.value}
                                        placeholder="值"
                                        onChange={(value) => onColChange(i, value, 'value')}
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

export default GridProperties;
