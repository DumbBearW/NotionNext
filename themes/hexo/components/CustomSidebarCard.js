import { siteConfig } from '@/lib/config'
import Script from 'next/script'
import CONFIG from '../config'
import Card from './Card'

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

  if (!title && lines.length === 0 && !scriptSrc && !link) {
    return null
  }

  return (
    <Card>
      {title && <div className='mb-3 font-medium'>{title}</div>}
      {lines.length > 0 && (
        <div className='space-y-2 text-sm leading-6 text-gray-600 dark:text-gray-300'>
          {lines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      )}
      {scriptSrc && (
        <>
          <div id={scriptTargetId} />
          <Script id={`${scriptTargetId}-loader`} src={scriptUrl} strategy='afterInteractive' />
        </>
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
