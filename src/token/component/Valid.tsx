import React from 'react'
import validbox from '../assets/image/validbox.png'

function Valid() {
  return (
    <div>
      <span className='fs-20'>ご利用ありがとうございました。
</span>
<div className='valid-image-box'>
    <span className='fs-20'>
        この調子で学んでいこう！<br />
          継続は力なり！
    </span>
    <img src={validbox} alt=''/>
</div>
    </div>
  )
}

export default Valid
