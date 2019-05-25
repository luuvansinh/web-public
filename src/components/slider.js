
import React from 'react'
import { Col, Slider } from 'antd';

export default function RcSlider({ title, step = 10000, onChange, onAfterChange, defaultValue }) {
  return (
    <Col span={6} className="rc-component">
      <div className="section-title">
        <h4>{title}</h4>
      </div>
      <Slider
        range
        step={step}
        defaultValue={defaultValue}
        onChange={onChange}
        onAfterChange={onAfterChange}
        min={0}
        max={2000000}
      />
    </Col>
  )
}
