import React, { memo, useState, useRef } from 'react'
import { Tabs } from 'antd'
import { ReactSortable } from "react-sortablejs";
import LayoutItem from '../FormDesign/module/LayoutItem';
import { ActionGroup } from './FormItemDragWrap'
import { cloneDeep, get, set } from 'lodash';
import { findValidItem } from '../../utils'

const { TabPane } = Tabs;

function TabsItem(props) {
  const { data, config, form, index, selectItem, onSelect, hideModel, onDelete, handleSetSelectItem, setListOfIndex, isEdit = true, onColAd } = props
  const { tabBarGutter, type, size, tabPosition, animated } = data.options || {}
  const active = data.key && data.key === (selectItem && selectItem.key)
  const addEventRef = useRef()

  const setNestedList = (d, i, list) => {
    // 新增 与 删除都会执行，新增完了事件对象置空
    if (addEventRef.current) {
      data.columns[i].list = cloneDeep(list)
      setListOfIndex(index, data)

      let record = data.columns[i].list[addEventRef.current.newIndex]
      // 从容器中移出元素时，也会执行，此时 item 值为 undfined
      if (record) {
        delete record.icon;
        delete record.component;
        handleSetSelectItem(record)
      }
      addEventRef.current = null
    } else {
      data.columns[i].list = list
      setListOfIndex(index, data)
    }
  }

  const setChildListOfIndex = (i, d) => {
    // console.log(i, d)
    for (let col of data.columns) {
      col.list = col.list.map((item) => {
        if (item.key === d.key) return { ...d }
        return item
      })
    }
    setListOfIndex(index, data)
    // console.log(index, data)
  }

  const onDragStart = (i, evt) => {
    let record = data.columns[i].list[evt.oldIndex]
    if (record) {
      handleSetSelectItem(record)
    }
  }

  const onAdd = (evt) => {
    addEventRef.current = evt
  }

  const onNestedDelete = (colIndex, itemIndex, item) => {
    let list = get(data.columns, `[${colIndex}].list`, [])

    list.splice(itemIndex, 1)

    set(data.columns, `[${colIndex}].list`, list)
    // setListOfIndex(index, data)

    let nextItem = findValidItem(itemIndex, list)
    if (nextItem) {
      handleSetSelectItem({ ...nextItem })
    } else {
      handleSetSelectItem({ ...data })
    }
  }

  return (
    <div className={`grid-box ${active ? 'active' : ''}`} onClick={onSelect}>
      <Tabs
        className="grid-row"
        defaultActiveKey="0"
        tabBarGutter={tabBarGutter}
        type={type}
        size={size}
        tabPosition={tabPosition}
        animated={animated}
      >
        {
          data.columns.map((d, i) => {
            return <TabPane tab={d.label} key={i}>
              <div className="grid-col">
                <div className="draggable-box">
                  <SortWrap
                    data={d}
                    index={i}
                    setNestedList={setNestedList}
                    onDragStart={onDragStart}
                    onAdd={onAdd}
                    isEdit={isEdit}
                  >
                    {
                      d.list.map((item, j) => <LayoutItem
                        key={`${item.key}`}
                        index={j}
                        data={item}
                        form={form}
                        selectItem={selectItem}
                        config={config}
                        hideModel={hideModel}
                        setListOfIndex={setChildListOfIndex}
                        handleSetSelectItem={handleSetSelectItem}
                        onDelete={(itemIndex) => onNestedDelete(i, itemIndex)}
                        isEdit={isEdit}
                      />)
                    }
                  </SortWrap>
                </div>
              </div>
            </TabPane>
          })
        }
      </Tabs>
      {!isEdit ? null : <ActionGroup active={active} {...props} />}
    </div>
  );
}

const SortWrap = (props) => {
  const { data, index, setNestedList, onDragStart, onAdd, isEdit = true } = props

  if (!isEdit) return props.children

  return <ReactSortable
    tag="div"
    className="list-main"
    list={data.list}
    setList={(list) => setNestedList(data, index, list)}
    group={{ name: 'form-draggable' }}
    animation={180}
    ghostClass={'moving'}
    handle={'.drag-move'}
    onStart={(evt) => onDragStart(index, evt)}
    onAdd={onAdd}
  >
    {props.children}
  </ReactSortable>
}

export default TabsItem;
