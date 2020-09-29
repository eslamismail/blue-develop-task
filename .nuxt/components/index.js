export { default as DashboardHeader } from '../../admin/components/DashboardHeader.vue'
export { default as DataTable } from '../../admin/components/dataTable.vue'
export { default as ProductCarousel } from '../../admin/components/productCarousel.vue'
export { default as SingleImageEdit } from '../../admin/components/singleImageEdit.vue'
export { default as AdminHeader } from '../../admin/components/include/adminHeader.vue'
export { default as AdminNav } from '../../admin/components/include/adminNav.vue'
export { default as UserHeader } from '../../admin/components/include/userHeader.vue'
export { default as UserNav } from '../../admin/components/include/userNav.vue'
export { default as Error } from '../../admin/components/public/error.vue'
export { default as ImageInput } from '../../admin/components/public/imageInput.vue'

export const LazyDashboardHeader = import('../../admin/components/DashboardHeader.vue' /* webpackChunkName: "components/DashboardHeader" */).then(c => c.default || c)
export const LazyDataTable = import('../../admin/components/dataTable.vue' /* webpackChunkName: "components/dataTable" */).then(c => c.default || c)
export const LazyProductCarousel = import('../../admin/components/productCarousel.vue' /* webpackChunkName: "components/productCarousel" */).then(c => c.default || c)
export const LazySingleImageEdit = import('../../admin/components/singleImageEdit.vue' /* webpackChunkName: "components/singleImageEdit" */).then(c => c.default || c)
export const LazyAdminHeader = import('../../admin/components/include/adminHeader.vue' /* webpackChunkName: "components/include/adminHeader" */).then(c => c.default || c)
export const LazyAdminNav = import('../../admin/components/include/adminNav.vue' /* webpackChunkName: "components/include/adminNav" */).then(c => c.default || c)
export const LazyUserHeader = import('../../admin/components/include/userHeader.vue' /* webpackChunkName: "components/include/userHeader" */).then(c => c.default || c)
export const LazyUserNav = import('../../admin/components/include/userNav.vue' /* webpackChunkName: "components/include/userNav" */).then(c => c.default || c)
export const LazyError = import('../../admin/components/public/error.vue' /* webpackChunkName: "components/public/error" */).then(c => c.default || c)
export const LazyImageInput = import('../../admin/components/public/imageInput.vue' /* webpackChunkName: "components/public/imageInput" */).then(c => c.default || c)
