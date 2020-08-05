import React from 'react'
import ReactDom from 'react-dom'
import Router from '@/main/routes/router'
import '@/presentation/styles/global.scss'

ReactDom.render(
  <Router />,
  document.getElementById('main')
)
