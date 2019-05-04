import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { AppConst } from '../../../configs';

const FormItem = Form.Item;

class FormInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      couponCode: '',
    }
  }
  onChange = (e) => {
    this.setState({ couponCode: e.target.value })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit, form: { validateFields } } = this.props
    validateFields((err, values) => {
      if (!err) {
        onSubmit(values)
      }
    });
  }
  checkCouponCode = () => {
    this.props.dispatch({
      type: 'checkout/check',
      payload: {
        code: this.state.couponCode,
      },
    })
  }


  render() {
    const { form: { getFieldDecorator }, user } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('name', {
            rules: [
              { required: true, message: 'Vui lòng nhập họ tên người nhận!' },
              { min: 2, mesage: 'Tên người nhận ít nhất 2 ký tự' },
            ],
            initialValue: user ? user.name : '',
          })(<Input placeholder="Tên người nhận" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('address', {
            rules: [
              { required: true, message: 'Vui lòng nhập địa chỉ!' },
              { min: 6, message: 'Địa chỉ ít nhất 6 ký tự' },
            ],
            initialValue: user ? user.address : '',
          })(<Input placeholder="Địa chỉ" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('phone', {
            rules: [
              { required: true, message: 'Vui lòng nhập sđt!' },
              { pattern: AppConst.regex.phone, message: 'Sđt không đúng định dạng!' },
            ],
            initialValue: user ? user.phone : '',
          })(<Input placeholder="SĐT" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('note', {})(<Input placeholder="Ghi chú đơn hàng" />)}
        </FormItem>
        <FormItem className="border-top">
          {/* <h3>Thông tin đơn hàng:</h3>
          <table className="order-info-table">
            <tbody>
              <tr>
                <td>{cart.length} Sản phẩm</td>
                <td className="text-right">{format.number(tempValue)} đ</td>
              </tr>
            </tbody>
          </table>
          <Input
            defaultValue={couponCode}
            placeholder="Nhập mã giảm giá"
            onChange={this.onChange}
            addonAfter={<Button size="small" onClick={this.checkCouponCode}>Áp dụng</Button>}
          />
          <table className="order-info-table">
            <tbody>
              {
                coupon && (
                  <tr>
                    <td>Giảm giá: </td>
                    <td className="text-right">{format.number(discount)} đ</td>
                  </tr>
                )
              }
              <tr>
                <td><h4>Tổng cộng: </h4></td>
                <td className="text-right">{format.number(total)} đ</td>
              </tr>
            </tbody>
          </table> */}
          <Button type="primary" htmlType="submit" className="login-form-button" block>
            Đặt hàng
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const CheckoutForm = Form.create()(FormInfo)

export default CheckoutForm
