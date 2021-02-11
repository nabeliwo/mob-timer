import Prando from 'prando'

export const shuffle = <T>(array: T[], seed: string) => {
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
