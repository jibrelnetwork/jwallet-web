import ModalLayout from 'layouts/ModalLayout'

import Add from './routes/Add'
import Edit from './routes/Edit'

export default store => ({
  path: 'custom-asset',
  component: ModalLayout,
  indexRoute: { onEnter: (nextState, replace) => replace('/custom-asset/add') },
  childRoutes: [
    Add(store),
    Edit(store),
  ],
})

