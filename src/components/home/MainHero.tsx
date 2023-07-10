import { GlyphPlus } from '@/assets/GlyphPlus'
import { Button } from '@/common/Button'
import { Header } from '@/common/Header'
import { useMintConfigCount } from '@/hooks/useMintConfigCount'

export const MainHero = () => {
  const mintConfigCount = useMintConfigCount()
  return (
    <div className="relative z-0 text-sm">
      <div className="blur-4xl absolute left-8 top-52 -z-10 h-[120px] w-[400px] -rotate-[60deg] bg-glow blur-[100px]" />
      <div className="blur-4xl absolute -right-20 top-72 -z-10 h-[100px] w-[550px] -rotate-[60deg] bg-glow blur-[120px]" />
      <Header />
      <div className="flex flex-wrap justify-between gap-10 px-8 py-24 md:px-16">
        <div className="flex flex-col gap-2">
          <div className="text-5xl text-light-0">Minting</div>
          <div className="text-lg text-medium-3">
            Mint tokens from a live Solana NFT project
          </div>
        </div>
        <div className="flex flex-col items-end justify-end gap-5 ">
          <div className="flex items-center gap-2 lg:gap-6">
            <div className="text-lg text-medium-3">
              Want to setup your own mint?
            </div>
            <Button
              onClick={() => {
                window.scrollTo({ top: 450, behavior: 'smooth' })
              }}
            >
              <>Create mint</>
              <GlyphPlus />
            </Button>
          </div>
          <div className="flex w-fit flex-wrap gap-3 rounded-xl border-[2px] border-border p-4">
            <div className="flex items-center gap-2">
              <div className="text-medium-3">Total mints</div>
              <div className="text-light-0">
                {mintConfigCount.data ? (
                  Number(mintConfigCount?.data).toLocaleString('en-US')
                ) : (
                  <div className="mt-[1px] h-5 w-12 animate-pulse rounded-md bg-border" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
