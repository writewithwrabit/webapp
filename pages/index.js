import useGoogleAnalytics from '../hooks/useGoogleAnalytics'

import Header from '../components/Header'

const LandingPage = () => {
  useGoogleAnalytics()

  return (
    <>
      <Header />

      <div className="container mx-auto p-5">
        <div className="bg-secondary text-white text-2xl flex flex-col justify-center rounded-lg shadow-md p-5 md:p-40 space-y-6">
          <p>Hey there! 👋</p>

          <p>
            Due to the cost of running Wrabit, we've had to shut down the
            service. This <strong>not</strong> goodbye.
          </p>

          <p>
            We are working hard to bring you a free privacy focused
            micro-journal.
          </p>

          <p>
            No more saving your journal entries to the cloud. No more monthly
            payments. Just you and your thoughts, daily.
          </p>

          <p>
            Thanks to everyone who gave our first product a try. We hope you'll
            like what we've got in store. See you soon!
          </p>

          <p>- Your friends at Wrabit</p>
        </div>
      </div>
    </>
  )
}

export default LandingPage
