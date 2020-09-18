import { useState, useCallback } from 'react'
import Head from 'next/head'
import { DateRangePicker } from 'react-dates';
import { useSetRecoilState } from 'recoil'
import { calculateCurrentPoint } from '../api/slack'
import TableRanking from '../components/table'
import { data } from '../recoil'

export default function Home() {
  const [focusedInput, setFocusedInput] = useState()
  const [dates, setDates] = useState({ startDate: null, endDate: null });
  const [dataLoaded, setDataLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const setData = useSetRecoilState(data)
  const onSubmit = useCallback(
    async () => {
      setLoading(true)
      const response = await calculateCurrentPoint(dates.startDate.startOf('d').unix() * 1000, dates.endDate.endOf('d').unix() * 1000)
      console.log(response)
      setData(response)
      setDataLoaded(true)
      setLoading(false)
      setTimeout(() => {
        window.scroll({
          behavior: 'smooth',
          left: 0,
          top: document.getElementById('ranking-result').getBoundingClientRect().top + window.scrollY
        });
      }, 200);
    },
    [dates],
  )
  return (
    <div>
      <Head>
        <title>VeXeRe sharing point</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <nav id='navbar' className='bd-navbar navbar has-shadow'>
          <div className='container'>
            <div className='navbar-brand'>
              <a className='navbar-item' href='/'>
                <img src='https://storage.googleapis.com/fe-production/icon_vxr_full.svg' />
              </a>
            </div>

          </div>
        </nav>
        <section className="hero is-link is-fullheight-with-navbar">
          <div className="hero-body">
            <div className="container is-horizontal">
              <p className="title has-text-centered">
                Slack point sharing
              </p>
              <div className='container'>
                <div className='box is-size-1-mobile'>
                  <div className="columns is-centered has-text-centered">
                    <div className="column is-half">
                      <DateRangePicker
                        isOutsideRange={() => false}
                        displayFormat="DD/MM/YYYY"
                        startDate={dates.startDate}
                        endDate={dates.endDate}
                        startDateId='start_date'
                        endDateId='end_date'
                        enableOutsideDays={true}
                        onDatesChange={({ startDate, endDate }) => setDates({ startDate, endDate })}
                        hideKeyboardShortcutsPanel={true}
                        numberOfMonths={1}
                        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
                      />
                    </div>
                  </div>
                  <div className='columns is-centered'>
                    <div className="column is-half has-text-centered">
                      <button
                        className={`button is-primary ${loading ? 'is-loading' : ''}`}
                        disabled={!(dates.startDate && dates.endDate)}
                        onClick={onSubmit}>
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {
          dataLoaded && (
            <section>
              <div className='container' id='ranking-result'>
                <div className="tile is-ancestor">
                  <div className="tile is-vertical">
                    <div className='box'>
                      <h1 className="title">Result</h1>
                      <TableRanking />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        }
        <footer className="footer">
          <div className="content has-text-centered">
            <p>
              <strong>VeXeRe Slack sharing point</strong> by Huy Nguyen. Bản quyền © 2020 thuộc về <a href='https://vexere.com' >VeXeRe.Com</a>.
            </p>
          </div>
        </footer>
        <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
      </main>


    </div>
  )
}
