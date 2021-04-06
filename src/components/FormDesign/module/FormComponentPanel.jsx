import React, { useEffect } from 'react'
import { Form } from 'antd'
import { ReactSortable } from "react-sortablejs";
import LayoutItem from './LayoutItem'


function FormComponentPanel(props) {
    const { data, setList, selectItem, handleSetSelectItem } = props
    const [form] = Form.useForm()

    useEffect(() => {
        // console.log('list:', data.list)
    }, [data])

    const onDragStart = (evt) => {
        let record = data.list[evt.oldIndex]
        if (record) {
            handleSetSelectItem && handleSetSelectItem(record)
        }
    }

    return (
        <div className={`form-panel no-toolbars-top`}>
            {data.list.length ? null : <p className="hint-text" >
                从左侧选择控件添加
            </p>}
            <Form
                className="a-form-box k-form-build"
                form={form}
                layout={data.config.layout}
                hideRequiredMark={data.config.hideRequiredMark}
                style={data.config.customStyle || {}}
            >
                <div className="draggable-box">
                    <ReactSortable
                        tag="div"
                        className="list-main"
                        list={data.list}
                        setList={setList}
                        group={{ name: 'form-draggable' }}
                        animation={180}
                        ghostClass={'moving'}
                        handle={'.drag-move'}
                        onStart={onDragStart}
                    >
                        {data.list.map((item, index) => <LayoutItem
                            key={`layout_${index}`}
                            index={index}
                            data={item}
                            selectItem={selectItem}
                            config={data.config}
                            handleSetSelectItem={handleSetSelectItem}
                        />)}
                    </ReactSortable>
                </div>

            </Form>
        </div>
    )
}

export default FormComponentPanel;
