import React, { Component, Fragment } from 'react'
import { Card, List, Avatar, Rate } from 'antd';
import { format } from '../../utils';

export default class RatingView extends Component {
  render() {
    const { ratings } = this.props
    return (
      <Card
        className="rating-section"
        title="Đánh giá của sản phẩm"
      >
        <List
          itemLayout="horizontal"
          dataSource={ratings}
          locale={{ emptyText: 'Chưa có đánh giá' }}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png" />}
                title={(
                  <Fragment>
                    {item.user.fullname}
                  </Fragment>
                )}
                description={(
                  <Fragment>
                    <Rate style={{ fontSize: 10 }} defaultValue={item.stars} disabled />
                    <p>{item.content}</p>
                    <p>{format.date(item.created_at)}</p>
                  </Fragment>
                )}
              />
            </List.Item>
          )}
        />
      </Card>
    )
  }
}
