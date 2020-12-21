import React, { useEffect, useState } from 'react'
import Head from 'next/head'

import { Member, members } from '../state/member'
import { useCountDownTimer } from '../hooks/useCountDownTimer'
import styles from '../styles/pages/Home.module.css'

export default function Home() {
  const [currentMember, setCurrentMember] = useState<Member | undefined>()
  const { startCountDown, remainingTime, displayTime } = useCountDownTimer()

  const startTimer = () => {
    const nextMemberCandidates = members.filter((member) => member.name !== currentMember?.name)
    console.log(nextMemberCandidates)
    const nextMember = nextMemberCandidates[Math.floor(Math.random() * nextMemberCandidates.length)]

    startMemberTimer(nextMember)
  }
  const startMemberTimer = (member: Member) => {
    setCurrentMember(member)
    startCountDown(10)
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
            {remainingTime === 0 ? '> Next' : `${currentMember.name} : ${displayTime}`}
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
