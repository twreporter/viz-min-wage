/* eslint max-len: 0 */
import Document, { Head, Main, NextScript } from 'next/document'

import { colors } from '../styles/common-variables'
import foundationStyles from '../styles/index.scss'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  render() {
    const sheet = new ServerStyleSheet()
    const main = sheet.collectStyles(<Main />)
    const styleTags = sheet.getStyleElement()

    return (
      <html lang="zh-TW">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          <meta name="theme-color" content={colors.primaryColor} />
          <link href="https://www.twreporter.org/asset/favicon.png" rel="shortcut icon" />
          {/* glabal stylesheets (/styles/index.scss) */}
          <style dangerouslySetInnerHTML={{ __html: foundationStyles }} />
          {styleTags}
          <script dangerouslySetInnerHTML={{ __html: `(function(d) {var config = {kitId: 'lwr8ggq',scriptTimeout: 3000,async: true},h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)})(document);` }} />
          <script
            dangerouslySetInnerHTML={{ __html: `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); ga('create', 'UA-69336956-1', 'auto'); ga('send', 'pageview');` }}
          />
        </Head>
        <body>
          <div className="root">
            {main}
          </div>
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: 'window.onunload = function() { window.scrollTo(0, 0) };',
            }}
          />
          {/* <!-- Hotjar Tracking Code --> */}
          <script
            dangerouslySetInnerHTML={{ __html:
              `(function(h,o,t,j,a,r){
                      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                      h._hjSettings={hjid:376929,hjsv:5};
                      a=o.getElementsByTagName('head')[0];
                      r=o.createElement('script');r.async=1;
                      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                      a.appendChild(r);
                  })(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');`
            }}
          />
          {/* <!-- End - Hotjar Tracking Code --> */}
        </body>
      </html>
    )
  }
}
