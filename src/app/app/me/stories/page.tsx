import { redirect } from 'next/navigation'

export default function StoriesPage() {
  redirect('/app/me/stories/drafts')
}
