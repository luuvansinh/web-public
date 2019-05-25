import React, { PureComponent } from 'react'
import { Link } from 'dva/router'
import { Layout, Menu, Row, Badge, Icon, Avatar, Dropdown, Input, Col } from 'antd';
import { ImageConst, MessageConst } from '../../../configs'
import { LoginModal } from './modals'
import './style.less'

export class PHeader extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isVisibleLoginModal: false,
      isLogin: true,
    }
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'app/getCategories',
    })
  }

  onSearch = (keyword) => {
    this.props.dispatch({
      type: 'app/search',
      keyword,
    })
  }

  toggleLoginModal = () => {
    const { isVisibleLoginModal } = this.state
    this.setState({ isVisibleLoginModal: !isVisibleLoginModal })
  }

  toggleRegisterModal = () => {
    const { isVisibleLoginModal } = this.state
    this.setState({
      isVisibleLoginModal: !isVisibleLoginModal,
      isLogin: false,
    })
  }

  changeForm = (type) => {
    this.setState({ isLogin: type === 'login' })
  }

  render() {
    const { categories, hasPublicUser, pUser, dispatch, cart, keyword } = this.props
    const { isVisibleLoginModal, isLogin } = this.state
    const popupContent = (
      <Menu>
        <Menu.Item onClick={this.toggleLoginModal}>
          {MessageConst.login}
        </Menu.Item>
        <Menu.Item onClick={this.toggleRegisterModal}>
          {MessageConst.register}
        </Menu.Item>
      </Menu>
    )
    return (
      <Layout.Header className="header app-header">
        <Row className="logo-header" type="flex" justify="space-between">
          <Link to="/">
            <img src={ImageConst.logo} alt="" height={80} />
          </Link>
          <Col span={12} className="padding-top-20">
            <Input.Search
              placeholder={MessageConst.search}
              size="large"
              name="keyword"
              enterButton
              onSearch={this.onSearch}
              defaultValue={keyword}
            />
          </Col>
          <div className="right-menu">
            <div className="badge-container margin-right-12 cursor-pointer">
              {
                !hasPublicUser ? (
                  <Dropdown overlay={popupContent}>
                    <Icon style={{ fontSize: 30 }} type="user" />
                  </Dropdown>
                ) : (
                  <Link to="/profile">
                    <Avatar src={pUser.avatar || ImageConst.defaultAvatar} />
                  </Link>
                )
              }
            </div>
            <div className="badge-container cursor-pointer">
              <Link to="/cart">
                <Badge count={cart.length}>
                  <Icon style={{ fontSize: 30 }} type="shopping-cart" />
                </Badge>
              </Link>
            </div>
          </div>
        </Row>
        <Menu
          theme="dark"
          mode="horizontal"
          className="menu-header"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          {
            categories.map(item => (
              <Menu.Item key={item._id}>
                <Link to={`/categories/${item._id}`}>
                  {item.name}
                </Link>
              </Menu.Item>
            ))
          }
        </Menu>
        <LoginModal
          onClose={this.toggleLoginModal}
          visible={isVisibleLoginModal}
          isLogin={isLogin}
          changeForm={this.changeForm}
          dispatch={dispatch}
        />
      </Layout.Header>
    )
  }
}

export default PHeader
