import React, { Component, Fragment } from 'react'
import { Layout, Form, Row } from 'antd';
import { connect } from 'dva'
import { RcBreadcrumb } from '../../components'
import './style.less'
import { InfoView } from './info';
import { OrderHistoryView } from './order-history'
import { UpdateModal } from './update-info'

class ProfileView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      modalVisible: false,
    }
  }

  /**
   * Handle change input form
   */
  onChange = (e) => {
    const newState = {}
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err) => {
      if (!err) {
        const { email, password } = this.state
        this.props.dispatch({
          type: 'app/login',
          payload: {
            email,
            password,
          },
        })
        this.resetState()
      }
    })
  }

  /**
   * Reset state
   */
  resetState = () => {
    this.setState({
      email: '',
      password: '',
    })
  }

  toggleModal = () => {
    const { modalVisible } = this.state
    this.setState({ modalVisible: !modalVisible })
  }
  render() {
    const { app: { pUser }, dispatch, profile: { orders, filter }, loading } = this.props
    return (
      <Layout className="container">
        <Fragment>
          <RcBreadcrumb name="Tài khoản của tôi" />
          <Layout className="page-content">
            <Row gutter={16}>
              <InfoView user={pUser} toggleModal={this.toggleModal} />
              <OrderHistoryView
                dispatch={dispatch}
                orders={orders}
                filter={filter}
                loading={loading}
              />
            </Row>
            <UpdateModal
              dispatch={dispatch}
              user={pUser}
              toggleModal={this.toggleModal}
              visible={this.state.modalVisible}
            />
          </Layout>
        </Fragment>
      </Layout>
    )
  }
}
const LoginForm = Form.create()(ProfileView);

export default connect(({ app, profile, loading }) => ({ app, profile, loading }))(LoginForm)
