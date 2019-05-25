import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Layout, Row } from 'antd';
import { ProductItem } from '../../components';
import { helper } from '../../utils';

export class SearchView extends PureComponent {
  componentDidMount() {
    this.onFilterChange({})
  }

  componentDidUpdate(prevProps) {
    const { search: { filter: { keyword } } } = this.props
    if (keyword !== prevProps.search.filter.keyword) {
      this.onFilterChange({ keyword })
    }
  }

  onFilterChange = (newFilter = {}) => {
    const { app: { filter } } = this.props
    const filters = helper.mergeObjects(filter, newFilter)
    this.fetchData(filters)
  }

  fetchData = (query) => {
    this.props.dispatch({
      type: 'search/search',
      payload: query,
    })
  }

  render() {
    const { search: { products }, dispatch } = this.props
    return (
      <Layout className="public-content">
        <Row gutter={16}>
          {
            products.map(item => (
              <ProductItem dispatch={dispatch} product={item} key={item._id} />
            ))
          }
        </Row>
      </Layout>
    )
  }
}

export default connect(({ loading, app, search }) => ({
  loading,
  app,
  search,
}))(SearchView)
