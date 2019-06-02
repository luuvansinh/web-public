import React, { Component } from 'react'
import { Modal, Rate, Row, Input, Form } from 'antd';

class RateModal extends Component {
  constructor(props) {
    super(props)
    this.initState = {
      star: 5,
      content: '',
    }
    this.state = this.initState
  }

  onRateChange = (value) => {
    this.setState({ star: value })
  }

  onInputChange = (e) => {
    this.setState({ content: e.target.value })
  }

  submit = () => {
    const { current, dispatch, toggleModal, form: { validateFieldsAndScroll } } = this.props
    const { star, content } = this.state
    validateFieldsAndScroll((errors) => {
      if (!errors) {
        dispatch({
          type: 'profile/rate',
          payload: {
            product_id: current,
            stars: star,
            content,
          },
        })
        this.setState(this.initState)
        toggleModal('')
      }
    })
  }

  cancel = () => {
    this.setState(this.initState)
    this.props.toggleModal('')
  }
  render() {
    const { visible, form: { getFieldDecorator } } = this.props
    const { star, content } = this.state
    return (
      <Modal
        className="app-modal"
        title="Đánh giá sản phẩm"
        visible={visible}
        onCancel={this.cancel}
        onOk={this.submit}
      >
        <Form>
          <Row>
            <Form.Item>
              <Rate allowClear={false} defaultValue={star} onChange={this.onRateChange} />
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('content', {
                  rules: [
                    { required: true, message: 'Nội dung không được trống' },
                  ],
                  initialValue: content,
                })((
                  <Input.TextArea onChange={this.onInputChange} rows={4} style={{ marginTop: 16 }} />
                ))
              }
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(RateModal)
