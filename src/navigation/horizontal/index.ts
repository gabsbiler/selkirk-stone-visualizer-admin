import type { VerticalNavItems } from '@/@layouts/types'

export default [
  {
    title: 'Dashboard',
    icon: { icon: 'bx-home-alt' },
    action: 'Access',
    subject: 'analytics',

    children: [
      {
        title: 'Summary',
        to: 'index',
        action: 'Access',
        subject: 'analytics',
      },
      {
        title: 'Product Analytics',
        to: 'dashboard-product-analytics',
        action: 'Access',
        subject: 'analytics',
      },
      {
        title: 'User Analytics',
        to: 'dashboard-user-analytics',
        action: 'Access',
        subject: 'analytics',
      },
    ],
  },
  {
    title: 'Visualizer Uploads',
    to: { name: 'pages-visualizer-uploads' },
    icon: { icon: 'bx-lock' },
    action: 'Access',
    subject: 'administrator',
  },
  { heading: 'Pages' },

  // {
  //   title: 'Product',
  //   to: { name: 'pages-product' },
  //   icon: { icon: 'bx-box' },
  //   action: 'Access',
  //   subject: 'product_management',
  // },
  {
    title: 'Content',
    to: { name: 'pages-content' },
    icon: { icon: 'bx-file-blank' },
    action: 'Access',
    subject: 'content_management',
  },
  {
    title: 'Sample Scenes',
    icon: { icon: 'bx-window' },
    action: 'Access',
    subject: 'sample_scenes',

    children: [
      {
        title: 'Exterior',
        to: 'sample-scenes-exterior',
        action: 'Access',
        subject: 'sample_scenes',
      },
      {
        title: 'Interior',
        to: 'sample-scenes-interior',
        action: 'Access',
        subject: 'sample_scenes',
      },
      {
        title: 'Non-Combustible Mantle',
        to: 'sample-scenes-non-combustible-mantle',
        action: 'Access',
        subject: 'sample_scenes',
      },
    ],
  },
  {
    title: 'Permission',
    to: { name: 'pages-permission' },
    icon: { icon: 'bx-lock' },
    action: 'Access',
    subject: 'administrator',
  },

  // {
  //   title: 'Quotation',
  //   to: { name: 'pages-quotation' },
  //   icon: { icon: 'bx-data' },
  //   action: 'Access',
  //   subject: 'support',
  // },

] as VerticalNavItems
