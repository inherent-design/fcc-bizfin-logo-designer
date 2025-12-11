export function MetaInfo() {
  const currentYear = new Date().getFullYear()
  const copyrightYear = currentYear === 2025 ? '2025' : `2025-${currentYear}`

  const version = import.meta.env.VITE_APP_VERSION || 'dev-local'
  const versionDisplay = import.meta.env.MODE === 'production' ? `v${version}` : version

  return (
    <div className='text-xs text-base-content/60 space-y-1'>
      <p>
        <span>© {copyrightYear} inherent.design</span>
        {' | '}
        <a
          href='https://github.com/inherent-design/fcc-bizfin-logo-designer'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-base-content/80 transition-colors'
        >
          Source Code
        </a>
        {' | '}
        <span className='font-mono'>{versionDisplay}</span>
      </p>
    </div>
  )
}
