import { siteConfig } from '@/lib/config'
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

  const lines = Array.isArray(content)
    ? content.filter(Boolean)
    : `${content || ''}`
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean)
  const scriptTargetId = 'hexo-custom-sidebar-card-script'
  const scriptUrl = scriptSrc
    ? `${scriptSrc}${scriptSrc.includes('?') ? '&' : '?'}id=${scriptTargetId}`
    : ''
  const iframeLang = getUrlParam(scriptUrl, 'lang') || siteConfig('LANG', 'zh-CN')
  const iframeSrcDoc = scriptUrl
    ? `<!doctype html><html lang="${escapeHtmlAttr(iframeLang)}"><head><meta charset="utf-8"><base target="_blank"><style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}body{min-height:58px;display:flex;align-items:center}#${scriptTargetId}{width:100%}.kao-banner{border-radius:8px}</style></head><body><div id="${scriptTargetId}"></div><script src="${escapeHtmlAttr(scriptUrl)}"><\/script></body></html>`
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
        <iframe
          className='block w-full border-0'
          loading='lazy'
          sandbox='allow-scripts allow-popups allow-popups-to-escape-sandbox'
          srcDoc={iframeSrcDoc}
          style={{ height: '58px' }}
          title='Keep Android Open banner'
        />
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
