import QrCode from '@/components/QrCode'
import { siteConfig } from '@/lib/config'
import { useRef, useState } from 'react'
import { handleEmailClick } from '@/lib/plugins/mailEncrypt'

/**
 * 社交联系方式按钮组
 * @returns {JSX.Element}
 * @constructor
 */
const SocialButton = () => {
  const CONTACT_DISCORD = siteConfig('CONTACT_DISCORD')
  const CONTACT_GITHUB = siteConfig('CONTACT_GITHUB')
  const CONTACT_TWITTER = siteConfig('CONTACT_TWITTER')
  const CONTACT_TELEGRAM = siteConfig('CONTACT_TELEGRAM')

  const CONTACT_NINTENDO = siteConfig('CONTACT_NINTENDO')
  const CONTACT_XBOX = siteConfig('CONTACT_XBOX')
  const CONTACT_STEAM = siteConfig('CONTACT_STEAM')
  const CONTACT_EPICGAMES = siteConfig('CONTACT_EPICGAMES')
  const CONTACT_LINKEDIN = siteConfig('CONTACT_LINKEDIN')
  const CONTACT_WEIBO = siteConfig('CONTACT_WEIBO')
  const CONTACT_INSTAGRAM = siteConfig('CONTACT_INSTAGRAM')
  const CONTACT_EMAIL = siteConfig('CONTACT_EMAIL')
  const ENABLE_RSS = siteConfig('ENABLE_RSS')
  const CONTACT_BILIBILI = siteConfig('CONTACT_BILIBILI')
  const CONTACT_YOUTUBE = siteConfig('CONTACT_YOUTUBE')

  const CONTACT_XIAOHONGSHU = siteConfig('CONTACT_XIAOHONGSHU')
  const CONTACT_ZHISHIXINGQIU = siteConfig('CONTACT_ZHISHIXINGQIU')
  const CONTACT_WEHCHAT_PUBLIC = siteConfig('CONTACT_WEHCHAT_PUBLIC')

  const [qrCodeShow, setQrCodeShow] = useState(false)

  const openPopover = () => {
    setQrCodeShow(true)
  }
  const closePopover = () => {
    setQrCodeShow(false)
  }

  const emailIcon = useRef(null)
  const gameLinkClass =
    'inline-flex h-6 w-6 shrink-0 items-center justify-center leading-none'
  const gameFaIconClass =
    'text-[1.45rem] leading-none transform hover:scale-125 duration-150 dark:hover:text-indigo-400 hover:text-indigo-600'

  const renderMaskIcon = (src, iconClass = 'h-[1.45rem] w-[1.45rem]') => (
    <span
      className='inline-flex h-6 w-6 items-center justify-center leading-none transform hover:scale-125 duration-150 dark:hover:text-indigo-400 hover:text-indigo-600'
      aria-hidden='true'
    >
      <span
        className={`block ${iconClass}`}
        style={{
          backgroundColor: 'currentColor',
          WebkitMask: `url("${src}") center / contain no-repeat`,
          mask: `url("${src}") center / contain no-repeat`
        }}
      />
    </span>
  )

  const renderSvgLink = (href, title, iconSrc, iconClass) => (
    <a
      className={gameLinkClass}
      target='_blank'
      rel='noreferrer'
      title={title}
      href={href}>
      {renderMaskIcon(iconSrc, iconClass)}
    </a>
  )

  const renderFaLink = (href, title, iconClass) => (
    <a
      className={gameLinkClass}
      target='_blank'
      rel='noreferrer'
      title={title}
      href={href}>
      <i className={`${gameFaIconClass} ${iconClass}`} />
    </a>
  )

  return (
    <div className='w-full justify-center flex-wrap flex'>
      <div className='flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xl text-gray-600 dark:text-gray-300'>
        {CONTACT_DISCORD &&
          renderFaLink(CONTACT_DISCORD, 'Discord', 'fab fa-discord')}
        {CONTACT_NINTENDO &&
          renderSvgLink(CONTACT_NINTENDO, 'Nintendo', '/svg/ns.svg')}
        {CONTACT_XBOX && renderFaLink(CONTACT_XBOX, 'Xbox', 'fab fa-xbox')}
        {CONTACT_GITHUB && (
          <a
            target='_blank'
            rel='noreferrer'
            title={'github'}
            href={CONTACT_GITHUB}>
            <i className='transform hover:scale-125 duration-150 fab fa-github dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}
        {CONTACT_TWITTER && (
          <a
            target='_blank'
            rel='noreferrer'
            title={'twitter'}
            href={CONTACT_TWITTER}>
            <i className='transform hover:scale-125 duration-150 fab fa-twitter dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}
        {CONTACT_TELEGRAM && (
          <a
            target='_blank'
            rel='noreferrer'
            href={CONTACT_TELEGRAM}
            title={'telegram'}>
            <i className='transform hover:scale-125 duration-150 fab fa-telegram dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}
        {CONTACT_LINKEDIN && (
          <a
            target='_blank'
            rel='noreferrer'
            href={CONTACT_LINKEDIN}
            title={'linkIn'}>
            <i className='transform hover:scale-125 duration-150 fab fa-linkedin dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}
        {CONTACT_WEIBO && (
          <a
            target='_blank'
            rel='noreferrer'
            title={'weibo'}
            href={CONTACT_WEIBO}>
            <i className='transform hover:scale-125 duration-150 fab fa-weibo dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}
        {CONTACT_INSTAGRAM && (
          <a
            target='_blank'
            rel='noreferrer'
            title={'instagram'}
            href={CONTACT_INSTAGRAM}>
            <i className='transform hover:scale-125 duration-150 fab fa-instagram dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}
        {CONTACT_EMAIL && (
          <a
            onClick={e => handleEmailClick(e, emailIcon, CONTACT_EMAIL)}
            title='email'
            className='cursor-pointer'
            ref={emailIcon}>
            <i className='transform hover:scale-125 duration-150 fas fa-envelope dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}
        {ENABLE_RSS && (
          <a
            target='_blank'
            rel='noreferrer'
            title={'RSS'}
            href={'/rss/feed.xml'}>
            <i className='transform hover:scale-125 duration-150 fas fa-rss dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}
        {CONTACT_BILIBILI && (
          <a
            target='_blank'
            rel='noreferrer'
            title={'bilibili'}
            href={CONTACT_BILIBILI}>
            <i className='transform hover:scale-125 duration-150 dark:hover:text-indigo-400 hover:text-indigo-600 fab fa-bilibili' />
          </a>
        )}
        {CONTACT_YOUTUBE && (
          <a
            target='_blank'
            rel='noreferrer'
            title={'youtube'}
            href={CONTACT_YOUTUBE}>
            <i className='transform hover:scale-125 duration-150 fab fa-youtube dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}
        {CONTACT_XIAOHONGSHU && (
          <a
            target='_blank'
            rel='noreferrer'
            title={'小红书'}
            href={CONTACT_XIAOHONGSHU}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className='transform hover:scale-125 duration-150 w-6'
              src='/svg/xiaohongshu.svg'
              alt='小红书'
            />
          </a>
        )}
        {CONTACT_STEAM && renderFaLink(CONTACT_STEAM, 'Steam', 'fab fa-steam')}
        {CONTACT_EPICGAMES &&
          renderSvgLink(
            CONTACT_EPICGAMES,
            'EpicGames',
            '/svg/epicgames-cutout.svg',
            'h-[1.62rem] w-[1.62rem]'
          )}
        {CONTACT_ZHISHIXINGQIU && (
          <a
            target='_blank'
            rel='noreferrer'
            title={'知识星球'}
            href={CONTACT_ZHISHIXINGQIU}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className='transform hover:scale-125 duration-150 w-6'
              src='/svg/zhishixingqiu.svg'
              alt='知识星球'
            />{' '}
          </a>
        )}
        {CONTACT_WEHCHAT_PUBLIC && (
          <button
            onMouseEnter={openPopover}
            onMouseLeave={closePopover}
            aria-label={'微信公众号'}>
            <div id='wechat-button'>
              <i className='transform scale-105 hover:scale-125 duration-150 fab fa-weixin  dark:hover:text-indigo-400 hover:text-indigo-600' />
            </div>
            {/* 二维码弹框 */}
            <div className='absolute'>
              <div
                id='pop'
                className={
                  (qrCodeShow ? 'opacity-100 ' : ' invisible opacity-0') +
                  ' z-40 absolute bottom-10 -left-10 bg-white shadow-xl transition-all duration-200 text-center'
                }>
                <div className='p-2 mt-1 w-28 h-28'>
                  {qrCodeShow && <QrCode value={CONTACT_WEHCHAT_PUBLIC} />}
                </div>
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  )
}
export default SocialButton
