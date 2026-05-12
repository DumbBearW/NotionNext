import { NextRequest, NextResponse } from 'next/server'
import { checkStrIsNotionId, getLastPartOfUrl } from '@/lib/utils'
import { idToUuid } from 'notion-utils'
import BLOG from './blog.config'

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)',
    '/',
    '/(api|trpc)(.*)',
    '/music/:path*',
    '/images/:path*',
    '/subs/:path*'
  ]
}

/**
 * 防盗链（优化版）
 * - 只拦外站 referer
 * - 不拦空 referer（避免误伤播放器 / fetch / track）
 * - 只作用于指定目录 + 文件类型
 */
function mediaHotlinkProtection(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  // 统一目录判断
  const isMediaDir = /^\/(music|images|subs)\//.test(pathname)

  // 文件类型过滤
  const isMediaFile =
    /\.(m4a|lrc|avif|jpg|webp|webm|mp4|ogg|srt|vtt|ttml)$/i.test(pathname)

  if (!isMediaDir || !isMediaFile) return null

  const referer = req.headers.get('referer')
  const host = req.headers.get('host')

  // 只拦“明确外站引用”
  const isExternalHotlink =
    referer &&
    host &&
    !referer.includes(host)

  if (isExternalHotlink) {
    return new NextResponse('Hotlinking not allowed', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain'
      }
    })
  }

  return null
}

export default async function middleware(req: NextRequest) {
  const hotlinkResponse = mediaHotlinkProtection(req)
  if (hotlinkResponse) return hotlinkResponse

  if (BLOG['UUID_REDIRECT']) {
    let redirectJson: Record<string, string> = {}

    try {
      const response = await fetch(`${req.nextUrl.origin}/redirect.json`)
      if (response.ok) {
        redirectJson = await response.json()
      }
    } catch (err) {
      console.error('Error fetching redirect.json:', err)
    }

    let lastPart = getLastPartOfUrl(req.nextUrl.pathname)

    if (checkStrIsNotionId(lastPart)) {
      lastPart = idToUuid(lastPart)
    }

    if (lastPart && redirectJson[lastPart]) {
      const redirectToUrl = req.nextUrl.clone()
      redirectToUrl.pathname = '/' + redirectJson[lastPart]
      return NextResponse.redirect(redirectToUrl, 308)
    }
  }

  return NextResponse.next()
}
