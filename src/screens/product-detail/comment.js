import React, { Component, Fragment } from 'react'
import { Card, List, Avatar, Button } from 'antd';
import { format } from '../../utils';
import { ImageConst } from '../../configs';
import AddComment from './modal/add-comment';

export default class CommentView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visibleModal: false,
    }
  }

  toggleModal = () => {
    const { visibleModal } = this.state
    this.setState({ visibleModal: !visibleModal })
  }
  render() {
    const { comments, dispatch, isLoggedIn } = this.props
    const { visibleModal } = this.state
    return (
      <Card
        className="rating-section"
        title="Hỏi đáp về sản phẩm"
      >
        <List
          itemLayout="horizontal"
          dataSource={comments}
          locale={{ emptyText: 'Chưa có bình luận' }}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={ImageConst.defaultAvatar} />}
                title={(
                  <Fragment>
                    {item.user.username}
                    <p>{item.content}</p>
                  </Fragment>
                )}
                description={<span>{format.date(item.created_at)}</span>}
              />
            </List.Item>
          )}
        />
        {
          isLoggedIn &&
          <div className="text-center">
            <Button type="primary" onClick={this.toggleModal}>Bình luận</Button>
          </div>
        }
        <AddComment dispatch={dispatch} toggleModal={this.toggleModal} visible={visibleModal} />
      </Card>
    )
  }
}
