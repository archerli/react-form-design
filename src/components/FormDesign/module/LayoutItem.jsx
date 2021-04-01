import React, { memo, useEffect } from 'react';
import IconFont from '../../Icon'
import { Form } from 'antd'
import { useDrag, useDrop, useDragDropManager } from 'react-dnd';
import { TempItem, TextItem, ButtonItem, SwitchItem } from '../../LayoutFormItem'

function LayoutItem(props) {
    const { index, data = {} } = props
    // console.log(data)
    const dragDropManager = useDragDropManager()

    const [{ isDragging }, drag] = useDrag(() => ({
        item: { name: data.name, type: 'layoutItem', data, index },
        options: { dropEffect: 'move' },
        beginDrag: (item) => {
            console.log(item)
        },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            // console.log(item)
            if (dropResult) {
                // alert(`You dropped ${item.name} into ${dropResult.name}!`);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }), [data, index]);

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'layoutItem',
        drop: (item, monitor) => {
            return item
        },
        collect: (monitor) => ({
            isOver: monitor.isOver({ shallow: true }),
            canDrop: monitor.canDrop(),
        }),
    }), [data, index]);

    useEffect(() => {
        if (isOver) {
            let item = dragDropManager.monitor.getItem()
            let sourceIndex = item.index
            // console.log(item, data)
            // console.log(item.data.label, data.label)
            // if (sourceIndex === index) return
            props.onItemSort && props.onItemSort(sourceIndex, index)
            item.index = index
        }
    }, [isOver])

    let RenderItem = () => <></>

    if (data.state === 'temp') {
        RenderItem = TempItem
    } else {
        switch (data.type) {
            case 'text':
                RenderItem = TextItem
                break
            case 'button':
                RenderItem = ButtonItem
                break
            case 'switch':
                RenderItem = SwitchItem
                break
        }
    }

    return (
        <div ref={drag} >
            <div ref={drop}>
                <RenderItem {...props} />
            </div>
        </div>
    );
}

export default LayoutItem;
