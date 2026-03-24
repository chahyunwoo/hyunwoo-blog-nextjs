import { CACHE_TAGS, REVALIDATE_TYPES } from '@hyunwoo/shared/config'
import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET

interface RevalidateBody {
  secret: string
  type: string
  slug?: string
}

export async function POST(request: NextRequest) {
  if (!REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Server misconfigured' }, { status: 500 })
  }

  let body: RevalidateBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 })
  }

  if (body.secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  const validTypes = Object.values(REVALIDATE_TYPES) as string[]
  if (!validTypes.includes(body.type)) {
    return NextResponse.json({ message: `Invalid type: ${body.type}` }, { status: 400 })
  }

  if (body.type === REVALIDATE_TYPES.BLOG) {
    revalidateTag(CACHE_TAGS.BLOG_RECENT, { expire: 0 })
    revalidatePath('/')
  }

  if (body.type === REVALIDATE_TYPES.PORTFOLIO) {
    revalidateTag(CACHE_TAGS.PORTFOLIO_PROFILE, { expire: 0 })
    revalidateTag(CACHE_TAGS.PORTFOLIO_EXPERIENCES, { expire: 0 })
    revalidateTag(CACHE_TAGS.PORTFOLIO_PROJECTS, { expire: 0 })
    revalidateTag(CACHE_TAGS.PORTFOLIO_SKILLS, { expire: 0 })
    revalidateTag(CACHE_TAGS.PORTFOLIO_EDUCATION, { expire: 0 })
    revalidateTag(CACHE_TAGS.PORTFOLIO_LOCALES, { expire: 0 })
    revalidateTag(CACHE_TAGS.PORTFOLIO_WORKS, { expire: 0 })
    revalidatePath('/')
  }

  return NextResponse.json({ revalidated: true, type: body.type })
}
