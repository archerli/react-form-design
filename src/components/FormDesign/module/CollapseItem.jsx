import React from 'react';
import IconFont from '../../Icon'

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

    return (
        <li
            role="Box"
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
