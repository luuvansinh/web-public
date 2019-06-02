import moment from 'moment'
import React, { Component } from 'react'
import { Modal, Form, Input, Radio, DatePicker } from 'antd'

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
            birthday: moment(values.birthday).format('YYYY-MM-DD'),
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
              getFieldDecorator('fullname', {
                initialValue: user.fullname,
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
                  <Radio value={1}>Nam</Radio>
                  <Radio value={0}>Nữ</Radio>
                </Radio.Group>
              ))
            }
          </Form.Item>
          <Form.Item label="Ngày sinh">
            {
              getFieldDecorator('birthday', {
                initialValue: moment(user.birthday, 'YYYY-MM-DD'),
              })((
                <DatePicker format="YYYY-MM-DD" />
              ))
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('password', {
              })(<Input type="password" placeholder="Mật khẩu mới" />)
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('password_confirmation', {
              })(<Input type="password" placeholder="Xác nhận mật khẩu mới" />)
            }
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
export default Form.create()(UpdateModal)
