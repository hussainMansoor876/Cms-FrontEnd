import React from 'react';
import 'antd/dist/antd.css';
import { Icon, Form, Modal, Upload, notification, Input, Button } from 'antd';

const { TextArea } = Input;

class ArticleImage extends React.Component {
    constructor(props){
        super(props)
    }


    normFile = e => {
        const { openNotification } = this.props
        console.log('Upload event:', e.file.type.indexOf('image'));
        if (e.file.type.indexOf('image')) {
            openNotification('Error', 'Please Upload an Image', 'close-circle', 'red')
            return
        }
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="Add Image Details"
                okText="Create"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <Form.Item label="Description">
                        {getFieldDecorator('description', {
                            rules: [{ required: true, message: 'Please Add the description of Image!' }]
                        })(<TextArea rows={3} />)}
                    </Form.Item>
                    <Form.Item >
                        {getFieldDecorator('image', {
                            rules: [{ required: true, message: 'Please Upload the Image!' }],
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                        })(
                            <Upload name="logo" listType="picture" accept="image/*">
                                <Button>
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

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(ArticleImage)

export default CollectionCreateForm