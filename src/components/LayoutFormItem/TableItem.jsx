import React, { memo } from 'react';
import { Row, Col } from 'antd'
import { ReactSortable } from "react-sortablejs";
import LayoutItem from '../FormDesign/module/LayoutItem'
import { ActionGroup } from './FormItemDragWrap'
import { cloneDeep, get, set } from 'lodash';
import { findValidItem } from '../../utils'

const TableItem = memo((props) => {
  const { data, config, form, index, selectItem, onSelect, hideModel, onDelete, handleSetSelectItem, setListOfIndex, isEdit = true } = props
  const { bright, small, bordered, customStyle } = data.options
  const active = data.key && data.key === (selectItem && selectItem.key)

  const setNestedList = (tri, tdi, list) => {
    data.trs[tri].tds[tdi].list = list
    setListOfIndex(index, data)
  }

  const setChildNestedList = (i, d) => {
    // for (let col of data.columns) {
    //   col.list = col.list.map((item) => {
    //     if (item.key === d.key) return { ...d }
    //     return item
    //   })
    // }
    // setListOfIndex(index, data)
    // console.log(index, data)
  }

  const onAdd = (tri, tdi, evt) => {
    setTimeout(() => {
      let record = data.trs[tri].tds[tdi].list[evt.newIndex]
      // 从容器中移出元素时，也会执行，此时 item 值为 undfined
      if (record) {
        delete record.icon;
        delete record.component;
        set(data, `trs[${tri}].tds[${tdi}].list[${evt.newIndex}]`, record)
        handleSetSelectItem(record)
      }
    }, 0)
  }

  const onDragStart = (i, evt) => {
    // let record = data.columns[i].list[evt.oldIndex]
    // if (record) {
    //   handleSetSelectItem(record)
    // }
  }

  const onNestedDelete = (tri, tdi, itemIndex, item) => {
    let list = get(data, `trs[${tri}].tds[${tdi}].list`, [])

    list.splice(itemIndex, 1)

    set(data.columns, `trs[${tri}].tds[${tdi}].list`, list)
    // setListOfIndex(index, data)

    let nextItem = findValidItem(itemIndex, list)
    if (nextItem) {
      handleSetSelectItem({ ...nextItem })
    } else {
      handleSetSelectItem({ ...data })
    }
  }

  return <div className={`table-box ${active ? 'active' : ''}`} onClick={onSelect}>
    <table
      className={`table-layout kk-table-9136076486841527 ${bright ? 'bright' : ''} ${small ? 'small' : ''} ${bordered ? 'bordered' : ''}`}
      style={customStyle || {}}
    >
      <tbody>
        {data.trs.map((tr, tri) => {
          return <tr key={tr.key || tri}>
            {
              tr.tds.map((td, tdi) => <td
                className="table-td"
                key={td.key || tdi}
                colSpan={td.colspan}
                rowSpan={td.rowspan}
              >
                <div className="draggable-box">
                  <SortWrap
                    data={td}
                    tri={tri}
                    tdi={tdi}
                    setNestedList={setNestedList}
                    onDragStart={onDragStart}
                    onAdd={onAdd}
                    isEdit={isEdit}
                  >
                    {td.list.map((item, j) => <LayoutItem
                      key={`${item.key}`}
                      index={j}
                      data={item}
                      form={form}
                      selectItem={selectItem}
                      config={config}
                      hideModel={hideModel}
                      setListOfIndex={setChildNestedList}
                      handleSetSelectItem={handleSetSelectItem}
                      onDelete={(itemIndex) => onNestedDelete(tri, tdi, itemIndex)}
                      isEdit={isEdit}
                    />)}
                  </SortWrap>
                </div>
              </td>)
            }
          </tr>
        })}
      </tbody>

    </table>

    {!isEdit ? null : <ActionGroup active={active} {...props} />}
  </div>
})

const SortWrap = (props) => {
  const { data, tri, tdi, setNestedList, onDragStart, onAdd, isEdit = true } = props

  if (!isEdit) return props.children

  return <ReactSortable
    tag="div"
    className="list-main"
    list={data.list}
    setList={(list) => setNestedList(tri, tdi, list)}
    group={{ name: 'form-draggable' }}
    animation={180}
    ghostClass={'moving'}
    handle={'.drag-move'}
    onAdd={(evt) => onAdd(tri, tdi, evt)}
    onStart={(evt) => onDragStart(tri, tdi, evt)}
  >
    {props.children}
  </ReactSortable>
}

export default TableItem;
