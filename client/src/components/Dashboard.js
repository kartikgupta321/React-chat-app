import React from 'react'
import { useConversations } from '../contexts/ConversationsProvider';
import OpenConversation from './OpenConversation';
import Sidebar from './Sidebar';
import {useMediaQuery} from 'react-responsive'

export default function Dashboard({ id }) {
  const { selectedConversation } = useConversations()
  const laptop = useMediaQuery({minWidth:1100})
  return laptop? (
    <div className="d-flex" style={{ height: '100vh' }}>
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  ):
  (
    <div className="d-flex" style={{ height: '100vh' }}>
      <Sidebar id={id} />
    </div>
  )
} 