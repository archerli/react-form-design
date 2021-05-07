import React from 'react'
import { Tooltip } from 'antd'
import { SaveOutlined, ChromeOutlined, ImportOutlined, CreditCardOutlined, CodeOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons'

function OperatingArea(props) {
    const { toolbars } = props
    const iconStyle = { fontSize: 16 }
    return (
        <div className="operating-area">
            <div className="left-btn-box">
                {toolbars.includes('save') ? <Tooltip title="保存" >
                    <span className="opt-btn" onClick={props.onSave}>
                        <SaveOutlined style={iconStyle} />
                    </span>
                </Tooltip> : null}

                {toolbars.includes('preview') ? <Tooltip title="预览" >
                    <span className="opt-btn" onClick={props.onPreview}>
                        <ChromeOutlined style={iconStyle} />
                    </span>
                </Tooltip> : null}

                {toolbars.includes('importJson') ? <Tooltip title="导入" >
                    <span className="opt-btn" onClick={props.onImport}>
                        <ImportOutlined style={iconStyle} />
                    </span>
                </Tooltip> : null}

                {toolbars.includes('exportJson') ? <Tooltip title="生成JSON" >
                    <span className="opt-btn" onClick={props.onGetJson}>
                        <CreditCardOutlined style={iconStyle} />
                    </span>
                </Tooltip> : null}

                {toolbars.includes('exportCode') ? <Tooltip title="生成代码" >
                    <span className="opt-btn" onClick={props.onGetCode}>
                        <CodeOutlined style={iconStyle} />
                    </span>
                </Tooltip> : null}

                {toolbars.includes('reset') ? <Tooltip title="清空" >
                    <span className="opt-btn" onClick={props.onClear}>
                        <DeleteOutlined style={iconStyle} />
                    </span>
                </Tooltip> : null}


            </div>
            <div className="right-btn-box">
                {toolbars.includes('close') ? <Tooltip title="关闭" >
                    <span onClick={props.onSave}>
                        <CloseOutlined style={iconStyle} />
                    </span>
                </Tooltip> : null}
            </div>
        </div>
    );
}

OperatingArea.defaultProps = {
    toolbars: [
        'save',
        'preview',
        'importJson',
        'exportJson',
        'exportCode',
        'reset',
        'close'
    ]
}
export default OperatingArea;
