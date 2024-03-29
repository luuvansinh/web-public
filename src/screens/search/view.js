import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Layout, Row, Col, Card } from 'antd';
import { ProductItem, RcSelectBox } from '../../components';
import { helper } from '../../utils';
import { AppConst } from '../../configs';

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
    const { search: { filter } } = this.props
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
        {
          !!products.length && (
            <Row gutter={16} type="flex" justify="center">
              <Col span={18} className="filter-box">
                {/* <RcSlider
                  defaultValue={[0, 2000000]}
                  step={1000}
                  title="Giá"
                /> */}
                <RcSelectBox
                  title="Sắp xếp theo"
                  initValue={AppConst.sort.default}
                  values={AppConst.sort.list}
                  onChange={sort => this.onFilterChange({ sort })}
                  isHorizontal
                />
              </Col>
            </Row>
          )
        }
        <Row gutter={16} type="flex" justify="center">
          <Col span={18}>
            <Row gutter={16}>
              {
                products.length ? products.map(item => (
                  <ProductItem dispatch={dispatch} product={item} key={item._id} />
                )) : (
                  <Card>
                    Không tìm thấy sản phẩm phù hợp
                  </Card>
                )
              }
            </Row>
          </Col>
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
