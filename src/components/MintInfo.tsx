import parse from 'html-react-parser'
import { css } from '@emotion/react'
import { SocialIcon } from '@/common/Socials'
import { useMintConfigMetadata } from '@/hooks/useMintConfigMetadata'
import { useMintConfig } from '@/hooks/useMintConfig'

export const MintInfo = () => {
  const mintConfigMetadata = useMintConfigMetadata()
  const mintConfig = useMintConfig()
  return (
    <div className="flex flex-col gap-4">
      <div className="bold text-6xl">
        {mintConfigMetadata.data?.displayName ?? mintConfig.data?.parsed.name}
      </div>
      <div className="flex items-center gap-4 text-light-0">
        {mintConfigMetadata.data?.socials?.map(({ icon, link }, i) => {
          return (
            <a
              key={i}
              href={link}
              target="_blank"
              rel="noreferrer"
              className={`cursor-pointer text-xl text-light-0 transition-all duration-300 hover:text-primary`}
              css={css`
                &:hover {
                  color: ${mintConfigMetadata.data?.colors?.accent} !important;
                }
              `}
            >
              <SocialIcon iconKey={icon} />
            </a>
          )
        })}
      </div>
      <div className="text-lg text-light-2">
        {parse(mintConfigMetadata.data?.description ?? '')}
      </div>
    </div>
  )
}
