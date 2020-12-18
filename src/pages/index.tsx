import React, { useEffect, useState } from 'react'
import Head from 'next/head'

import styles from '../styles/pages/Home.module.css'

type Member = {
  name: string
}

export default function Home() {
  const members: Member[] = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }]

  const [currentMember, setCurrentMember] = useState<Member | undefined>()
  const [remainingTime, setRemainingTime] = useState(10)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRemainingTime(Math.max(remainingTime - 1, 0))
    }, 1000)

    return () => {
      clearTimeout(timeoutId)
    }
  })

  const startTimer = () => {
    const nextMemberCandidates = members.filter((member) => member.name !== currentMember?.name)
    console.log(nextMemberCandidates)
    const nextMember = nextMemberCandidates[Math.floor(Math.random() * nextMemberCandidates.length)]

    startMemberTimer(nextMember)
  }
  const startMemberTimer = (member: Member) => {
    setCurrentMember(member)
    setRemainingTime(10)
  }

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
                startTimer()
              }
            }}
          >
            {remainingTime === 0 ? '> Next' : `${currentMember.name} : ${remainingTime}`}
          </button>
        ) : (
          <button className={styles.title} onClick={() => startTimer()}>
            {'>'} Start mob-timer
          </button>
        )}

        {members.map((member, i) => {
          return (
            <button
              key={i}
              className={styles.button}
              onClick={() => {
                startMemberTimer(member)
              }}
            >
              {currentMember?.name === member.name ? `>> ${member.name}` : member.name}
            </button>
          )
        })}
      </main>
    </div>
  )
}
