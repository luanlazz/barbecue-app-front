import React from 'react'
import ReactDom from 'react-dom'
import { Router } from '@/presentation/components'
import '@/presentation/styles/global.scss'

ReactDom.render(
  <Router />,
  document.getElementById('main')
)
