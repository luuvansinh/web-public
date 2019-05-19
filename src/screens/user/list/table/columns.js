import React from 'react'
import { Avatar, Tag } from 'antd'
import { format } from '../../../../utils'

// import RcPopoverStatistic from './popover-statistic'

// const { confirm } = Modal

export default () => {
  return [{
    title: '#',
    className: 'hidden-break-small',
    dataIndex: '',
    render: (value, row, index) => {
      return index + 1
    },
  }, {
    title: '',
    dataIndex: 'avatar',
    render: (value) => {
      return (<Avatar src={value} shape="square" />)
    },
  }, {
    title: 'Phone',
    dataIndex: 'phone',
    render: (value) => {
      return format.phone(value)
    },
  }, {
    title: 'Email',
    dataIndex: 'email',
    render: (value) => {
      return !value ? '-' : value
    },
  }, {
    title: 'Name',
    dataIndex: 'city',
    render: (value) => {
      return <Tag color="geekblue">{format.city(value)}</Tag>
    },
  }]
}
