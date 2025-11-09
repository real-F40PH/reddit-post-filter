import { useLocalStorage } from '@uidotdev/usehooks'

export const usePersistentList = (key) => {
  const [persistentList, setPersistentList] = useLocalStorage<Array<string>>(
    key,
    []
  )

  return [persistentList, setPersistentList]
}
