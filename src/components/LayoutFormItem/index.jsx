import React, { memo } from 'react';
import IconFont from '../Icon'
import { Form, Button, Switch } from 'antd'

export const TempItem = memo((props) => {
  const { data } = props
  return <div className="layout-item-temp moving">
    <IconFont type={data.icon} className="icon" />
    <span className="layout-item-temp-label">{data.label}</span>
  </div>
})

export const TextItem = memo((props) => {
  const { data } = props
  return <Form.Item>
    <label>{data.label}</label>
  </Form.Item>
})

export const ButtonItem = memo((props) => {
  const { data } = props
  return <Form.Item>
    <Button>{data.label}</Button>
  </Form.Item>
})


export const SwitchItem = memo((props) => {
  const { data } = props
  return <Form.Item>
    <Switch>{data.label}</Switch>
  </Form.Item>
})