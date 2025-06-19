import {
  PageViewer,
  cleanPage,
  fetchPage,
  getBricks,
  register,
  types,
} from 'react-bricks/rsc'

import ReactBricksApp from '@/components/ReactBricksApp'
import ErrorNoFooter from '@/components/errorNoFooter'
import ErrorNoHeader from '@/components/errorNoHeader'
import ErrorNoKeys from '@/components/errorNoKeys'
import PageLayout from '@/components/layout'
import { ThemeProvider } from '@/components/themeProvider'
import { i18n } from '@/i18n-config'
import config from '@/react-bricks/config'

import { Nunito_Sans } from 'next/font/google'

import '@/css/styles.css'

export const metadata = {
  title: 'React Bricks Starter',
  description: 'Next.js with Server Components',
}

const nunito = Nunito_Sans({
  adjustFontFallback: false,
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-nunito',
})

register(config)

const getData = async (
  locale: string
): Promise<{
  header: types.Page | null
  footer: types.Page | null
  errorNoKeys: boolean
  errorHeader: boolean
  errorFooter: boolean
}> => {
  let errorNoKeys: boolean = false
  let errorHeader: boolean = false
  let errorFooter: boolean = false

  if (!config.apiKey) {
    errorNoKeys = true

    return {
      header: null,
      footer: null,
      errorNoKeys,
      errorHeader,
      errorFooter,
    }
  }

  const [header, footer] = await Promise.all([
    fetchPage({ slug: 'header', language: locale, config }).catch(() => {
      errorHeader = true
      return null
    }),
    fetchPage({ slug: 'footer', language: locale, config }).catch(() => {
      errorFooter = true
      return null
    }),
  ])

  return {
    header,
    footer,
    errorNoKeys,
    errorHeader,
    errorFooter,
  }
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    lang: locale,
  }))
}

export default async function Layout(props: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const params = await props.params

  const { children } = props

  const { header, footer, errorNoKeys, errorHeader, errorFooter } =
    await getData(params.lang)

  // Clean the received content
  // Removes unknown or not allowed bricks
  const bricks = getBricks()
  const headerOk = header
    ? cleanPage(header, config.pageTypes || [], bricks)
    : null
  const footerOk = footer
    ? cleanPage(footer, config.pageTypes || [], bricks)
    : null

  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body
        className={`${nunito.variable} font-sans dark:bg-gray-900 antialiased`}
      >
        <ThemeProvider
          attribute="class"
          storageKey="color-mode"
          enableSystem={false}
          defaultTheme="light"
        >
          <main>
            <ReactBricksApp>
              <PageLayout>
                {!errorNoKeys && (
                  <>
                    {headerOk && !errorHeader ? (
                      <PageViewer page={headerOk} main={false} />
                    ) : (
                      <ErrorNoHeader />
                    )}
                    {children}
                    {footerOk && !errorFooter ? (
                      <PageViewer page={footerOk} main={false} />
                    ) : (
                      <ErrorNoFooter />
                    )}
                  </>
                )}
                {errorNoKeys && <ErrorNoKeys />}
              </PageLayout>
            </ReactBricksApp>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
