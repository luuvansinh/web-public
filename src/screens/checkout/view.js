import React, { Component } from 'react'
import { Layout, Row, Col, Card, List, Avatar, Alert, Button } from 'antd';
import { connect } from 'dva'
import { Link } from 'react-router-dom'
import { routerRedux } from 'dva/router'
import FormInfo from './form/view'
import './style.less'
import { MessageConst } from '../../configs';


class CheckoutView extends Component {
  handleSubmit = (data) => {
    const { dispatch } = this.props
    dispatch({
      type: 'checkout/order',
      payload: data,
    })
  }

  renderItem = item => (
    <List.Item>
      <List.Item.Meta
        className="cart-item"
        avatar={<Avatar shape="square" size="large" src={item.covers[0]} />}
        description={(
          <Row>
            <Col sm={10} md={12} lg={12}>
              <Link to={`/products/${item.id}`}>
                <h3>{item.name}</h3>
              </Link>
              <p>{item.describe}</p>
            </Col>
            <Col sm={8} md={6} lg={7}>
              <span>{item.price} vnd</span>
            </Col>
            <Col sm={6} md={6} lg={5}>
              Số lượng: {item.quantity}
            </Col>
          </Row>
        )}
      />
    </List.Item>
  )

  render() {
    const { app: { cart, pUser }, dispatch, checkout: { coupon, isOrderSuccess } } = this.props
    return (
      <Layout className="container">
        <Layout className="page-content">
          {
            isOrderSuccess ? (
              <Row type="flex" justify="center">
                <Col span={12}>
                  <Alert
                    message="Đặt hàng thành công"
                    type="success"
                    description={(
                      <React.Fragment>
                        <p>{MessageConst.orderSuccessContent}</p>
                        <Button onClick={() => dispatch(routerRedux.push('/'))}>{MessageConst.continue}</Button>
                      </React.Fragment>
                    )}
                    showIcon
                  />
                </Col>
              </Row>
            ) : (
              <Row gutter={16}>
                <Col sm={24} md={14} lg={16}>
                  <Card>
                    <List
                      itemLayout="horizontal"
                      dataSource={cart}
                      header="Sản phẩm"
                      renderItem={this.renderItem}
                    />
                  </Card>
                </Col>
                <Col sm={24} md={10} lg={8}>
                  <Card>
                    <FormInfo user={pUser} onSubmit={this.handleSubmit} dispatch={dispatch} cart={cart} coupon={coupon} />
                  </Card>
                </Col>
              </Row>
              )
          }
        </Layout>
      </Layout>
    )
  }
}

export default connect(({ app, checkout }) => ({ app, checkout }))(CheckoutView)
