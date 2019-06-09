import React, { Component } from 'react'
import { Modal, Form, Input, Radio } from 'antd'

class UpdateModal extends Component {
  onSubmit = (e) => {
    e.preventDefault()
    const { dispatch, form: { validateFields }, toggleModal } = this.props
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'profile/update',
          payload: {
            ...values,
          },
        })
        toggleModal()
      }
    })
  }

  render() {
    const { visible, toggleModal, form: { getFieldDecorator }, user } = this.props
    if (!user) {
      return null
    }
    return (
      <Modal
        visible={visible}
        onOk={this.onSubmit}
        onCancel={toggleModal}
        title="Cập nhật thông tin"
      >
        <Form>
          <Form.Item>
            {
              getFieldDecorator('name', {
                initialValue: user.name,
              })(<Input placeholder="Họ tên" />)
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('address', {
                initialValue: user.address,
              })(<Input placeholder="Địa chỉ" />)
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('phone', {
                initialValue: user.phone,
              })(<Input placeholder="SĐT" />)
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('gender', {
                initialValue: user.gender,
              })((
                <Radio.Group>
                  <Radio value="male">Nam</Radio>
                  <Radio value="female">Nữ</Radio>
                </Radio.Group>
              ))
            }
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
export default Form.create()(UpdateModal)
