import styled from 'styled-components'
import { usePersistentList } from '../hooks/usePersistentList'
import toast from 'react-hot-toast'
import { useCallback, useRef } from 'react'

const SettingsContainer = styled.div`
  width: 100%;
`

const LabelContainer = styled.div`
  width: 100%;
  margin-top: 12px;
  margin-bottom: 8px;
`

const TextAreaContainer = styled.textarea`
  width: 100%;
  min-height: 70px;
`

const Settings = () => {
  const [filterTerms, setFilterTerms] = usePersistentList('filter-keywords')
  const [safeSubredditsList, setSafeSubredditsList] = usePersistentList(
    'safe-subreddits-list'
  )

  const filterTermsInput = useRef<HTMLTextAreaElement | null>(null)
  const safeSubredditsListInput = useRef<HTMLTextAreaElement | null>(null)

  const handleSaveSettings = useCallback(() => {
    setFilterTerms((filterTermsInput.current?.value || '').split('\n') || [])
    setSafeSubredditsList(
      (safeSubredditsListInput.current?.value || '').split('\n') || []
    )
    toast.success('Settings saved')
  }, [setFilterTerms, setSafeSubredditsList])

  return (
    <SettingsContainer>
      <LabelContainer>Subreddit Filter terms:</LabelContainer>
      <TextAreaContainer ref={filterTermsInput}>
        {filterTerms.join('\n')}
      </TextAreaContainer>
      <LabelContainer>Safe Subreddit names:</LabelContainer>
      <TextAreaContainer ref={safeSubredditsListInput}>
        {safeSubredditsList.join('\n')}
      </TextAreaContainer>
      <button onClick={handleSaveSettings}>save settings</button>
    </SettingsContainer>
  )
}

export default Settings
