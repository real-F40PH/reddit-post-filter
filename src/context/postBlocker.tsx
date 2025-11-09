import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { usePersistentList } from '../hooks/usePersistentList'

interface PostBlockerContextType {
  blockedPostsMap: Map<string, number>
  total: number
  overlayVisible: boolean
  setOverlayVisible: (boolean) => void
}

const PostBlockerContext = createContext<PostBlockerContextType | undefined>(
  undefined
)

interface PostBlockerProviderProps {
  children: ReactNode
}

export const PostBlockerProvider: React.FC<PostBlockerProviderProps> = ({
  children
}) => {
  const [filterTerms] = usePersistentList('filter-keywords')
  const [safeSubredditsList] = usePersistentList('safe-subreddits-list')
  const [blockedPostsMap] = useState<Map<string, number>>(new Map())
  const [total, setTotal] = useState<number>(0)
  const [overlayVisible, setOverlayVisible] = useState<boolean>(false)

  const safeSubredditsListLower = useMemo(() => {
    return safeSubredditsList.map((x) => x.toLowerCase())
  }, [safeSubredditsList])

  const blockPost = useCallback(
    (subreddit: string, post: HTMLElement) => {
      if (post.style.display === 'none') {
        return
      }
      if (safeSubredditsListLower.includes(subreddit.toLowerCase())) {
        return
      }
      post.style.display = 'none'
      const rsubreddit = `r/${subreddit}`
      blockedPostsMap.set(
        rsubreddit,
        (blockedPostsMap.get(rsubreddit) || 0) + 1
      )
      const total = blockedPostsMap
        .values()
        .reduce((acc, curr) => acc + curr, 0)
      setTotal(total)
    },
    [blockedPostsMap, setTotal, safeSubredditsListLower]
  )

  const applyFilters = useCallback(() => {
    if (!filterTerms.length) {
      return
    }

    console.log('filterterms:', filterTerms)

    const selectorOldReddit = filterTerms
      .map((term) => `[data-subreddit*="${term}" i]`)
      .join(', ')

    const selectorNewReddit = filterTerms
      .map((term) => `[subreddit-name*="${term}" i]`)
      .join(', ')

    document.querySelectorAll(selectorOldReddit).forEach((el: HTMLElement) => {
      blockPost(el.getAttribute('data-subreddit'), el)
    })
    document.querySelectorAll(selectorNewReddit).forEach((el) => {
      blockPost(el.getAttribute('subreddit-name'), el.parentElement)
    })
  }, [filterTerms, blockedPostsMap])

  useEffect(() => {
    applyFilters()
    const observer = new MutationObserver(applyFilters)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => {
      observer.disconnect()
    }
  }, [applyFilters])

  return (
    <PostBlockerContext.Provider
      value={{ blockedPostsMap, total, overlayVisible, setOverlayVisible }}
    >
      {children}
    </PostBlockerContext.Provider>
  )
}

export const usePostBlocker = () => {
  const context = useContext(PostBlockerContext)
  if (!context) {
    throw new Error('usePostBlocker must be used within a PostBlockerProvider')
  }
  return context
}
