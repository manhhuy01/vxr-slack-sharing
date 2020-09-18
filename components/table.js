import CountUp from 'react-countup';
import { selector, useRecoilValue } from 'recoil'
import { data as dataState } from '../recoil'

const records = selector({
  key: 'tableRanking',
  get: ({ get }) => {
    const { members, pointWithUser } = get(dataState);
    return pointWithUser.map(x => {
      let member = members.find(m => m.id === x.userId);
      return ({ ...x, avatar: member?.profile?.image_48, name: member?.real_name })
    }).sort((a, b) => b.totalPoint - a.totalPoint)
  }
})

const Table = () => {
  const dataSet = useRecoilValue(records);
  return (
    <table className='table is-hoverable is-bordered is-fullwidth is-narrow'>
      <thead>
        <tr>
          <th colSpan='2'><p className="has-text-centered"> Member </p></th>
          <th>Sharing Point</th>
          <th>Interactive Point</th>
          <th>Total Point</th>
        </tr>

      </thead>
      <tbody>
        {dataSet.map((record, index) =>
          <tr>
            <th>
              <div className="columns is-centered">
                <div className="column is-narrow">
                  <div className="image is-32x32">
                    <img src={record.avatar} />
                  </div>
                </div>
              </div>
            </th>
            <td>
              {record.name}
            </td>
            <td><CountUp end={record.sharingPoint} duration={3} /></td>
            <td><CountUp end={record.interactivePoint} duration={3} /></td>
            <td><CountUp end={record.totalPoint} duration={3} /></td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default Table;