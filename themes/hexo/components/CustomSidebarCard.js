import { siteConfig } from '@/lib/config'
import { useEffect, useState } from 'react'
import CONFIG from '../config'
import Card from './Card'

const escapeHtmlAttr = value =>
  String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const getUrlParam = (url, key) => {
  if (!url) return ''
  try {
    return new URL(url, 'https://notionnext.local').searchParams.get(key) || ''
  } catch {
    return ''
  }
}

const withQueryParam = (url, key, value) => {
  if (!url || !value) return url
  try {
    const isAbsolute = /^[a-z][a-z\d+.-]*:\/\//i.test(url)
    const parsed = new URL(url, 'https://notionnext.local')
    if (!parsed.searchParams.has(key)) {
      parsed.searchParams.set(key, value)
    }
    if (isAbsolute) return parsed.toString()
    return `${parsed.pathname}${parsed.search}${parsed.hash}`
  } catch {
    return `${url}${url.includes('?') ? '&' : '?'}${key}=${encodeURIComponent(value)}`
  }
}

const normalizeKeepAndroidOpenLang = lang => {
  const value = String(lang || '').trim()
  const lower = value.toLowerCase()
  if (!value) return 'en'
  if (lower.startsWith('en')) return 'en'
  if (lower === 'zh' || lower === 'zh-cn' || lower === 'zh-hans') return 'zh-CN'
  if (lower === 'zh-tw' || lower === 'zh-hk' || lower === 'zh-hant') return value
  return value.split('-')[0] || 'en'
}

const getKeepAndroidOpenLink = (url, lang) => {
  if (!url) return ''
  try {
    const parsed = new URL(url, 'https://notionnext.local')
    if (parsed.hostname !== 'keepandroidopen.org') return ''

    const linkParam = parsed.searchParams.get('link')
    if (linkParam === 'none') return ''
    if (linkParam) return linkParam

    const locale = normalizeKeepAndroidOpenLang(
      lang || parsed.searchParams.get('lang') || 'en'
    )
    return `https://keepandroidopen.org${locale === 'en' ? '' : `/${locale}/`}`
  } catch {
    return ''
  }
}

const isInAppBrowser = () => {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent || ''
  return /MicroMessenger|WeChat|Instagram|Threads|FBAN|FBAV|Line\/|Weibo|QQ\/|QQBrowser|Twitter|Bluesky|Telegram|Discord|Heybox|XiaoHeiHe|XiaoHongShu|NewsArticle/i.test(ua)
}

const CustomSidebarCard = () => {
  const title = siteConfig('HEXO_WIDGET_CUSTOM_CARD_TITLE', '', CONFIG)
  const content = siteConfig('HEXO_WIDGET_CUSTOM_CARD_CONTENT', '', CONFIG)
  const scriptSrc = siteConfig('HEXO_WIDGET_CUSTOM_CARD_SCRIPT_SRC', '', CONFIG)
  const link = siteConfig('HEXO_WIDGET_CUSTOM_CARD_LINK', '', CONFIG)
  const linkText = siteConfig(
    'HEXO_WIDGET_CUSTOM_CARD_LINK_TEXT',
    '查看详情',
    CONFIG
  )
  const [needsIframeClickProxy, setNeedsIframeClickProxy] = useState(false)

  useEffect(() => {
    setNeedsIframeClickProxy(isInAppBrowser())
  }, [])

  const lines = Array.isArray(content)
    ? content.filter(Boolean)
    : `${content || ''}`
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean)
  const scriptTargetId = 'hexo-custom-sidebar-card-script'
  const siteLang = siteConfig('LANG', 'zh-CN')
  const scriptLang = normalizeKeepAndroidOpenLang(
    getUrlParam(scriptSrc, 'lang') || siteLang
  )
  const scriptUrlWithLang = withQueryParam(scriptSrc, 'lang', scriptLang)
  const scriptUrl = scriptUrlWithLang
    ? `${scriptUrlWithLang}${scriptUrlWithLang.includes('?') ? '&' : '?'}id=${scriptTargetId}`
    : ''
  const iframeLang = siteLang
  const iframeClickUrl = link || getKeepAndroidOpenLink(scriptUrl, iframeLang)
  const iframeTextPatchScript = `(() => { const replace = () => { const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode); nodes.forEach(node => { node.nodeValue = node.nodeValue.replace(/安卓将成为一个封闭平台/g, 'Android 将成为一个封闭平台'); }); }; replace(); new MutationObserver(replace).observe(document.body, { childList: true, subtree: true, characterData: true }); })();`
  const iframeSrcDoc = scriptUrl
    ? `<!doctype html><html lang="${escapeHtmlAttr(iframeLang)}"><head><meta charset="utf-8"><base target="_blank"><style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}body{min-height:58px;display:flex;align-items:center}#${scriptTargetId}{width:100%}#${scriptTargetId},#${scriptTargetId} *{text-transform:none!important}.kao-banner{border-radius:8px}</style></head><body><div id="${scriptTargetId}"></div><script src="${escapeHtmlAttr(scriptUrl)}"><\/script><script>${iframeTextPatchScript}<\/script></body></html>`
    : ''

  if (!title && lines.length === 0 && !scriptSrc && !link) {
    return null
  }

  return (
    <Card className='hexo-custom-sidebar-card'>
      <style jsx global>{`
        .hexo-custom-sidebar-card .card {
          padding: 16px 18px !important;
        }
      `}</style>
      {title && <div className='mb-3 font-medium'>{title}</div>}
      {lines.length > 0 && (
        <div className='space-y-2 text-sm leading-6 text-gray-600 dark:text-gray-300'>
          {lines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      )}
      {scriptSrc && (
        <div className='relative'>
          <iframe
            className='block w-full border-0'
            loading='lazy'
            sandbox='allow-scripts allow-popups allow-popups-to-escape-sandbox'
            srcDoc={iframeSrcDoc}
            style={{ height: '58px' }}
            title='Keep Android Open banner'
          />
          {needsIframeClickProxy && iframeClickUrl && (
            <a
              aria-label={title || linkText || 'Open banner link'}
              className='absolute inset-0 z-10 block'
              href={iframeClickUrl}
              rel='noreferrer'
              target='_blank'
            />
          )}
        </div>
      )}
      {link && (
        <a
          className='mt-4 inline-flex text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300'
          href={link}
          rel='noreferrer'
          target='_blank'>
          {linkText}
        </a>
      )}
    </Card>
  )
}

export default CustomSidebarCard
