import React, { useEffect } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { CheckBoxLabel as CheckBoxLabelComponent, Heading, PrimaryButton, SecondaryButton, Select } from 'smarthr-ui'

import { useCountDownTimer } from '../hooks/useCountDownTimer'
import { useMembers } from '../hooks/useMembers'

import { frame, palette, size } from '../theme'

export const Home = () => {
  const { minutes, remainingTime, isPaused, displayTime, setMinutes, startCountDown, toggleIsPaused } = useCountDownTimer()
  const { currentMember, members, toggleChecked, moveNextTurn, specifyMember } = useMembers()

  const startTimer = () => {
    moveNextTurn()
    startCountDown()
  }

  const handleChangeMember = (value: string | null) => {
    if (!value) return

    specifyMember(value)
    startCountDown()
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

  const memberSelect = (
    <Select
      options={[
        {
          value: null,
          label: '人を指定してスタート',
        },
        ...members
          .filter((member) => member.isParticipant)
          .map(({ name }) => ({
            value: name,
            label: name,
          })),
      ]}
      width={180}
      onChange={(e) => handleChangeMember(e.target.value)}
    />
  )

  return (
    <Container>
      <Head>
        <title>mob-timer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>
        <Title>mob-timer</Title>
        <img src="/images/logo.jpg" width={200} alt="mob-timer" />
      </Header>

      <Main>
        <section>
          <HeadingWrapper>
            <Heading type="sectionTitle">参加者</Heading>
          </HeadingWrapper>

          <Members>
            {members.map(({ name, isParticipant }, i) => (
              <li key={i}>
                <CheckBoxLabel label={name} checked={isParticipant} onChange={() => toggleChecked(name, !isParticipant)} />
              </li>
            ))}
          </Members>
        </section>

        <section>
          <HeadingWrapper>
            <Heading type="sectionTitle">1ターンの時間</Heading>
          </HeadingWrapper>

          <Minutes>
            <MinutesInput type="text" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} />
            <MinutesSuffix>分</MinutesSuffix>
          </Minutes>
        </section>

        <section>
          <HeadingWrapper>
            <Heading type="sectionTitle">モブするぞい</Heading>
          </HeadingWrapper>

          {(currentMember === null || remainingTime === 0) && (
            <Controllers>
              <li>
                <PrimaryButton onClick={() => startTimer()}>{currentMember === null ? 'Start Timer' : 'Next'}</PrimaryButton>
              </li>

              <li>{memberSelect}</li>
            </Controllers>
          )}

          {currentMember && remainingTime !== 0 && (
            <Display>
              <Current>今は {currentMember.name} の番だよ！！</Current>
              <Time>{displayTime}</Time>

              <Controllers>
                <li>
                  <SecondaryButton size="s" onClick={() => toggleIsPaused()}>
                    {isPaused ? '再開' : '一時停止'}
                  </SecondaryButton>
                </li>

                <li>
                  <SecondaryButton size="s" onClick={() => startTimer()}>
                    スキップ
                  </SecondaryButton>
                </li>

                <li>{memberSelect}</li>
              </Controllers>
            </Display>
          )}
        </section>
      </Main>
    </Container>
  )
}

export default Home

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
`
const Header = styled.div`
  margin-bottom: ${size.space.L};
`
const Title = styled.h1`
  margin-bottom: ${size.space.S};
  font-weight: bold;
  font-size: ${size.font.VENTI};
`
const Main = styled.main`
  & > section:not(:first-child) {
    margin-top: ${size.space.M};
  }
`
const HeadingWrapper = styled.div`
  margin-bottom: ${size.space.XS};
`
const Members = styled.ul`
  & > li {
    display: inline-block;
    margin: ${size.space.XXS};
  }
`
// smarthr-ui の表示がなんだかおかしいのでスタイル上書き
const CheckBoxLabel = styled(CheckBoxLabelComponent)`
  & > label > span > span:nth-child(2) {
    left: 0;
  }
`
const Minutes = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const MinutesInput = styled.input`
  width: 20px;
  padding: ${size.space.XXS};
  background-color: #fff;
  border-radius: ${frame.border.radius.m};
  border: ${frame.border.default};
  color: ${palette.TEXT_BLACK};
  font-size: ${size.font.TALL};
  line-height: 1.6;
`
const MinutesSuffix = styled.span`
  display: inline-block;
  margin-left: ${size.space.XXS};
  font-size: ${size.font.TALL};
`
const Display = styled.div`
  margin-top: ${size.space.S};
`
const Current = styled.p`
  margin-bottom: ${size.space.XS};
  font-weight: bold;
  font-size: ${size.font.VENTI};
`
const Time = styled.p`
  margin-bottom: ${size.space.XS};
  font-weight: bold;
  font-size: calc(${size.font.VENTI} + ${size.font.VENTI});
`
const Controllers = styled.ul`
  display: flex;
  flex-direction: column;

  & > li {
    display: flex;
    justify-content: center;

    &:not(:first-child) {
      margin-top: ${size.space.XXS};
    }
  }
`
