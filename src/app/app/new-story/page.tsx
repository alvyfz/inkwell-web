import NewStory from './components/NewStory'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'New Story'
}
export default function NewStoryPage() {
  return <NewStory />
}
