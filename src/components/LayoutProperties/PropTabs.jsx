

import React, { useRef } from 'react';
import { Form, Input, InputNumber, Row, Col, Button, Radio, Select, Checkbox } from 'antd'
import { NormalPropertiesWrapper } from './PropCommon'
import {
    DeleteOutlined
} from '@ant-design/icons';
import './index.less'

const GridProperties = (props) => {
    const { selectItem } = props
    const { gutter, tabPosition, type, size, animated } = selectItem.options || {}
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

        <Form.Item label="页签位置" name="options.tabPosition" initialValue={tabPosition} >
            <Select options={[
                { label: 'top', value: 'top' },
                { label: 'right', value: 'right' },
                { label: 'bottom', value: 'bottom' },
                { label: 'left', value: 'left' },
            ]}
            />
        </Form.Item>

        <Form.Item label="页签位置" name="options.type" initialValue={type} >
            <Select options={[
                { label: 'line', value: 'line' },
                { label: 'card', value: 'card' },
                { label: 'editable-card', value: 'editable-card' },
            ]}
            />
        </Form.Item>

        <Form.Item label="大小" name="options.size" initialValue={size} >
            <Select options={[
                { label: 'large', value: 'large' },
                { label: 'default', value: 'default' },
                { label: 'small', value: 'small' },
            ]}
            />
        </Form.Item>

        <Form.Item
            label="操作属性"
            name="options.animated"
            valuePropName="checked"
            initialValue={animated}
        >
            <Checkbox >动画切换</Checkbox>
        </Form.Item>
    </NormalPropertiesWrapper>
}

export default GridProperties;
