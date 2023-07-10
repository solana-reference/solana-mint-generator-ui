import { css } from '@emotion/react'
import { Banner } from '@/common/Banner'
import { Footer } from '@/common/Footer'
import { Header } from '@/common/Header'
import { MintPage } from '@/components/MintPage'
import Head from 'next/head'
import { useMintConfigMetadata } from '@/hooks/useMintConfigMetadata'
import { useMintConfig } from '@/hooks/useMintConfig'

function Home() {
  const mintConfig = useMintConfig()
  const mintConfigMetadata = useMintConfigMetadata()

  return (
    <div className="bg-dark-5 relative z-0 flex min-h-screen flex-col">
      <div
        className="blur-4xl absolute left-8 top-52 -z-10 h-[120px] w-[400px] -rotate-[60deg] bg-glow blur-[100px]"
        css={css`
          background: ${mintConfigMetadata.data?.colors?.glow} !important;
        `}
      />
      <div
        className="blur-4xl absolute -right-20 top-72 -z-10 h-[100px] w-[550px] -rotate-[60deg] bg-glow blur-[120px]"
        css={css`
          background: ${mintConfigMetadata.data?.colors?.glow} !important;
        `}
      />
      <Head>
        <title>
          {mintConfigMetadata.data?.displayName ?? mintConfig.data?.parsed.name}
        </title>
        <link rel="icon" href="/favicon.ico" />

        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@100&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:ital@0;1&family=Oswald:wght@200;300;400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Karla:wght@600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href={mintConfigMetadata.data?.previewUrl} />
        <script
          src="https://cdn.usefathom.com/script.js"
          data-site="DBUQLBPJ"
          defer
        ></script>
      </Head>
      <Banner />
      <Header />
      <div style={{ minHeight: 'calc(100vh - 337px)' }} className="grow">
        <MintPage />
      </div>
      <Footer />
    </div>
  )
}

export default Home
