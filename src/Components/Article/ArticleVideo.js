import React from 'react';
import 'antd/dist/antd.css';
import { Icon, Form, Modal, Upload, Input, Button } from 'antd';

const { TextArea } = Input;

class ArticleVideo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            disableUpload: false
        }
    }

    normFile = e => {
        const { openNotification } = this.props
        this.setState({ disableUpload: false })
        if (e.file.type.indexOf('video')) {
            openNotification('Error', 'Please Upload a Video!', 'close-circle', 'red')
            return
        }
        if (Array.isArray(e)) {
            return e;
        }
        if (e.fileList.length) {
            this.setState({ disableUpload: true })
        }
        return e && e.fileList;
    }

    render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        const { disableUpload } = this.state
        return (
            <Modal
                visible={visible}
                title="Add Image Details"
                okText="Create"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <Form.Item label="Description (Optional)">
                        {getFieldDecorator('video_desc')(<TextArea rows={3} />)}
                    </Form.Item>
                    <Form.Item >
                        {getFieldDecorator('video', {
                            rules: [{ required: true, message: 'Please Upload a Video!' }],
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                        })(
                            <Upload name="logo" listType="picture" accept="video/*">
                                <Button disabled={disableUpload}>
                                    <Icon type="upload" /> Click to upload
                      </Button>
                            </Upload>,
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(ArticleVideo)

export default CollectionCreateForm