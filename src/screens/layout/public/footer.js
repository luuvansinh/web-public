import React from 'react'
import { Layout } from 'antd'
import './style.less'

const { Footer } = Layout

class AppFooter extends React.Component {
  render() {
    return (
      <Footer className="app-footer">
        ĐHBK ©2018 Created by Văn Sinh
      </Footer>
    )
  }
}

export default AppFooter
