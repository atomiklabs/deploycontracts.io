import Head from 'next/head'
import React from 'react'

export default function TermsOfServicePage() {
  return (
    <>
      <Head>
        <title>Terms of Service | Deploy SNIP-20 smart contract for free</title>
        <meta name='description' content={`Terms of Service for the SNIP_20 smart contract creator.`} />
      </Head>

      <article className='prose lg:prose-xl prose-invert mx-auto py-10 md:py-20 px-6 md:px-0'>
        <h1>Terms of Service</h1>

        <h2>1. Definition</h2>
        <p>
          The SNIP-20 Contract Generator is a distributed application that runs on the Secret Network, using
          specially-developed Smart Contracts to enable users to build their SNIP-20 Tokens. The Smart Contracts, and
          the Site, are collectively referred to in these Terms as the "App".
        </p>

        <h2>2. Disclaimer</h2>
        <p>
          SNIP-20 Contract Generator and its author are free of any liability regarding Tokens created using this App,
          and the use that is made of them. Tokens built on SNIP-20 Contract Generator, their projects, their teams,
          their use of Token (as well as anything related to Token) are in no way connected to SNIP-20 Contract
          Generator or its authors. The App's purpose is to make people able to tokenize their ideas without coding or
          paying large amounts for it. Source code is public and well tested and continuously updated to reduce risk of
          bugs and introduce language optimizations. Anyway the purchase of tokens involves a high degree of risk.
          Before acquiring tokens, it is recommended to carefully weighs all the information and risks detailed in Token
          owner's Conditions.
        </p>

        <h2>3. The App</h2>
        <p>
          To most easily use the App, you must first install a browser extension called Keplr. Keplr is an electronic
          wallet, which allows you to purchase, store, and engage in transactions using the SCRT cryptocurrency. You
          will not be able to engage in any transactions on the App other than through Keplr. Transactions that take
          place on the App are managed and confirmed via the Secret Network. You understand that your SCRT public
          address will be made publicly visible whenever you engage in a transaction on the App. We neither own nor
          control Keplr, the Secret Netwokr, or any other third party site, product, or service that you might access,
          visit, or use for the purpose of enabling you to use the various features of the App. We will not be liable
          for the acts or omissions of any such third parties, nor will we be liable for any damage that you may suffer
          as a result of your transactions or any other interaction with any such third parties.
        </p>

        <h2>4. Fees and Payment</h2>
        <p>
          If you elect to create a SNIP-20 Token on the App, or with or from other users via the App, any financial
          transactions that you engage in will be conducted solely through the Secret Network via Keplr. We will have no
          insight into or control over these payments or transactions, nor do we have the ability to reverse or refund
          any transactions. With that in mind, we will have no liability to you or to any third party for any claims or
          damages that may arise as a result of any transactions that you engage in via the App, or using the Smart
          Contracts, or any other transactions that you conduct via the Secret Network or Keplr. Secret Network requires
          the payment of a transaction fee (a "Gas Fee") for every transaction that occurs on the Secret Network. The
          Gas Fee funds the network of computers that run the decentralized Secret Network. This means that you will
          need to pay a Gas Fee for each transaction that occurs via the App. In addition to the Gas Fee, each time you
          utilize a Smart Contract to conduct a transaction via the App, you authorize us to collect a commission of an
          amount of SCRT of the total value of that transaction (each, a "Commission"). Commission will be publicly
          visible on the App confirmation page and in Keplr confirmation popup. You acknowledge and agree that the
          Commission will be transferred directly to us through the Secret Network as part of your payment. We will not
          collect a Commission for interactions that do not involve our App.
        </p>

        <h2>5. Risks</h2>
        <p>
          You agree that you are responsible for your own conduct while accessing or using the App, and for any
          consequences thereof. The prices of blockchain assets are extremely volatile. Fluctuations in the price of
          other digital assets could materially and adversely affect the value of your SNIP-20 Token, which may also be
          subject to significant price volatility. You are solely responsible for determining what, if any, taxes apply
          to your SNIP-20-related transactions. We are not responsible for determining the taxes that apply to your
          transactions on the App, the Site, or the Smart Contracts. The App does not store, send, or receive SNIP-20.
          This is because SNIP-20 exists only by virtue of the ownership record maintained on the App's supporting
          blockchain in the Secret Network. Any transfer of SNIP-20 occurs within the supporting blockchain in the
          Secret Network, and not on the App. There are risks associated with using an Internet-based currency,
          including, but not limited to, the risk of hardware, software and Internet connections, the risk of malicious
          software introduction, and the risk that third parties may obtain unauthorized access to information stored
          within your wallet. You accept and acknowledge that we will not be responsible for any communication failures,
          disruptions, errors, distortions or delays you may experience when using the Secret Network, however caused.
          The regulatory regime governing blockchain technologies, cryptocurrencies, and tokens is uncertain, and new
          regulations or policies may materially adversely affect the development of the SNIP-20 Token Ecosystem, and
          therefore the potential utility or value of SNIP-20 Tokens. Upgrades by Secret Foundation to the Secret
          Network, a hard fork in the Secret Network, or a change in how transactions are confirmed on the Secret
          Network may have unintended, adverse effects on all blockchains using the SNIP-20 standard.
        </p>

        <h2>6. External Sites</h2>
        <p>
          The App may include hyperlinks to other websites or resources (collectively, "External Sites"), which are
          provided solely as a convenience to our users. We have no control over any External Sites. You acknowledge and
          agree that we are not responsible for the availability of any External Sites, and that we do not endorse any
          advertising, products or other materials on or made available from any External Sites. Furthermore, you
          acknowledge and agree that we are not liable for any loss or damage which may be incurred as a result of the
          availability or unavailability of the External Sites, or as a result of any reliance placed by you upon the
          completeness, accuracy or existence of any advertising, products or other materials on, or made available
          from, any External Sites.
        </p>

        <h2>7. Changes to the Terms</h2>
        <p>
          We may make changes to the Terms from time to time. Please check these Terms periodically for changes. Any
          changes to the Terms will apply on the date that they are made, and your continued access to or use of the App
          after the Terms have been updated will constitute your binding acceptance of the updates. If you do not agree
          to any revised Terms, you may not access or use the App.
        </p>

        <h2>8. Changes to the App</h2>
        <p>
          We are constantly innovating the App to help provide the best possible experience. You acknowledge and agree
          that the form and nature of the App, and any part of it, may change from time to time without prior notice to
          you, and that we may add new features and change any part of the App at any time without notice.
        </p>
      </article>
    </>
  )
}
