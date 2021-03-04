import React from 'react';
import IconFont from '../../Icon'
import { useDrag } from 'react-dnd';

function CollapseItem(props) {
    const { list } = props
    return (
        <ul >
            {
                list.map((d, i) => <Item key={i} data={d} index={i} />)
            }
        </ul>
    );
}

const Item = (props) => {
    const { data, index } = props
    const [{ isDragging }, drag] = useDrag(() => ({
        item: { name: 'components_' + index, type: 'components', data },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                // alert(`You dropped ${item.name} into ${dropResult.name}!`);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }));
    const opacity = isDragging ? 0.4 : 1;

    return (
        <li
            ref={drag}
            role="Box"
            style={{ opacity }}
            data-testid={`box-${index}`}
            // dragstart="$emit('generateKey', list, index)"
            // click="$emit('handleListPush', val)"
        >
            {!data.icon ? null : <IconFont type={data.icon} className="icon" />}
            {data.label}
        </li>

    );
}

export default CollapseItem;
