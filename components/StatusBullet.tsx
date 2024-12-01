import React from 'react'
import { TaskStatus } from './task-form/schema'

type Props = {
    status: TaskStatus
}

export default function StatusBullet(props: Props) {
  const{status} = props;
  if(status === "Ожидание"){
    return (
        <div className="flex items-center gap-2">
          <div className='w-2 h-2 rounded-full bg-blue-500'/>
          <span>Ожидание</span>
        </div>
  );
  } else if(status === "В работе"){
    return (
        <div className="flex items-center gap-2">
          <div className='w-2 h-2 rounded-full bg-yellow-500'/>
          <span>В работе</span>
        </div>
  );
  } else if(status === "Выполнено"){
    return (
        <div className="flex items-center gap-2">
          <div className='w-2 h-2 rounded-full bg-green-500'/>
          <span>Выполнено</span>
        </div>
  );
  }
}
