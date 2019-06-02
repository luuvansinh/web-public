import React, { Component, Fragment } from 'react'
import lodash from 'lodash'
import { Row, Card, Col, Tag, Pagination, Modal, Spin, Avatar, Button } from 'antd'
import { Link } from 'dva/router';
import './style.less'
import RateModal from './rate-modal'
import { format, helper } from '../../../utils'

const ProductItem = ({ item, toggleModal }) => {
  if (!item.product) {
    return null
  }
  return (
    <Row gutter={8} className="margin-bottom">
      <Col span={2}>
        <Avatar shape="square" src={item.product && item.product.covers[0]} />
      </Col>
      <Col span={12}>
        <Link to={`/products/${item.product._id}`}>{item.product && item.product.name}</Link>
      </Col>
      <Col span={4}>
        <Button
          size="small"
          type="primary"
          onClick={() => toggleModal(item.product._id)}
        >
          Đánh giá
        </Button>
      </Col>
      <Col span={6}>
        <p>Số lượng: {item.quantity} kg</p>
      </Col>
    </Row>
  )
}

const OrderItem = ({ order, toggleModal, cancel }) => (
  <Row className="margin-bottom">
    <Card
      title={(
        <Fragment>
          <h3 className="main-title-order">Đơn hàng
            <span className="text-bold">#{order._id}</span>
          </h3>
          <span className="sub-title-order">Đặt ngày: {format.date(order.createdAt)}</span>
        </Fragment>)}
    >
      <Row gutter={16}>
        <Col span={13}>
          {
            order.list.map(item => (
              <ProductItem key={item._id} item={item} toggleModal={toggleModal} />
            ))
          }
        </Col>
        <Col span={3}>
          <Tag>{order.status}</Tag>
        </Col>
        {
          order.status === 'pending' || order.status === 'done' ? (
            <Col span={3}>
              <Button
                size="small"
                type="danger"
                onClick={() => cancel(order._id)}
              >
                Hủy đơn hàng
              </Button>
            </Col>
          ) : null
        }
      </Row>
    </Card>
  </Row>
)

export default class OrderHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      current: '',
    }
  }
  componentDidMount() {
    this.onFilterChange()
  }

  /**
   * Change filter
   */
  onFilterChange = (newFilter = {}) => {
    const { filter } = this.props
    if (!newFilter.page) {
      newFilter.page = 1
    }
    const filters = helper.mergeObjects(filter, newFilter)
    const query = lodash.pick(filters, ['page', 'perpage'])
    this.loadData(query)
  }

  /**
   * On  page change
  */
  onPageChange = (page) => {
    this.onFilterChange({ page: page - 1 })
  }

  loadData = (filter) => {
    const { dispatch } = this.props
    dispatch({
      type: 'profile/fetchOrders',
      payload: filter,
    })
  }

  /**
   * Show detail order
   */
  showInfo = () => {
    Modal.info({
      title: 'Chi tiết đơn hàng',
      content: (
        <span>
          abc
        </span>
      ),
    })
  }

  cancel = (orderId) => {
    const { dispatch } = this.props
    dispatch({
      type: 'profile/cancelOrder',
      orderId,
    })
  }

  toggleModal = (current) => {
    const { modalVisible } = this.state
    const newState = {
      modalVisible: !modalVisible,
    }
    if (current) {
      newState.current = current
    }
    this.setState(newState)
  }

  render() {
    const { orders, filter, dispatch, loading } = this.props
    const { modalVisible, current } = this.state
    return (
      <Col span={16}>
        <Spin spinning={loading.effects['profile/fetchOrders']}>
          <h3>Đơn hàng của tôi ({filter.total})</h3>
          {
            orders.map(item => (
              <OrderItem
                key={item._id}
                showInfo={this.showInfo}
                order={item}
                cancel={this.cancel}
                toggleModal={this.toggleModal}
              />
            ))
          }
          {
            !!orders.length && <Pagination
              size="small"
              defaultPageSize={filter.perpage}
              onChange={this.onPageChange}
              total={filter.total}
            />
          }
          <RateModal
            visible={modalVisible}
            dispatch={dispatch}
            toggleModal={this.toggleModal}
            current={current}
          />
        </Spin>
      </Col>
    )
  }
}
