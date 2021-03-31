import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Form } from 'antd'

function FormComponentPanel(props) {
    const { data, onDrop } = props
    const [form] = Form.useForm()

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'components',
        drop: (item, monitor) => {
            onDrop && onDrop(monitor.getItem().data)
            return { name: 'Dustbin' }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

    useEffect(() => {
        console.log('list:', data.list)
    }, [data])

    return (
        <div className={`form-panel no-toolbars-top`}>
            <p className="hint-text" v-show="data.list.length === 0">
                从左侧选择控件添加
            </p>
            <Form
                className="a-form-box k-form-build"
                form={form}
                layout={data.config.layout}
                hideRequiredMark={data.config.hideRequiredMark}
                style={data.config.customStyle || {}}
            >
                <div ref={drop} className="draggable-box">
                    <div className="list-main">

                    </div>
                </div>
            </Form>
        </div>
    )
}

export default FormComponentPanel;
