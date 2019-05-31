import React, { PureComponent } from 'react'
import { Layout, Row, Button, Col } from 'antd'
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
    const { home: { products, filters }, dispatch, loading } = this.props
    return (
      <Layout className="public-content">
        <Row gutter={16} type="flex" justify="center">
          <Col span={18}>
            <Row gutter={16}>
              {
                products.map(item => (
                  <ProductItem dispatch={dispatch} product={item} key={item._id} />
                ))
              }
            </Row>
          </Col>
        </Row>
        {
          !filters.endData && (
            <Row type="flex" justify="center">
              <Button
                onClick={this.loadMore}
                loading={loading.effects['home/loadmore']}
              >
                Load more
              </Button>
            </Row>
          )
        }
      </Layout>
    )
  }
}

export default connect(({ home, loading, app }) => ({ home, loading, app }))(HomeView)
