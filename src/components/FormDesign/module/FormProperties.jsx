import React from 'react';
import { Form, Radio, Slider, Input, InputNumber, Checkbox } from 'antd';

function FormProperties(props) {

    const [form] = Form.useForm()

    const onFormChange = (changedValues) => {
        console.log(changedValues)
    }

    return (
        <div className="properties-content">
            <div className="head-title">
                表单属性设置
            </div>
            <div className="properties-body">
                <Form form={form} layout={'vertical'} initialValues={props.config} onValuesChange={onFormChange} >
                    <Form.Item name="layout" label="表单布局">
                        <Radio.Group buttonStyle="solid">
                            <Radio.Button value="horizontal">水平</Radio.Button>
                            <Radio.Button value="vertical">垂直</Radio.Button>
                            <Radio.Button value="inline">行内</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item name="labelCol" label="labelCol（水平布局生效）" >
                        <div className="change-col-box">
                            <Slider max={24} min={0} defaultValue={props.config.labelCol.xs} />
                            <div>
                                <label>xs:</label>
                                <InputNumber defaultValue={props.config.labelCol.xs} />
                            </div>
                            <div>
                                <label>sm:</label>
                                <InputNumber defaultValue={props.config.labelCol.sm} />
                            </div>
                            <div>
                                <label>md:</label>
                                <InputNumber defaultValue={props.config.labelCol.md} />
                            </div>
                            <div>
                                <label>lg:</label>
                                <InputNumber defaultValue={props.config.labelCol.lg} />
                            </div>
                            <div>
                                <label>xl:</label>
                                <InputNumber defaultValue={props.config.labelCol.xl} />
                            </div>
                            <div>
                                <label>xxl:</label>
                                <InputNumber defaultValue={props.config.labelCol.xxl} />
                            </div>
                        </div>
                    </Form.Item>

                    <Form.Item name="wrapperCol" label="wrapperCol（水平布局生效）">
                        <div className="change-col-box">
                            <div>
                                <label>xs:</label>
                                <InputNumber defaultValue={props.config.wrapperCol.xs} />
                            </div>
                            <div>
                                <label>sm:</label>
                                <InputNumber defaultValue={props.config.wrapperCol.sm} />
                            </div>
                            <div>
                                <label>md:</label>
                                <InputNumber defaultValue={props.config.wrapperCol.md} />
                            </div>
                            <div>
                                <label>lg:</label>
                                <InputNumber defaultValue={props.config.wrapperCol.lg} />
                            </div>wrapperCol
                            <div>
                                <label>xl:</label>
                                <InputNumber defaultValue={props.config.wrapperCol.xl} />
                            </div>
                            <div>
                                <label>xxl:</label>
                                <InputNumber defaultValue={props.config.wrapperCol.xxl} />
                            </div>
                        </div>
                    </Form.Item>

                    <Form.Item name="previewOptions" label="预览模态框宽度" initialValue={props.previewOptions.width}>
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item name="customStyle" label="表单CSS">
                        <Input />
                    </Form.Item>

                    <Form.Item name="hideRequiredMark" label="表单属性" valuePropName="checked">
                        <Checkbox>隐藏必选标记</Checkbox>
                    </Form.Item>

                    <Form.Item label="提示:">实际预览效果请点击预览查看</Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default FormProperties;
