import type { VerticalNavItems } from '@/@layouts/types'

export default [
  {
    title: 'Dashboard',
    icon: { icon: 'bx-home-alt' },

    children: [
      { title: 'Summary', to: 'index' },
      { title: 'Product Analytics', to: 'dashboard-product-analytics' },
      { title: 'User Analytics', to: 'dashboard-user-analytics' },
    ],
  },
  { heading: 'Pages' },
  {
    title: 'Product',
    to: { name: 'pages-product' },
    icon: { icon: 'bx-box' },
  },
  {
    title: 'Content',
    to: { name: 'pages-content' },
    icon: { icon: 'bx-file-blank' },
  },
  {
    title: 'Permission',
    to: { name: 'pages-permission' },
    icon: { icon: 'bx-lock' },
  },
  {
    title: 'Quotation',
    to: { name: 'pages-quotation' },
    icon: { icon: 'bx-data' },
  },
] as VerticalNavItems
