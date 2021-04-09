import React, { useEffect } from 'react'
import { Form } from 'antd'
import { ReactSortable } from "react-sortablejs";
import LayoutItem from './LayoutItem'
import { cloneDeep } from 'lodash-es'


function FormComponentPanel(props) {
    const { data, setList, selectItem, handleSetSelectItem, hideModel } = props
    const [form] = Form.useForm()

    useEffect(() => {
        // console.log('list:', data.list)
    }, [data])

    const onDragStart = (evt) => {
        let record = data.list[evt.oldIndex]
        if (record) {
            handleSetSelectItem && handleSetSelectItem(cloneDeep(record))
        }
    }

    const onDelete = (index, item) => {
        let nextIndex = index - 1
        if (nextIndex < 0) nextIndex = index + 1
        if (nextIndex > data.list.length - 1) nextIndex = data.list.length - 1
        let nextItem = data.list[nextIndex]
        data.list.splice(index, 1)
        setList([...data.list])
        if (data.list.length) handleSetSelectItem({ ...nextItem })
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
                            form={form}
                            selectItem={selectItem}
                            config={data.config}
                            hideModel={hideModel}
                            handleSetSelectItem={handleSetSelectItem}
                            onDelete={onDelete}
                        />)}
                    </ReactSortable>
                </div>
            </Form>
        </div>
    )
}

export default FormComponentPanel;
