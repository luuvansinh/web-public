import React, { Component } from 'react'
import { Layout, Row, Card, Col, Rate, Button, Icon } from 'antd'
import { connect } from 'dva'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import { RcBreadcrumb } from '../../components'
import { format } from '../../utils'
import './style.less'
// import CommentView from './comment'
// import RatingView from './rating'
import { ImageConst } from '../../configs'

class ProductView extends Component {
  componentDidMount() {
    const { match, dispatch } = this.props
    dispatch({
      type: 'product/fetch',
      payload: {
        id: match.params.productId,
      },
    })
  }

  addToCart = () => {
    const { product: { product }, dispatch } = this.props
    dispatch({
      type: 'app/addCart',
      productId: product._id,
    })
  }
  render() {
    const { product: { product } } = this.props
    if (!product) {
      return null
    }
    const parents = [{
      _id: 1,
      url: '/',
      name: 'Trang chủ',
    }]
    const images = product.covers.length ?
      product.covers.map(item => ({ original: item, thumbnail: item }))
      :
      [{ original: ImageConst.defaultPhoto, thumbnail: ImageConst.defaultPhoto }]
    return (
      <Layout className="container">
        <RcBreadcrumb name={product.name} parents={parents} />
        <Layout className="page-content">
          <Card>
            <Row gutter={24}>
              <Col xs={12} sm={12} md={10} lg={10} >
                <ImageGallery
                  items={images}
                  showPlayButton={false}
                  showNav={false}
                  showFullscreenButton={false}
                  lazyLoad
                  showIndex
                  autoPlay
                />
              </Col>
              <Col xs={12} sm={12} md={14} lg={14} >
                <h3>
                  {product.name}
                </h3>
                <p>Giá: {format.number(product.price)} vnđ</p>
                <p>Số lượng: {product.quantity}</p>
                <div>
                  <Rate className="font-rate" disabled defaultValue={1} />
                </div>
                {/* <p>{0} đánh giá | {product.comments.length} bình luận</p> */}
                {/* <p className="product-origin">Nguồn gốc: {product.origin}</p> */}
                {/* <p>Cửa hàng: {product.shop && product.shop.name}</p> */}
                <Button onClick={this.addToCart}>
                  <Icon type="shopping-cart" theme="outlined" />Thêm vào giỏ hàng
                </Button>
              </Col>
            </Row>
          </Card>
          <Card
            className="rating-section"
            title="Mô tả sản phẩm"
          >
            <p>
              {product.desc}
            </p>
          </Card>
          {/* <RatingView isLoggedIn={isLoggedIn} dispatch={dispatch} ratings={product.ratings.list} /> */}
          {/* <CommentView isLoggedIn={isLoggedIn} dispatch={dispatch} comments={product.comments} /> */}
        </Layout>
      </Layout>
    )
  }
}

export default connect(({ app, product }) => ({ app, product }))(ProductView)
