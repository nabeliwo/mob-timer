import { useState } from 'react'

import { shuffle } from '../libs/array'

export type Member = {
  name: string
  isParticipant: boolean
}

const memberResources = [
  {
    name: 'meganemura',
    defaultChecked: true,
  },
  {
    name: 'f440',
    defaultChecked: false,
  },
  {
    name: 'nabeliwo',
    defaultChecked: true,
  },
  {
    name: 'TAKATA Shota',
    defaultChecked: true,
  },
  {
    name: 'ringo',
    defaultChecked: false,
  },
  {
    name: 'sato-s',
    defaultChecked: true,
  },
  {
    name: 'ykyuki21',
    defaultChecked: true,
  },
]
const todaySeed = (() => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate()

  return new Date(year, month, day).getTime().toString()
})()

export const useMembers = () => {
  const [order, setOrder] = useState<number | null>(null)
  const [members, setMembers] = useState<Member[]>(
    memberResources.map(({ name, defaultChecked }) => ({ name, isParticipant: defaultChecked })),
  )
  const shuffledMembers = shuffle(members, todaySeed).filter((member) => member.isParticipant)

  const toggleChecked = (name: string, checked: boolean) => {
    setMembers((currentMembers) => {
      return currentMembers.map((member) => {
        if (member.name !== name) return member

        return {
          name: member.name,
          isParticipant: checked,
        }
      })
    })
  }

  const moveNextTurn = () => {
    if (order === null) {
      setOrder(0)
      return
    }

    setOrder((currentOrder) => currentOrder + 1)
  }

  const specifyMember = (name: string) => {
    const index = shuffledMembers.findIndex((member) => member.name === name)
    setOrder(index)
  }

  return {
    currentMember: order === null ? null : shuffledMembers[order % shuffledMembers.length],
    members,
    toggleChecked,
    moveNextTurn,
    specifyMember,
  }
}
