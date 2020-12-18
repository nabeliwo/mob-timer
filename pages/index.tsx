import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'

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
        <h1 className={styles.title}>
          {currentMember ? (
            <span
              onClick={() => {
                if (remainingTime === 0) {
                  startTimer()
                }
              }}
            >
              {remainingTime === 0 ? '> Next' : `${currentMember.name} : ${remainingTime}`}
            </span>
          ) : (
            <span onClick={() => startTimer()}>{'>'} Start mob-timer</span>
          )}
        </h1>

        {members.map((member, i) => {
          return (
            <button
              key={i}
              onClick={() => {
                startMemberTimer(member)
              }}
            >
              {currentMember?.name === member.name ? <b>{`>> ${member.name}`}</b> : `> ${member.name}`}
            </button>
          )
        })}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}
