import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Prando from 'prando'

import { Member, members } from '../state/member'
import { useCountDownTimer } from '../hooks/useCountDownTimer'
import styles from '../styles/pages/Home.module.css'

const shuffle = (array: any[], seed: string) => {
  const rng = new Prando(seed)
  const tmpArray = [...array]

  const shuffled = [...Array(tmpArray.length)].map((_, index) => {
    const picked_index = rng.nextInt(index, tmpArray.length - 1)
    const tmp = tmpArray[index]
    tmpArray[index] = tmpArray[picked_index]
    tmpArray[picked_index] = tmp

    return tmpArray[index]
  })

  return shuffled
}

const shuffledMembers = shuffle(members, Date.now().toString())

const pickMember = (number: number): Member => {
  const index = number % shuffledMembers.length

  return shuffledMembers[index]
}

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentMember, setCurrentMember] = useState<Member | undefined>()
  const { startCountDown, remainingTime, displayTime } = useCountDownTimer()

  const startNextTimer = () => {
    const newIndex = currentIndex + 1

    setCurrentIndex(newIndex)
    startTimer(newIndex)
  }

  const startMemberTimer = (member: Member) => {
    const found = shuffledMembers.find((shuffledMember) => shuffledMember.name == member.name)
    const newIndex = shuffledMembers.indexOf(found)

    setCurrentIndex(newIndex)
    startTimer(newIndex)
  }

  const startTimer = (nextIndex: number) => {
    const member = pickMember(nextIndex)
    setCurrentMember(member)

    startCountDown(2)
  }

  useEffect(() => {
    // TODO: ちゃんとするときはユーザが能動的に通知のポップアップを表示するようにしないとだめ
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    if (remainingTime === 0) {
      new Notification('時間だよ！')
    }
  }, [remainingTime])

  return (
    <div className={styles.container}>
      <Head>
        <title>mob-timer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <img className={styles.logo} src="/images/logo.jpg" width={200} alt="mob-timer" />

        {currentMember ? (
          <button
            className={styles.title}
            onClick={() => {
              if (remainingTime === 0) {
                startNextTimer()
              }
            }}
          >
            {remainingTime === 0 ? '> Next' : `${currentMember.name} : ${displayTime}`}
          </button>
        ) : (
          <button className={styles.title} onClick={() => startNextTimer()}>
            {'>'} Start mob-timer
          </button>
        )}

        <button className={styles.button} onClick={() => startNextTimer()}>
          ⏭
        </button>

        {members.map((member, i) => {
          return (
            <button
              key={i}
              className={styles.button}
              onClick={() => {
                startMemberTimer(member)
              }}
            >
              {currentMember?.name === member?.name ? `>> ${member?.name}` : member?.name}
            </button>
          )
        })}
      </main>
    </div>
  )
}
