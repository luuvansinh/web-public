import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Layout, Row } from 'antd';
import { ProductItem } from '../../components';

export class View extends PureComponent {
  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props
    if (prevProps.match.params.categoryId !== match.params.categoryId) {
      this.fetchData()
    }
  }


  fetchData = () => {
    const { match, dispatch } = this.props
    dispatch({
      type: 'category/fetch',
      categoryId: match.params.categoryId,
    })
  }

  render() {
    const { category: { category }, dispatch } = this.props
    return !category ? null : (
      <Layout className="public-content">
        <Row gutter={16}>
          {
            category.products.map(item => (
              <ProductItem dispatch={dispatch} product={item} key={item._id} />
            ))
          }
        </Row>
      </Layout>
    )
  }
}

export default connect(({ loading, category }) => ({
  loading,
  category,
}))(View)
