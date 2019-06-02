import React, { Component, Fragment } from 'react'
import { Layout, Card, List, Row, Col, InputNumber, Button, Alert, Avatar } from 'antd';
import { connect } from 'dva'
import { Link } from 'react-router-dom';
import { routerRedux } from 'dva/router';
import { RcBreadcrumb } from '../../components';
import './style.less'
import { helper, format } from '../../utils';

class CartView extends Component {
  removeCartItem = (productId) => {
    const { dispatch } = this.props
    dispatch({
      type: 'app/removeCartItem',
      productId,
    })
  }
  changeQuantity = (productId, value) => {
    this.props.dispatch({
      type: 'app/changeQuantity',
      payload: {
        productId,
        value,
      },
    })
  }

  renderListItem = item => (
    <List.Item>
      <List.Item.Meta
        className="cart-item"
        avatar={<Avatar shape="square" size="large" src={item.covers && item.covers[0]} />}
        description={(
          <Row>
            <Col sm={10} md={12} lg={14}>
              <Link to={`/products/${item._id}`}>
                <h3>{item.name}</h3>
              </Link>
              <p>{item.describe}</p>
            </Col>
            <Col sm={8} md={8} lg={7}>
              <span>{format.number(item.currentPrice)} vnđ</span>
            </Col>
            <Col sm={6} md={4} lg={3}>
              <InputNumber
                className="input-value"
                defaultValue={item.quantity}
                onChange={value => this.changeQuantity(item._id, value)}
              />
              <Button
                icon="delete"
                onClick={() => this.removeCartItem(item._id)}
              />
            </Col>
          </Row>
        )}
      />
    </List.Item>
  )

  render() {
    const parents = [{
      _id: 1,
      url: '/',
      name: 'Trang chủ',
    }]
    const { app: { cart }, dispatch } = this.props
    return (
      <Layout className="container">
        <RcBreadcrumb name="Giỏ hàng của tôi" parents={parents} />
        <Layout className="page-content">
          <Card>
            {cart.length ? (
              <Fragment>
                <List
                  itemLayout="horizontal"
                  dataSource={cart}
                  renderItem={this.renderListItem}
                />
              </Fragment>
            ) :
              (
                <Row type="flex" justify="center">
                  <Col span={12} className="align-center">
                    <Alert
                      className="align-center margin-bottom-16"
                      message="Giỏ hàng của bạn đang trống"
                      type="info"
                    />
                    <Button type="primary" onClick={() => dispatch(routerRedux.push('/'))}>
                      Mua hàng
                    </Button>
                  </Col>
                </Row>
              )}
          </Card>
          {
            !!cart.length &&
            <Row className="checkout-section">
              <Col span={18}>
                <h4>Tổng cộng: {format.number(helper.calculateTotal(cart))} vnđ</h4>
              </Col>
              <Col sm={10} md={8} lg={6} className="float-right">
                <Link to="/checkout">
                  <Button type="primary" block>Tiến hành đặt hàng</Button>
                </Link>
              </Col>
            </Row>
          }
        </Layout>
      </Layout>
    )
  }
}

export default connect(({ app }) => ({ app }))(CartView)
