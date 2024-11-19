import React from 'react'
import TeamSwitcher  from './team-switcher'

function index() {
  return (
    <nav className='flex justify-between items-center px-4 py-2'>
        <div className='flex items-center gap-12'>
            <TeamSwitcher />
        </div>
    </nav>
  )
}

export default index