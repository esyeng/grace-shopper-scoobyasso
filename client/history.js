import {createMemoryHistory, createBrowserHistory} from 'history'

const history =
  process.env.NODE_ENV === 'test'
    ? createMemoryHistory()
    : createBrowserHistory()

history.listen(_ => {
  window.scrollTo(0, 0)
})
export default history
