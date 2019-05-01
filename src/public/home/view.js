import React, { PureComponent } from 'react'
import { Layout, Row, Button } from 'antd'
import { connect } from 'dva';
import { ProductItem } from '../../components';

export class HomeView extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'home/products',
      payload: { page: 0 },
    })
  }

  loadMore = () => {
    this.props.dispatch({
      type: 'home/loadmore',
    })
  }

  render() {
    const { home: { products }, dispatch, loading } = this.props
    return (
      <Layout className="public-content">
        <Row gutter={16}>
          {
            products.map(item => (
              <ProductItem dispatch={dispatch} product={item} key={item._id} />
            ))
          }
        </Row>
        <Row type="flex" justify="center">
          <Button
            onClick={this.loadMore}
            loading={loading.effects['home/loadmore']}
          >Load more</Button>
        </Row>
      </Layout>
    )
  }
}

export default connect(({ home, loading }) => ({ home, loading }))(HomeView)
