import React from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './NotFound.module.css'

const NotFound = () => {
  const history = useNavigate();
  return (
    <>
        <h2 className={styles.go-away-page-text}>페이지가 탈영을 한거 같아요!</h2>
        <div className={styles.go-main}>
            <button className={styles.main-btn} onClick={()=> history('/:id')}>
                <p className={styles.main-btn-text}>
                  메인으로
                </p>
            </button>
        </div>
    </>
  )
}

export default NotFound