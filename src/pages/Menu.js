import React from 'react'
import MenuList from '../components/MenuList'

export default function Menu() {
  return (
    <div>
        <div className="d-flex justify-content-center mt-5">
        <div style={{width: "60em" }}>
          <MenuList />
        </div>
      </div>
    </div>
  )
}
