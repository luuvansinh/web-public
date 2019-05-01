import React, { Component } from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item

class AddComment extends Component {
  handleSubmit = () => {
    const { dispatch, form: { validateFieldsAndScroll }, toggleModal } = this.props
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'product/comment',
          payload: values,
        })
        toggleModal()
      }
    })
  }
  render() {
    const { visible, toggleModal, form: { getFieldDecorator } } = this.props
    return (
      <Modal
        title="Bình luận"
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={toggleModal}
        className="app-modal"
      >
        <Form>
          <FormItem>
            {
              getFieldDecorator('content', {
                rules: [{
                  required: true, message: 'Vui lòng nhập nội dung',
                }],
              })((
                <Input.TextArea />
              ))
            }
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddComment);
