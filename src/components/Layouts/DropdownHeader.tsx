import React from 'react'
import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'
import { Avatar } from '@mui/material'
import userStore from 'stores/user'
import { MENU_HEADER } from 'consts/menu'
import { useNavigate } from 'react-router-dom'
import { paths } from 'consts/paths'

const items: MenuProps['items'] = [...MENU_HEADER]

const DropdownHeader = () => {
  const navigate = useNavigate()

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '1') {
      navigate(paths.profile)
    } else if (key === '2') {
      userStore.getState().logout()
    }
  }
  return (
    <Dropdown menu={{ items, onClick }} placement="bottomRight" arrow>
      <Avatar
        sx={{
          cursor: 'pointer',
        }}
      />
    </Dropdown>
  )
}

export default DropdownHeader
