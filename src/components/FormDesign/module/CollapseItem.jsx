import React from 'react';
import IconFont from '../../Icon'
import { ReactSortable } from "react-sortablejs";

function CollapseItem(props) {
    const { list, onChoose, onEnd } = props

    const setData = (dataTransfer, dragEl) => {
        // console.log(dataTransfer, dragEl)
    }

    return (
        <ReactSortable
            tag="ul"
            list={list}
            setList={() => { }}
            group={{ name: 'form-draggable', pull: 'clone', put: false }}
            sort={false}
            animation={180}
            ghostClass={'moving'}
            onChoose={onChoose}
            onEnd={onEnd}
            setData={setData}
        >
            {
                list.map((d, i) => <Item key={i} data={d} index={i} />)
            }
        </ReactSortable>
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
