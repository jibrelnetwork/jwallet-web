// @flow

import React from 'react'
import { connect } from 'react-redux'

import {
  type Props,
  ContactsEmptyView,
} from './ContactsEmptyView'

function mapStateToProps() {
  return {
    list: [],
  }
}

export const ContactsEmpty =
  connect< Props, {||}, _, _, _, _ >(mapStateToProps)(React.memo<Props>(ContactsEmptyView))
