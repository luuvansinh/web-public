import React, { Component } from 'react'
import { Form, Input, Button, Radio } from 'antd'
import PaypalExpressBtn from 'react-paypal-express-checkout'
import { AppConst } from '../../../configs';
import { helper, format } from '../../../utils';

const FormItem = Form.Item;

class FormInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      couponCode: '',
      paid: false,
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
        onSubmit({
          ...values,
          ...this.state,
        })
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

  paymentPaypalSuccess = (payment) => {
    this.props.dispatch({
      type: 'checkout/payment',
      payload: payment,
    })
    this.setState({ paid: true })
  }


  render() {
    const { form: { getFieldDecorator, getFieldValue }, user, cart } = this.props;
    const total = Math.round(helper.calculateTotal(cart) / 23000)
    const { paid } = this.state
    const client = {
      sandbox: 'Aal78NOHtcOkQxKhYm6TgI7QYxNk9TkKT7ceAPy-xecjflD4aLdZtDyVA-QWLq1APrX0rgvNLp-44Wcp',
      env: 'sandbox',
    }
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
        <FormItem>
          {
            getFieldDecorator('paymentMethod', {
              initialValue: 'COD',
            })((
              <Radio.Group>
                <Radio value="COD">Thanh toán khi giao hàng</Radio>
                <Radio value="paypal">Paypal</Radio>
              </Radio.Group>
            ))
          }
          {
            getFieldValue('paymentMethod') === 'paypal' && (
              <PaypalExpressBtn onSuccess={this.paymentPaypalSuccess} client={client} currency="USD" total={total} />
            )
          }
        </FormItem>
        <FormItem className="border-top">
          <h3>Thông tin đơn hàng:</h3>
          {/* <table className="order-info-table">
            <tbody>
              <tr>
                <td>{cart.length} Sản phẩm</td>
                <td className="text-right">{format.number(tempValue)} đ</td>
              </tr>
            </tbody>
          </table> */}
          {/* <Input
            defaultValue={couponCode}
            placeholder="Nhập mã giảm giá"
            onChange={this.onChange}
            addonAfter={<Button size="small" onClick={this.checkCouponCode}>Áp dụng</Button>}
          /> */}
          <table className="order-info-table">
            <tbody>
              {/* {
                coupon && (
                  <tr>
                    <td>Giảm giá: </td>
                    <td className="text-right">{format.number(discount)} đ</td>
                  </tr>
                )
              } */}
              <tr>
                <td><h4>Tổng cộng: </h4></td>
                <td className="text-right">{format.number(helper.calculateTotal(cart))} đ</td>
              </tr>
            </tbody>
          </table>
          <Button type="primary" className="login-form-button" block disabled={!paid && getFieldValue('paymentMethod') === 'paypal'}>
            Đặt hàng
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const CheckoutForm = Form.create()(FormInfo)

export default CheckoutForm
