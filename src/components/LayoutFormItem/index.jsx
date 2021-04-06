import React, { memo } from 'react';
import IconFont from '../Icon'
import { Form, Button, Switch, Input } from 'antd'

const FormItemWarpper = (props) => {
  const { data, config, children, ...rest } = props
  return <Form.Item
    label={data.label}
    labelCol={config.layout === 'horizontal' ? config.labelCol : {}}
    wrapperCol={config.layout === 'horizontal' ? config.wrapperCol : {}}
    name={data.model}
    {...rest}
  >{children}</Form.Item>
}

export const TempItem = memo((props) => {
  const { data } = props
  return <div className="layout-item-temp moving">
    <IconFont type={data.icon} className="icon" />
    <span className="layout-item-temp-label">{data.label}</span>
  </div>
})


export const InputItem = memo((props) => {
  const { data, config } = props
  return <FormItemWarpper data={data} config={config}>
    <Input />
  </FormItemWarpper>
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

export const HTMLItem = memo((props) => {
  const { data } = props
  return <div dangerouslySetInnerHTML={{ __html: data.options.defaultValue }}></div>
})