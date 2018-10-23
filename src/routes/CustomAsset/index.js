import ModalLayout from 'layouts/ModalLayout'

import Add from './routes/Add'

export default {
  path: 'custom-asset',
  component: ModalLayout,
  childRoutes: [
    Add,
  ],
  indexRoute: {
    onEnter: (nextState, replace) => replace('/custom-asset/add'),
  },
}
