import React from 'react';
import { ConfigProvider, Form } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { isNil } from 'lodash-es'
import BuildBlocks from './BuildBlocks'

function FormBuild(props) {
  const { value, config, disabled } = props
  const [form] = Form.useForm()

  const onFinish = (values) => {
    props.onSubmit && props.onSubmit(values)
  }

  return (
    <ConfigProvider locale={zhCN}>
      {isNil(value.list) || isNil(value.config) ? null : <Form
        className="k-form-build-9136076486841527"
        layout={value.config.layout}
        hideRequiredMark={value.config.hideRequiredMark}
        style={value.config.customStyle || {}}
        form={form}
        onFinish={onFinish}
      >
        {value.list.map((record, index) => {
          return <BuildBlocks
            key={record.key || index}
            form={form}
            data={record}
            config={value.config}
            disabled={disabled}
            itemConfig={config}
            isEdit={false}
          />
        })}
      </Form>}
    </ConfigProvider>
  );
}

export default FormBuild;
