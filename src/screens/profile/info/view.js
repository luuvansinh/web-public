import React, { Component } from 'react'
import { Col, Card, Button } from 'antd';
import '../style.less'

export default class InfoView extends Component {
  render() {
    const { user, toggleModal } = this.props
    if (!user) {
      return null
    }
    return (
      <Col span={8}>
        <Card
          title="Thông tin cá nhân"
          extra={<Button size="small" onClick={toggleModal} >Cập nhật</Button>}
        >
          <p>Họ tên: {user.name}</p>
          <p>SĐT: {user.phone}</p>
          <p>Email: {user.email}</p>
          <p>Địa chỉ: {user.address}</p>
        </Card>
      </Col>
    )
  }
}
